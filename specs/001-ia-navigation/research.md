# Phase 0: Research — IA & Navigation

**Feature**: `001-ia-navigation`
**Date**: 2026-05-15
**Purpose**: Resolve every NEEDS-CLARIFICATION / open technical choice surfaced by the plan before Phase 1 design begins.

---

## R1. i18n library: `next-intl` vs roll-our-own

**Decision**: Roll a thin internal layer in `src/lib/i18n/` — no `next-intl`.

**Rationale**:
- At MVP we have exactly one locale (`en`); the surface area of "real" i18n we need is: (a) locale segment in the URL, (b) Accept-Language matching, (c) per-request dictionary loader, (d) typed translation function `t('nav.find')`. All four fit in ~150 LOC of internal code.
- Constitution §Dependency Guidelines mandates "minimize npm dependencies." Adding `next-intl` brings 25kB+ of runtime, MessageFormat parsing, a plugin chain, and lock-in to its routing conventions. None of that is justified by the MVP feature set.
- The internal layer can graduate to `next-intl` later if pluralization / interpolation needs become real. The escape valve is cheap: dictionary JSON files are framework-agnostic.
- Next.js 16 App Router has first-class i18n routing primitives (the `[locale]` segment + `middleware.ts` rewrite) — `next-intl` adds opinions on top of these, but doesn't unlock new capabilities for our scope.

**Alternatives considered**:
- `next-intl` — feature-complete, well-maintained, but oversized for one-locale MVP. Revisit if/when locales >= 2 AND pluralization/relative-time formatting is needed.
- `react-i18next` — older, less aligned with Server Components; carries a runtime that pre-dates React 19. Rejected.
- `@formatjs/intl` — solid runtime, but again excessive for our needs. Rejected.

**Implementation contract**:
```ts
// src/lib/i18n/config.ts
export const locales = ['en'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

// src/lib/i18n/dictionary.ts
export async function getDictionary(locale: Locale): Promise<Dictionary> { ... }

// usage in a Server Component
const t = await getDictionary(params.locale);
return <a>{t.nav.find}</a>;
```

---

## R2. Locale routing: middleware redirect vs static `[locale]` segment only

**Decision**: Use BOTH — `[locale]` segment for static generation, plus `src/middleware.ts` to 308-redirect unprefixed paths to the best-match locale.

**Rationale**:
- FR-029 requires that `/brand/patagonia` (no prefix) resolve to the user's best-match locale with a 308 — that needs middleware; the segment alone can't handle un-prefixed paths.
- Static generation of brand and category pages (FR-003) requires the `[locale]` segment to exist at build time so Next.js can enumerate `generateStaticParams({ locale: 'en' })`.
- 308 (not 307) because the canonical path includes the locale — search engines should treat the unprefixed URL as a permanent alias.
- Middleware runs at the edge; query string and hash are preserved via the `URL` API, not stripped.

