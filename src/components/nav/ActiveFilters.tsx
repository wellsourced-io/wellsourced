"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import {
  fromSearchParams,
  removeMulti,
  toQueryString,
  type FilterState,
} from "@/lib/routes/filterParams";
import {
  sendEvent,
  getViewportBucket,
  getReferrerCategory,
} from "@/lib/analytics/beacon";

interface ActiveFiltersProps {
  pathname: string;
  className?: string;
}

interface Chip {
  key: keyof Pick<
    FilterState,
    "category" | "ownership" | "certification" | "country"
  >;
  value: string;
  label: string;
}

/**
 * Renders the active multi-value filters as removable chips per FR-019.
 * Reads filter state from the URL via `useSearchParams`, so the URL stays
 * the single source of truth. Each chip's "×" button emits a
 * `filter_remove` beacon and pushes a URL without that value (FR-018).
 *
 * Mountable on /search, /c/[slug], and /brands. The future search and
 * directory features will pair this with their own filter pickers that
 * call `router.push` with `toQueryString(toggleMulti(state, key, value))`.
 */
export function ActiveFilters({ pathname, className }: ActiveFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const state = useMemo(() => fromSearchParams(searchParams), [searchParams]);

  const chips: Chip[] = useMemo(() => {
    const all: Chip[] = [];
    for (const v of state.category) {
      all.push({ key: "category", value: v, label: humanize("Category", v) });
    }
    for (const v of state.ownership) {
      all.push({ key: "ownership", value: v, label: humanize("Ownership", v) });
    }
    for (const v of state.certification) {
      all.push({
        key: "certification",
        value: v,
        label: humanize("Cert", v),
      });
    }
    for (const v of state.country) {
      all.push({ key: "country", value: v, label: humanize("Country", v) });
    }
    return all;
  }, [state]);

  const emit = useCallback(
    (filterName: string) => {
      if (typeof window === "undefined") return;
      sendEvent({
        name: "filter_remove",
        path: pathname,
        viewport_bucket: getViewportBucket(),
        referrer_category: getReferrerCategory(
          document.referrer,
          window.location.origin,
        ),
        meta: { filter_name: filterName, filter_count: chips.length },
      });
    },
    [chips.length, pathname],
  );

  const remove = useCallback(
    (chip: Chip) => {
      const next = removeMulti(state, chip.key, chip.value);
      const qs = toQueryString(next);
      const target = qs ? `${pathname}?${qs}` : pathname;
      router.push(target, { scroll: false });
      emit(`${chip.key}:${chip.value}`);
    },
    [emit, pathname, router, state],
  );

  if (chips.length === 0) return null;

  return (
    <div className={className} aria-label="Active filters">
      <ul className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <li key={`${chip.key}:${chip.value}`}>
            <button
              type="button"
              onClick={() => remove(chip)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-3 text-[12px] font-medium text-sand transition-colors hover:bg-ink/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              aria-label={`Remove filter ${chip.label}`}
            >
              {chip.label}
              <X size={12} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function humanize(prefix: string, value: string): string {
  const pretty = value
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  return `${prefix}: ${pretty}`;
}
