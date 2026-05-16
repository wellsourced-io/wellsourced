"use client";

import { useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/ui/SearchBar";
import {
  sendEvent,
  getViewportBucket,
  getReferrerCategory,
} from "@/lib/analytics/beacon";

interface HeaderSearchFormProps {
  locale: string;
  pathname: string;
  placeholder?: string;
}

/**
 * Compact search form for the header right-slot on internal routes. Submits
 * to `/[locale]/search?q=...` via `<form action>` so it works without JS
 * (progressive-enhancement per the spec's edge cases). When JS is loaded,
 * uses the App Router for a soft navigation and emits a `search_submit`
 * beacon.
 */
export function HeaderSearchForm({
  locale,
  pathname,
  placeholder,
}: HeaderSearchFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const action = `/${locale}/search`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const value = inputRef.current?.value?.trim() ?? "";
    if (value.length === 0) return; // let the form do nothing
    e.preventDefault();
    if (typeof window !== "undefined") {
      sendEvent({
        name: "search_submit",
        path: pathname,
        viewport_bucket: getViewportBucket(),
        referrer_category: getReferrerCategory(
          document.referrer,
          window.location.origin,
        ),
        meta: { query_length: value.length, has_filters: false },
      });
    }
    const params = new URLSearchParams({ q: value });
    router.push(`${action}?${params.toString()}`);
  };

  return (
    <form
      action={action}
      method="get"
      onSubmit={onSubmit}
      className="hidden md:block w-full max-w-xs"
      role="search"
    >
      <SearchBar
        ref={inputRef}
        name="q"
        variant="compact"
        placeholder={placeholder}
        aria-label="Search WellSourced"
      />
    </form>
  );
}
