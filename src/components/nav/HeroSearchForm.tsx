"use client";

import { useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/ui/SearchBar";
import {
  sendEvent,
  getViewportBucket,
  getReferrerCategory,
} from "@/lib/analytics/beacon";

interface HeroSearchFormProps {
  locale: string;
  placeholder?: string;
}

/**
 * Hero search form for the homepage. Wraps the SearchBar in a real `<form>`
 * that submits to `/[locale]/search?q=...` so it works without JS
 * (progressive-enhancement per the spec's edge cases). With JS, uses the
 * App Router for soft navigation and emits a `search_submit` beacon (FR-033).
 *
 * Pair with FR-007: only this hero variant renders on `/`; AppShell omits
 * the compact header search on the homepage.
 */
export function HeroSearchForm({ locale, placeholder }: HeroSearchFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const action = `/${locale}/search`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const value = inputRef.current?.value?.trim() ?? "";
    if (value.length === 0) return;
    e.preventDefault();
    if (typeof window !== "undefined") {
      sendEvent({
        name: "search_submit",
        path: `/${locale}`,
        viewport_bucket: getViewportBucket(),
        referrer_category: getReferrerCategory(
          document.referrer,
          window.location.origin,
        ),
        meta: { query_length: value.length, has_filters: false },
      });
    }
    router.push(`${action}?${new URLSearchParams({ q: value }).toString()}`);
  };

  return (
    <form
      action={action}
      method="get"
      onSubmit={onSubmit}
      className="max-w-[640px]"
      role="search"
    >
      <SearchBar
        ref={inputRef}
        name="q"
        variant="hero"
        placeholder={placeholder}
        shortcut="⌘K"
        aria-label="Search WellSourced"
      />
    </form>
  );
}
