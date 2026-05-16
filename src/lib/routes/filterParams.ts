/**
 * URL ↔ filter-state codec for `/search`, `/c/[slug]`, and `/brands`.
 *
 * Per FR-018: filter, sort, and pagination state MUST live in the URL so
 * pages are shareable, indexable, and back/forward-restorable. Per
 * data-model.md and spec §3.3, the canonical fields are:
 *
 *   - q              free-text query (string)
 *   - category[]     repeatable category slug
 *   - ownership[]    repeatable ownership-type slug
 *   - certification[] repeatable certification id
 *   - country[]      repeatable ISO country code
 *   - price          one of '$' | '$$' | '$$$' | '$$$$'
 *   - sort           one of 'relevance' | 'price-asc' | 'price-desc' | 'trust'
 *   - tier           minimum trust tier as 1 | 2 | 3
 *   - page           1-indexed pagination cursor
 *
 * Pure functions — no React, no Next.js, no I/O. Tested in isolation.
 */

export type SortKey = "relevance" | "price-asc" | "price-desc" | "trust";
export type PriceTier = "$" | "$$" | "$$$" | "$$$$";
export type TrustTier = 1 | 2 | 3;

export interface FilterState {
  q: string;
  category: string[];
  ownership: string[];
  certification: string[];
  country: string[];
  price?: PriceTier;
  sort: SortKey;
  tier?: TrustTier;
  page: number;
}

const DEFAULT_SORT: SortKey = "relevance";
const VALID_SORTS: ReadonlySet<SortKey> = new Set([
  "relevance",
  "price-asc",
  "price-desc",
  "trust",
]);
const VALID_PRICES: ReadonlySet<PriceTier> = new Set(["$", "$$", "$$$", "$$$$"]);
const VALID_TIERS: ReadonlySet<number> = new Set([1, 2, 3]);

export function emptyState(): FilterState {
  return {
    q: "",
    category: [],
    ownership: [],
    certification: [],
    country: [],
    sort: DEFAULT_SORT,
    page: 1,
  };
}

/**
 * Decode an URLSearchParams (or compatible) into a FilterState. Unknown
 * values fall through to defaults — never throws.
 */
export function fromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): FilterState {
  const get = (key: string): string | undefined =>
    params instanceof URLSearchParams
      ? (params.get(key) ?? undefined)
      : normalizeSingle(params[key]);
  const getAll = (key: string): string[] =>
    params instanceof URLSearchParams
      ? params.getAll(key)
      : normalizeMulti(params[key]);

  const state = emptyState();
  state.q = (get("q") ?? "").trim();
  state.category = getAll("category").filter(Boolean);
  state.ownership = getAll("ownership").filter(Boolean);
  state.certification = getAll("certification").filter(Boolean);
  state.country = getAll("country").filter(Boolean);

  const rawSort = get("sort");
  if (rawSort && VALID_SORTS.has(rawSort as SortKey)) {
    state.sort = rawSort as SortKey;
  }

  const rawPrice = get("price");
  if (rawPrice && VALID_PRICES.has(rawPrice as PriceTier)) {
    state.price = rawPrice as PriceTier;
  }

  const rawTier = Number(get("tier"));
  if (Number.isInteger(rawTier) && VALID_TIERS.has(rawTier)) {
    state.tier = rawTier as TrustTier;
  }

  const rawPage = Number(get("page"));
  if (Number.isInteger(rawPage) && rawPage > 0) {
    state.page = rawPage;
  }

  return state;
}

/**
 * Encode FilterState into URLSearchParams. Default values are OMITTED so
 * the URL stays short when no filters are active. Multi-value fields are
 * emitted as repeated keys (`?category=a&category=b`).
 */
export function toSearchParams(state: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  for (const v of state.category) params.append("category", v);
  for (const v of state.ownership) params.append("ownership", v);
  for (const v of state.certification) params.append("certification", v);
  for (const v of state.country) params.append("country", v);
  if (state.price) params.set("price", state.price);
  if (state.sort !== DEFAULT_SORT) params.set("sort", state.sort);
  if (state.tier !== undefined) params.set("tier", String(state.tier));
  if (state.page > 1) params.set("page", String(state.page));
  return params;
}

/**
 * Convenience: serialize to a query string suitable for `router.push`.
 * Returns an empty string when no filters are active so callers can write
 * `${pathname}${qs ? '?' + qs : ''}` cleanly.
 */
export function toQueryString(state: FilterState): string {
  const qs = toSearchParams(state).toString();
  return qs;
}

/**
 * Toggle a single value in a multi-value filter. Used by FilterChip
 * click handlers — pure and easy to test.
 */
export function toggleMulti(
  state: FilterState,
  key: keyof Pick<
    FilterState,
    "category" | "ownership" | "certification" | "country"
  >,
  value: string,
): FilterState {
  const current = state[key];
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  return { ...state, [key]: next, page: 1 };
}

/**
 * Remove a single multi-value entry. Used by removable chip "x" buttons
 * to clear a single active filter without affecting siblings.
 */
export function removeMulti(
  state: FilterState,
  key: keyof Pick<
    FilterState,
    "category" | "ownership" | "certification" | "country"
  >,
  value: string,
): FilterState {
  return {
    ...state,
    [key]: state[key].filter((v) => v !== value),
    page: 1,
  };
}

/**
 * Count the number of active filters (excluding `q` and `sort` defaults).
 * Useful for "Clear all (3)" labels.
 */
export function activeFilterCount(state: FilterState): number {
  let count = 0;
  count += state.category.length;
  count += state.ownership.length;
  count += state.certification.length;
  count += state.country.length;
  if (state.price) count += 1;
  if (state.tier) count += 1;
  return count;
}

// ---------------------------------------------------------------------------
// Helpers for object-form (Next.js searchParams shape)
// ---------------------------------------------------------------------------

function normalizeSingle(v: string | string[] | undefined): string | undefined {
  if (v === undefined) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

function normalizeMulti(v: string | string[] | undefined): string[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}