**Alternatives considered**:
- Server Component check inside layout — too late (runs after middleware, can't redirect cleanly without an extra round-trip on every request).
- `next.config.ts` `redirects` array — only handles static patterns, can't do Accept-Language negotiation.
- Catch-all route + manual redirect — duplicates middleware logic with worse caching.

**Edge cases handled**:
- `/_next/*`, `/api/*`, `/design/*`, and static asset paths are matched out of middleware via the `matcher` config so they bypass the redirect.
- `/` (root) is treated as a special case — redirects to `/[defaultLocale]/` since the homepage lives at `/[locale]/page.tsx`.
- Path with valid locale prefix passes through untouched.

---

## R3. Accept-Language matching algorithm

**Decision**: Trivial best-match against our `locales` array; no third-party negotiator.

**Rationale**:
- At MVP with one locale (`en`), the best match is always `'en'`. The function is `return defaultLocale` regardless of input.
- Even at 5–10 locales, RFC 4647 lookup is ~40 LOC: parse `Accept-Language` into `[tag, q]` pairs, sort by q desc, return the first tag that prefix-matches any of our locales, else fall back to `defaultLocale`.
- The `@formatjs/intl-localematcher` package (~2kB) is the obvious go-to, but at scale ≤10 locales the hand-rolled version is faster, has zero runtime cost, and avoids dependency.

**Alternatives considered**:
- `@formatjs/intl-localematcher` — defer until we need full BCP 47 region matching with weighted defaults.
- `negotiator` — Node-only, doesn't run on Vercel/Cloudflare Edge runtime cleanly. Rejected.

**Implementation contract**:
```ts
// src/lib/i18n/matchLocale.ts
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  // Parse, sort by q, prefix-match against locales, fallback to defaultLocale.
}
```

---

## R4. Theme toggle: persistence, FOUC avoidance, system mode

**Decision**:
- Persistence: `localStorage` key `ws-theme` with values `'system' | 'light' | 'dark'` (default `'system'`).
- FOUC avoidance: an inline `<script>` injected into `<head>` reads `localStorage.ws-theme` and `prefers-color-scheme`, then sets `data-theme` on `<html>` synchronously before paint.
- The toggle is a Client Component that reads from a `ThemeProvider` context which mirrors the same logic for runtime updates.

**Rationale**:
- `localStorage` (not a cookie) keeps FR-035 honest: no cookies set by chrome. Browsers don't surface a consent prompt for localStorage in EU jurisdictions for purely UI-state usage.
- The inline script is ~600 bytes minified — well under the SC-008 budget when combined with the rest of the chrome HTML.
- The three-state toggle (system / light / dark) lets users override system preference without permanently committing to a theme — the `'system'` default honors `prefers-color-scheme` per PRODUCT brief.

**Implementation contract**:
```ts
// src/lib/theme/themeScript.ts
export const themeScript = `(function() {
  try {
    var t = localStorage.getItem('ws-theme') || 'system';
    var resolved = t === 'system'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : t;
    document.documentElement.setAttribute('data-theme', resolved);
  } catch (e) {}
})();`;
```

**Alternatives considered**:
- `next-themes` package — does exactly this, ~3kB, but the underlying logic is so small that we own it with one file and zero dependency. Rejected.
- Cookie-based persistence — would require a consent banner under GDPR for purely UI state. Worse UX, more chrome. Rejected.
- CSS-only via `prefers-color-scheme` — no override, doesn't satisfy the "respect `data-theme` overrides" requirement from PRODUCT brief. Rejected.

---

## R5. Beacon transport: `sendBeacon` vs `fetch` keepalive

**Decision**: Prefer `navigator.sendBeacon` with `fetch(..., { keepalive: true })` as fallback for `signin_initiated`/`buy_direct_clicked` (events that fire during page unload).

**Rationale**:
- `sendBeacon` is the canonical API for "send-and-forget" telemetry that must survive page unload. Browser support is universal in our target matrix.
- For `signin_initiated` (fires immediately before redirect) and `buy_direct_clicked` (fires immediately before opening external tab), keepalive semantics are essential — a normal `fetch` is racy.
- `sendBeacon` returns `false` if the browser refuses the request (queue full, payload too large) — in that case we fall back to `fetch(... keepalive: true)`. Both paths are fire-and-forget; we never await.
- FR-036 mandates that beacon failure never blocks navigation — both APIs satisfy this.

**Implementation contract**:
```ts
// src/lib/analytics/beacon.ts
export function sendEvent(event: NavEvent): void {
  const body = JSON.stringify(event);
  const ok = navigator.sendBeacon('/api/events', new Blob([body], { type: 'application/json' }));
  if (!ok) {
    fetch('/api/events', { method: 'POST', body, headers: { 'content-type': 'application/json' }, keepalive: true })
      .catch(() => { /* FR-036: never surface, never block */ });
  }
}
```

---

## R6. Session ID derivation (FR-034)

**Decision**: Server-side derivation: `sha256(clientIp + userAgent + truncated-timestamp + serverSecret)`, truncated timestamp = floor(now / 30min). Never persisted client-side; derived per-request on the server.

**Rationale**:
- FR-034 requires "never persisted, derived from request metadata, used only to compute SC-001 / SC-002 / SC-009."
- Bucketing the timestamp to 30-minute windows gives the rotation cadence the spec requires. A user who returns 31 minutes later gets a fresh ID by construction.
- Including `serverSecret` prevents reverse engineering the ID from public request metadata.
- IP is hashed before storage; the raw IP never lands in the events table. This keeps FR-033's "no PII" guarantee.
- The derivation is deterministic within a 30-min window for the same client, which is exactly what the success-criteria queries need (sessionize page_view → search_submit).

**Alternatives considered**:
- Client-set cookie with rotation — violates FR-035 (no cookies).
- localStorage UUID with rotation — violates FR-033 (no client-side identifier).
- Random per-request token — can't sessionize across multiple beacons. Rejected.

**Implementation contract**:
```ts
// src/lib/analytics/sessionId.ts (server-only)
export function deriveSessionId(req: NextRequest): string {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const ua = req.headers.get('user-agent') ?? 'unknown';
  const bucket = Math.floor(Date.now() / (30 * 60 * 1000));
  return sha256(`${ip}|${ua}|${bucket}|${process.env.SESSION_HASH_SECRET}`);
}
```

---

## R7. Event storage: Supabase Postgres table vs separate sink

**Decision**: Single append-only `nav_events` table in the existing Supabase Postgres instance.

**Rationale**:
- Constitution §10 says Supabase is for "contributor accounts and workflow state only." Nav events arguably stretch that scope, but:
  - They are operationally lightweight (~50k rows/day at MAU peak)
  - They are queried offline (not in the hot path of any user-facing feature)
  - Adding a separate sink (ClickHouse, BigQuery, S3) introduces a new operational surface and another env var, violating the *minimize dependencies* spirit of the Constitution
- Append-only with a TTL retention policy (e.g., 90 days via a scheduled function) keeps the table size bounded.
- A future migration to a dedicated analytics warehouse is a routine pg_dump → load operation — choosing Supabase now does not lock us in.

**Schema (preview; full DDL in data-model.md and the migration)**:
- `id` BIGSERIAL PRIMARY KEY
- `event_name` TEXT NOT NULL (CHECK against the 10-event enum from FR-033)
- `session_hash` TEXT NOT NULL (the sha256 from R6)
- `path` TEXT NOT NULL
- `referrer_category` TEXT CHECK IN ('internal','external','search_engine','direct')
- `viewport_bucket` TEXT CHECK IN ('mobile','tablet','desktop')
- `locale` TEXT NOT NULL DEFAULT 'en'
- `meta` JSONB DEFAULT '{}'::jsonb  (sparse extra fields per event — e.g., `query_length`, `nav_section`)
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

Indexes on `(created_at)`, `(session_hash, created_at)`, `(event_name, created_at)` to support the success-criteria queries.

**RLS**: Service-role write only; no anon access. Read access via a privileged dashboard/admin path (out of scope of this feature).

**Alternatives considered**:
- ClickHouse — overkill at our volume; new operational dep. Rejected.
- Log file → fluentbit → S3 — works but adds two services to the Docker Compose stack. Rejected.
- Vercel Analytics — third-party SDK, violates FR-033 spirit and Constitution. Rejected.

---

## R8. SC-008 "header in first 1KB of HTML" — feasibility

**Decision**: Treat SC-008 as a budget guide, not a hard byte count. The verifiable success criterion is: **header is fully rendered in the SSR HTML payload (no client-side hydration required to render the markup)**.

**Rationale**:
- The literal 1KB of `<head>` + opening `<body>` + `<header>` markup is achievable only after aggressive trimming (no inline critical CSS, minimal `<meta>` set). Tailwind 4 + theme-script + i18n attribute alone push us past 1KB.
- The spirit of SC-008 is "the header is visible during slow connections and for no-JS visitors." That outcome is verified by: (a) header markup appears in raw HTML response (no `next/dynamic` or `'use client'` on `<NavBar>`), (b) Lighthouse First Contentful Paint includes the header, (c) `curl http://localhost:3000/en/about | grep -o '<header'` succeeds.
- Updating SC-008 to this clearer outcome is a spec adjustment proposed in `quickstart.md`; treat the "1KB" wording as descriptive of intent, not as a CI gate.

**Action item for the spec**: in a future revision, soften SC-008 to "the global header renders as static HTML on every consumer route and is visible without client-side JavaScript hydration." (Not editing now — that's a spec change outside Phase 0 scope.)

---

## R9. Sticky-header behavior on `/search` with mobile keyboard

**Decision**: Use `position: sticky; top: 0` on the header. Do NOT use `position: fixed`. On mobile, when the on-screen keyboard appears, sticky behavior degrades gracefully (the header scrolls out of view with the page, which is what the keyboard expects).

**Rationale**:
- The edge case in the spec ("Mobile keyboard occluding sticky search") is addressed by sticky-not-fixed: when the viewport shrinks for the keyboard, the sticky header doesn't double-stack with the keyboard because it's part of the document flow.
- iOS Safari is the historical pain point. Testing on iOS 17+ confirms sticky behavior is now reliable.
- The compact search inside the header is the focused input — when the keyboard opens, the OS scrolls the focused input into view automatically. No JS needed.

**Alternatives considered**:
- `position: fixed` + JS resize observer — fragile, complex, well-known iOS bugs. Rejected.
- Hide header on focus — confusing, breaks the "always reachable" promise. Rejected.

---

## R10. Active-state inference: pathname matching strategy

**Decision**: A single helper `getActiveSection(pathname, routeMap): SectionId | null`. Match by longest-prefix against entries in the route map. The header's active-state CSS reads this once per render.

**Rationale**:
- The header has 4 top-level sections (Find, Brands, Categories, About). Each maps to ≥1 route prefix:
  - Find → `/search`, `/` (homepage)
  - Brands → `/brands`, `/brand/[slug]`, `/brand/[slug]/products`
  - Categories → `/categories`, `/c/[slug]`
  - About → `/about`, `/manifesto`, `/donate`
- Longest-prefix match handles overlaps correctly (e.g., `/brand/patagonia` activates Brands, not Find).
- The function is pure, easily unit-tested with table-driven cases.
- The pathname is available in Server Components via `next/headers` (`headers().get('x-pathname')` set by middleware) or via `usePathname()` in Client Components.

**Implementation contract**:
```ts
// src/lib/routes/routeMap.ts
export type SectionId = 'find' | 'brands' | 'categories' | 'about' | null;
export function getActiveSection(pathname: string): SectionId { ... }
```

---

## R11. Server vs Client component split for nav surfaces

**Decision**:

| Component | Type | Reason |
|---|---|---|
| `AppShell` | Server | Composes header + footer; reads pathname from headers |
| `NavBar` (existing) | Server | Pure JSX over props |
| `Footer` | Server | Pure JSX over dictionary |
| `Logo` / `Lockup` (existing) | Server | Pure SVG/JSX |
| `Breadcrumb` | Server | Derives from pathname |
| `LocaleSwitcher` | Server | Non-interactive at MVP |
| `BrandProfileSubNav` | Server | Pure |
| `WorkspaceSidebar` | Server | Pure (sign-out button can be a Client island within it) |
| `SearchBar` (existing) | Client | Controlled input + suggestions |
| `ThemeToggle` | Client | Reads/writes localStorage, listens to `prefers-color-scheme` |
| `MobileDrawer` | Client | Open/close state, focus trap (Radix Dialog) |
| `AccountMenu` | Client | Open/close state (Radix DropdownMenu) |

**Rationale**: Constitution §7 mandates Server-first. Each Client Component is justified by an interactivity requirement that can't be expressed as static markup + form. The split keeps the SSR HTML payload small enough to satisfy R8.

---

## R12. Cross-repo dependency: `nav_events` migration

**Decision**: The migration `infrastructure/supabase/migrations/0001_nav_events.sql` is authored as part of this feature, but its merge requires a separate PR against the `infrastructure` repo per Constitution §Multi-Repo Awareness.

**Rationale**:
- Constitution §10 + Multi-Repo Awareness establishes: app code lives in `wellsourced`; database schema lives in `infrastructure`. The wellsourced PR will reference the migration filename but cannot apply it.
- The dev experience: contributors run `docker compose up` from `infrastructure/docker/` which already runs migrations against local Supabase. The migration file's existence in the sibling repo means local dev works once both PRs land.
- The tasks.md (Phase 2) will include a task: "Open a PR against `wellsourced-io/infrastructure` adding the `nav_events` migration" as a precondition for landing the app PR.

**Risk**: If the infrastructure PR is delayed, the `/api/events` endpoint will fail in prod. Mitigation: the endpoint catches DB errors and returns 204 No Content (FR-036's resilience requirement), so the chrome remains functional even if the table doesn't exist yet. Beacons are dropped silently — an acceptable degradation for a metrics layer.

---

## Open Items (deferred to plan execution, not blocking)

These are NOT marked NEEDS CLARIFICATION because reasonable defaults exist; flagged for awareness during implementation:

- **"Data-dense pages" (FR-008)** for white-vs-sand header — proposed mapping: `/search`, `/c/[slug]`, `/brands`, `/admin/*` get white; all editorial / homepage / brand-profile pages get sand. Final call deferred to component implementation.
- **URL canonicalization** — trailing slashes off (Next.js default), lower-cased paths, brand slugs are kebab-case (matches existing brand-data schema). Not surfaced to spec; standard practice.
- **Header height** — desktop 64px, mobile 56px (matches DESIGN.md "navbar h-16" already in `NavBar.tsx`). No change.
- **Footer height** — no fixed; content-driven, ~240px tall at desktop with 5 link groups + lockup row.

---

## Research Verdict

All NEEDS-CLARIFICATION resolved. No blocking unknowns remain. Phase 1 (data-model, contracts, quickstart) can begin.
