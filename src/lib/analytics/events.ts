/**
 * Navigation event surface for the IA/Navigation feature (spec: 001-ia-navigation).
 *
 * Environment-agnostic: safe to import from both server and client code.
 * No PII, no client-side identifiers — see FR-033 through FR-036 in the spec
 * for the full instrumentation contract.
 */

/** Bucketed viewport width at event time. Computed client-side from `window.innerWidth`. */
export type ViewportBucket = 'mobile' | 'tablet' | 'desktop';

/** Bucketed referrer per FR-034 — the full referrer URL is never transmitted or stored. */
export type ReferrerCategory = 'internal' | 'external' | 'search_engine' | 'direct';

/** Theme preference values shared by `theme_change` event metadata. */
export type ThemePreference = 'system' | 'light' | 'dark';

/** The 10 instrumented event names from FR-033. */
export type EventName =
  | 'page_view'
  | 'search_submit'
  | 'filter_apply'
  | 'filter_remove'
  | 'nav_click'
  | 'drawer_open'
  | 'theme_change'
  | 'signin_initiated'
  | 'signin_completed'
  | 'buy_direct_clicked';

/**
 * Fields every event carries. The discriminant is `name`. Per-event `meta`
 * shapes are defined in the discriminated union below.
 */
interface NavEventBase {
  /** Pathname only, including locale prefix (e.g., `/en/search`). No query string. */
  path: string;
  /** Bucketed viewport width at event time. */
  viewport_bucket: ViewportBucket;
  /** Bucketed referrer category. */
  referrer_category: ReferrerCategory;
  /** Locale segment from the path. Defaults to 'en' on the server when omitted. */
  locale?: string;
}

export interface PageViewEvent extends NavEventBase {
  name: 'page_view';
  meta?: Record<string, never>;
}

export interface SearchSubmitEvent extends NavEventBase {
  name: 'search_submit';
  meta: {
    query_length: number;
    has_filters: boolean;
  };
}

export interface FilterApplyEvent extends NavEventBase {
  name: 'filter_apply';
  meta: {
    filter_name: string;
    filter_count?: number;
  };
}

export interface FilterRemoveEvent extends NavEventBase {
  name: 'filter_remove';
  meta: {
    filter_name: string;
    filter_count?: number;
  };
}

export interface NavClickEvent extends NavEventBase {
  name: 'nav_click';
  meta: {
    section: string;
  };
}

export interface DrawerOpenEvent extends NavEventBase {
  name: 'drawer_open';
  meta?: Record<string, never>;
}

export interface ThemeChangeEvent extends NavEventBase {
  name: 'theme_change';
  meta: {
    from: ThemePreference;
    to: ThemePreference;
  };
}

export interface SignInInitiatedEvent extends NavEventBase {
  name: 'signin_initiated';
  meta?: Record<string, never>;
}

export interface SignInCompletedEvent extends NavEventBase {
  name: 'signin_completed';
  meta?: Record<string, never>;
}

export interface BuyDirectClickedEvent extends NavEventBase {
  name: 'buy_direct_clicked';
  meta: {
    brand_slug: string;
  };
}

/** Discriminated union of all instrumented navigation events. */
export type NavEvent =
  | PageViewEvent
  | SearchSubmitEvent
  | FilterApplyEvent
  | FilterRemoveEvent
  | NavClickEvent
  | DrawerOpenEvent
  | ThemeChangeEvent
  | SignInInitiatedEvent
  | SignInCompletedEvent
  | BuyDirectClickedEvent;

/**
 * The payload shape posted to `/api/events`. Currently identical to `NavEvent`
 * — kept as a distinct alias so the API contract can evolve independently of
 * internal call sites.
 */
export type EventPayload = NavEvent;

/**
 * Meta keys that MUST NOT appear in any event payload. The API handler rejects
 * payloads containing these keys with a 400; the `nav_events` table also
 * enforces this via a CHECK constraint (see data-model.md §4).
 */
export const PII_KEYS = ['query', 'email', 'user_id', 'ip'] as const;

/**
 * Convenience constructor for the `buy_direct_clicked` event. Returns a
 * partial that requires the caller to spread in `path`, `viewport_bucket`,
 * and `referrer_category` — the call site has cheaper access to those values.
 *
 * Example:
 *   sendEvent({ ...buyDirectClicked('acme-co'), path, viewport_bucket, referrer_category });
 */
export function buyDirectClicked(
  brandSlug: string,
): Pick<BuyDirectClickedEvent, 'name' | 'meta'> {
  return {
    name: 'buy_direct_clicked',
    meta: { brand_slug: brandSlug },
  };
}
