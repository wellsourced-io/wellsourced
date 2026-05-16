---

description: "Task list for IA & Navigation implementation"
---

# Tasks: Information Architecture & Navigation

**Input**: Design documents from `/specs/001-ia-navigation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are INCLUDED — the Constitution mandates Vitest unit tests for `src/lib/` modules, integration tests for API routes, and accessibility tests via axe-core (per FR-028 + SC-007 + Constitution §Code Quality §Testing).

**Organization**: Tasks are grouped by user story. Phase 1 (Setup) and Phase 2 (Foundational) build the shared chrome scaffolding that every user story consumes; once Phase 2 completes, user-story phases are independently testable and parallelizable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US6 from spec.md)
- File paths are absolute or repo-relative

## Path Conventions

Single Next.js web app (per plan.md §Project Structure):
- Application code: `src/app/`, `src/components/`, `src/lib/`, `src/middleware.ts`
- Tests: `tests/unit/`, `tests/integration/`, `tests/a11y/`
- Cross-repo: `infrastructure/supabase/migrations/` lives in sibling `wellsourced-io/infrastructure` repo (requires separate PR per Constitution §Multi-Repo Awareness)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and create test scaffolding required by every phase.

- [X] T001 Add `vitest@^2`, `@vitest/coverage-v8`, `@testing-library/react@^16`, `@testing-library/jest-dom`, `jest-axe`, `axe-core`, `@supabase/supabase-js@^2` to `package.json` dependencies/devDependencies and run `npm install`
- [X] T002 [P] Create `vitest.config.ts` at repo root with `jsdom` environment, path aliases mirroring `tsconfig.json` (`@/`), and coverage thresholds (>80% for `src/lib/` per Constitution)
- [X] T003 [P] Create test directory structure: `tests/unit/{lib,components}/`, `tests/integration/{api,middleware,us1,us2,us3,us4,us5,us6}/`, `tests/a11y/`, each with a `.gitkeep`
- [X] T004 [P] Add the following to `.env.example`: `SESSION_HASH_SECRET=` (random 32-byte hex; required by `src/lib/analytics/sessionId.ts`)
- [X] T005 [P] Add `npm` scripts to `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`, `"test:coverage": "vitest run --coverage"`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the chrome scaffolding — i18n, routing, theme, analytics, AppShell, Footer, NavBar mod, error pages — that every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete. The chrome IS the foundation.

### i18n primitives (R1, R2, R3 from research.md)

- [X] T006 [P] Create `src/lib/i18n/config.ts` exporting `locales: ['en']`, `defaultLocale: 'en'`, and `Locale` type
- [X] T007 [P] Create `src/lib/i18n/messages/en.json` with the full Dictionary schema per data-model.md §2 (nav, footer, routes, drawer, theme, account, breadcrumb, errors, localeName)
- [X] T008 [P] Create `src/lib/i18n/matchLocale.ts` exporting `matchLocale(acceptLanguage: string | null): Locale` with RFC 4647 prefix-match against `locales`
- [X] T009 Create `src/lib/i18n/dictionary.ts` exporting `Dictionary` type and async `getDictionary(locale: Locale): Promise<Dictionary>` (depends on T006, T007)

### Route map (R10 from research.md)

- [X] T010 [P] Create `src/lib/routes/routeMap.ts` with `Page`, `SectionId`, `FooterGroup`, `RenderMode`, `Persona` types and the 15-entry seed per data-model.md §1; export helpers `getActiveSection(pathname)`, `headerNavRoutes()`, `footerGroups()`
- [X] T011 [P] Create `src/lib/routes/breadcrumbs.ts` exporting `getBreadcrumbTrail(pathname, dictionary, dynamicLabels?): Breadcrumb[]` per data-model.md §5

### Theme (R4 from research.md)

- [X] T012 [P] Create `src/lib/theme/themeScript.ts` exporting the inline FOUC-avoidance script string per research.md R4
- [X] T013 Create `src/lib/theme/ThemeProvider.tsx` (Client Component): reads `localStorage.ws-theme`, listens to `matchMedia('(prefers-color-scheme: dark)')`, updates `data-theme` attribute on `<html>`, exposes `useTheme()` hook returning `{ theme, resolved, cycle }`

### Analytics (R5, R6, R7 from research.md + contracts/events-api.openapi.yaml)

- [X] T014 [P] Create `src/lib/analytics/events.ts` exporting `NavEvent` discriminated-union type covering all 10 events from FR-033 plus `ViewportBucket`, `ReferrerCategory` types
- [X] T015 [P] Create `src/lib/analytics/sessionId.ts` exporting `deriveSessionId(req: NextRequest): string` per research.md R6 (sha256, 30-min bucket, server-only)
- [X] T016 [P] Create `src/lib/analytics/beacon.ts` exporting `sendEvent(event: NavEvent)`: `navigator.sendBeacon` with `fetch(..., { keepalive: true })` fallback per research.md R5; client-only; never throws

### Middleware (R2 from research.md)

- [X] T017 Create `src/middleware.ts` with `matcher` excluding `/api/*`, `/_next/*`, `/design/*`, `/favicon.ico`, `/sitemap.xml`, `/robots.txt`; reads pathname, redirects un-prefixed paths to `/[matchLocale(accept-language)]/<path>` with 308; sets `x-pathname` header for Server Components (depends on T006, T008)

### Root + locale layouts

- [X] T018 Modify `src/app/layout.tsx`: inject `themeScript` via `<script>` in `<head>` before any other script; remove any hard-coded theme class; keep existing font setup (depends on T012)
- [X] T019 Create `src/app/[locale]/layout.tsx`: validates `params.locale` against `locales`, calls `getDictionary(params.locale)`, sets `<html lang={locale}>`, wraps children in `<ThemeProvider>` and `<AppShell>` (depends on T006, T009, T013)

### NavBar modification + AppShell composition

- [X] T020 Modify `src/components/ui/NavBar.tsx`: remove `backdrop-blur-md` (FR-008); change `bg-surface/70` to a solid `bg-surface` token; accept optional `rightSlot` prop (ReactNode) and render between primary nav and existing `right` prop; preserve all existing prop API; ensure `aria-current="page"` is set per FR-006
- [X] T021 [P] Create `src/components/nav/Footer.tsx` (Server Component): reads `routeMap` and dictionary to render 5 named groups (Discover, Contribute, About, For operators, System) per FR-012; renders lockup + tagline per FR-013; renders `<LocaleSwitcher>` (depends on T007, T010)
- [X] T022 [P] Create `src/components/nav/ThemeToggle.tsx` (Client Component): icon-only button cycling system/light/dark via `useTheme()`; uses Sun / Moon / Monitor lucide icons; emits `theme_change` beacon on each toggle; `aria-label` from dictionary (FR-004a) (depends on T013, T016)
- [X] T023 [P] Create `src/components/nav/AccountMenu.tsx` (Client Component): signed-out variant = ghost "Sign in" button per FR-020; signed-in variant = Radix Dropdown with My contributions / Workspace (conditional) / Settings / Sign out per FR-021; emits `signin_initiated` beacon on click (depends on T016)
- [X] T024 [P] Create `src/components/nav/LocaleSwitcher.tsx` (Server Component): renders non-interactive `<span>` showing `dictionary.localeName` at MVP per FR-031; when `locales.length > 1`, renders an interactive `<select>` (depends on T006, T007)
- [X] T025 [P] Create `src/components/nav/MobileDrawer.tsx` (Client Component): Radix Dialog with focus trap, slide animation respecting `prefers-reduced-motion`, contains primary nav + search field + theme toggle row (labeled, per FR-010); emits `drawer_open` beacon on open (depends on T013, T016, T022)
- [X] T026 Create `src/components/nav/AppShell.tsx` (Server Component): reads pathname from `x-pathname` header, looks up `Page` in routeMap, composes `<NavBar>` + main slot + `<Footer>` with route-specific `stickyHeader` / `headerSurface` policies; passes `<ThemeToggle>` + `<AccountMenu>` into NavBar's `rightSlot`; on internal pages also passes compact `<SearchBar>` per FR-007 (depends on T020, T021, T022, T023, T024)

### API route (contracts/events-api.openapi.yaml)

- [X] T027 Create `src/app/api/events/route.ts` exporting `POST` handler: validates payload against the OpenAPI schema, rejects PII keys (`query`, `email`, `user_id`, `ip`) with 400, derives `session_hash` via `deriveSessionId`, inserts into `nav_events`, swallows DB errors and returns 204 per FR-036; enforces 200-event/min/session rate limit returning 429 (depends on T014, T015)

### Page-view emission

- [X] T028 Create `src/components/nav/PageViewTracker.tsx` (Client Component, mounted by AppShell): on pathname change fires `page_view` event via `sendEvent`; computes `viewport_bucket` from `window.innerWidth` and `referrer_category` from `document.referrer` (depends on T016, T026)

### Error pages (FR-025)

- [X] T029 [P] Create `src/app/[locale]/not-found.tsx` (404): magnifying-glass illustration, headline + lede from dictionary, embedded `<SearchBar>`, links to `/brands` and `/categories`; uses `<AppShell>` chrome; no apology copy per FR-025
- [X] T030 [P] Create `src/app/[locale]/error.tsx` (500): helpful retry, link back to `/`, uses `<AppShell>` chrome; no apology copy
- [X] T031 Create `src/app/not-found.tsx` (root, un-prefixed): redirects to `/[defaultLocale]/not-found` preserving query

### Cross-repo migration (R12 from research.md)

- [X] T032 Author `infrastructure/supabase/migrations/0001_nav_events.sql` per data-model.md §4 DDL (table, CHECK constraints, indexes, RLS policies, `prune_nav_events_older_than_90d` function); open PR against `wellsourced-io/infrastructure` repo; record the PR URL in this task before marking complete

### Foundational tests

- [X] T033 [P] Create `tests/unit/lib/routes/routeMap.test.ts`: asserts 15 entries, unique `path`+`id`, exactly 4 entries with `headerNav: true`, every `id` has a matching dictionary key, `getActiveSection` longest-prefix matching cases (depends on T010, T007)
- [X] T034 [P] Create `tests/unit/lib/i18n/matchLocale.test.ts`: table-driven (null → 'en', 'en-US' → 'en', 'de-DE,en;q=0.9' → 'en' at MVP, malformed → 'en') (depends on T008)
- [X] T035 [P] Create `tests/unit/lib/analytics/sessionId.test.ts`: same request within 30 min → same ID; bucket boundary crossed → different ID; output never contains raw IP/UA (depends on T015)
- [X] T036 [P] Create `tests/unit/lib/analytics/beacon.test.ts`: mocks `navigator.sendBeacon` returning false → asserts `fetch` keepalive fallback; never throws on rejected fetch (depends on T016)
- [X] T037 [P] Create `tests/integration/middleware/locale.test.ts`: GET `/brand/patagonia` → 308 to `/en/brand/patagonia`; query string and hash preserved; `/en/about` passes through; `/api/events` and `/design/*` bypass middleware (depends on T017)
- [X] T038 [P] Create `tests/integration/api/events.test.ts`: valid payload → 204; PII in `meta` → 400; missing `event_name` → 400; rate-limit exceeded → 429 (depends on T027)

**Checkpoint**: Foundation complete. Visiting any `/en/<path>` renders the global chrome (NavBar + Footer + theme toggle + locale switcher), the 404 page works, beacons emit, and the locale middleware redirects unprefixed paths. No user-story page bodies exist yet.

---

## Phase 3: User Story 1 — James completes search-first task (Priority: P1) 🎯 MVP

**Goal**: A first-time visitor lands on `/` with a hero search, types a query, lands on `/search` with a sticky compact search in the header, and (when product cards exist in a future feature) clicks "Buy direct" to exit to a brand's Shopify store. The chrome does not impede this path.

**Independent Test**: Open `/` in a private window; the hero search is the most prominent interactive element; type a query and submit; URL becomes `/en/search?q=...`; the compact search variant is visible in the header on the results page; no chrome click is required to complete the path. Verify `search_submit` and `page_view` events appear in `nav_events`.

### Implementation for User Story 1

- [X] T039 [US1] Move existing `src/app/page.tsx` to `src/app/[locale]/page.tsx`: render the hero variant of `<SearchBar size="hero">` per FR-007; pure Server Component except for the SearchBar island; form `action="/[locale]/search"` so it works without JS (Edge Case: progressive enhancement)
- [X] T040 [P] [US1] Create `src/app/[locale]/search/page.tsx`: route exists for the sticky header behavior; renders a placeholder body awaiting the future search-results feature ("Search results landing — implementation pending"); uses Suspense boundary; `<AppShell>` applies `stickyHeader: true` from routeMap automatically
- [X] T041 [US1] Wire `search_submit` event emission on `<SearchBar>` form submission: anonymized `query_length` and `has_filters` in meta per FR-033; emit via `sendEvent` from `src/lib/analytics/beacon.ts` (depends on T016, T039)
- [X] T042 [P] [US1] Export `buyDirectClicked(href: string)` helper from `src/lib/analytics/events.ts` that wraps `sendEvent` with the `buy_direct_clicked` payload; ready for use by the future product card component without coupling
- [X] T043 [US1] Verify FR-007 behavior in `AppShell`: assert `path === '/'` hides the compact search in NavBar's `rightSlot`; every other path shows it (covered by integration test T044, but confirm logic in `AppShell.tsx`)

### Tests for User Story 1

- [X] T044 [P] [US1] Create `tests/integration/us1/hero-search.test.tsx`: renders `<AppShell pathname="/en/">` and asserts hero `<SearchBar>` is the only search input visible; renders `<AppShell pathname="/en/search">` and asserts compact `<SearchBar>` is in the header but no hero (depends on T026, T039, T040)
- [X] T045 [P] [US1] Create `tests/a11y/us1-search.a11y.test.tsx`: axe-core on the rendered homepage and `/en/search` page; zero violations at Critical or Serious severity per SC-007 (depends on T039, T040)
- [X] T046 [P] [US1] Create `tests/integration/us1/search-submit-beacon.test.ts`: mounts SearchBar, submits form, asserts a `sendEvent` call with `event_name: 'search_submit'`, `meta.query_length: <n>`, `meta.has_filters: false` (depends on T041)

**Checkpoint**: User Story 1 fully functional. James's path is unbroken. SC-001 measurement is now wired (page_view → search_submit beacons land in `nav_events`).

---

## Phase 4: User Story 2 — Maya reaches verified trust data (Priority: P2)

**Goal**: A user clicks a brand name on a result card (or via deep link) and lands on the brand profile with trust data in the first viewport; can navigate to the full product catalog and back via a breadcrumb; can click "Suggest an edit" to enter the contributor flow with intent preserved.

**Independent Test**: Visit `/en/brand/example-brand` directly; profile chrome (lockup, sub-nav with Overview/Products/Trust data tabs) renders; click "View all products" → URL becomes `/en/brand/example-brand/products` with a "← Example Brand" breadcrumb that returns to the profile.

### Implementation for User Story 2

- [X] T047 [P] [US2] Create `src/app/[locale]/brand/[slug]/page.tsx`: Server Component, exports `generateStaticParams` enumerating brand slugs from `brand-data/` (read-only mount), renders `<AppShell>` (sand surface from routeMap) + `<BrandProfileSubNav active="overview">` + body placeholder; body is a slot for the future profile-data feature
- [X] T048 [P] [US2] Create `src/app/[locale]/brand/[slug]/products/page.tsx`: Server Component, exports `generateStaticParams`, renders `<AppShell>` + `<Breadcrumb>` (back-link to profile) + `<BrandProfileSubNav active="products">` + body placeholder
- [X] T049 [P] [US2] Create `src/components/nav/BrandProfileSubNav.tsx` (Server Component): chip-pattern sub-nav per FR-014 with three tabs (Overview, Products, Trust data); Trust data is an in-page anchor (`href="#trust-data"`), other two are real route links; accepts `active: 'overview' | 'products'` prop; never uses primary-nav underline pattern
- [X] T050 [US2] Create `src/components/nav/Breadcrumb.tsx` (Server Component): back-link pattern (`← {parentLabel}`) per FR-017 using `getBreadcrumbTrail` from `src/lib/routes/breadcrumbs.ts`; renders nothing if trail is empty; emits `nav_click` beacon on click via a small client island (depends on T011, T016)
- [X] T051 [US2] Add "Suggest an edit" affordance link on brand profile body slot in T047: link target is `/en/admin/suggest?brand=[slug]&field=` (the `/admin/suggest` route is owned by US5 — for now, the link exists and US5 wires the destination)

### Tests for User Story 2

- [X] T052 [P] [US2] Create `tests/unit/lib/routes/breadcrumbs.test.ts`: asserts trail for `/en/brand/x/products` is `[{ label: 'x', href: '/en/brand/x' }]`; trail for `/en/brand/x` is `[]`; trail for `/en/c/foo` is `[{ label: 'Categories', href: '/en/categories' }]` (depends on T011)
- [X] T053 [P] [US2] Create `tests/integration/us2/brand-profile-nav.test.tsx`: renders profile page, asserts BrandProfileSubNav renders 3 tabs; renders products tab, asserts breadcrumb back-link exists and href points to profile (depends on T047, T048, T049, T050)
- [X] T054 [P] [US2] Create `tests/a11y/us2-brand.a11y.test.tsx`: axe-core on profile and products pages; zero violations (depends on T047, T048)

**Checkpoint**: User Story 2 fully functional. Maya can reach trust-data surface and navigate brand sub-pages.

---

## Phase 5: User Story 3 — Priya browses by category (Priority: P2)

**Goal**: A visitor can enter category browsing from a discoverable affordance on `/`, see brands and products grouped under a category, and navigate to a brand profile with a breadcrumb back.

**Independent Test**: Open `/`; a "Browse by category" affordance is visible and labeled; click → land on `/en/categories`; pick a category tile → land on `/en/c/<slug>` with a breadcrumb back to `/en/categories`; click any brand → land on profile with breadcrumb back to the category.

### Implementation for User Story 3

- [X] T055 [P] [US3] Create `src/app/[locale]/categories/page.tsx`: Server Component, renders `<AppShell>` (sand surface) + category index body (placeholder grid awaiting category-data integration; uses existing `<CategoryTile>` component from `src/components/ui/`)
- [X] T056 [P] [US3] Create `src/app/[locale]/c/[slug]/page.tsx`: Server Component, exports `generateStaticParams` from category metadata, renders `<AppShell>` (white surface, sticky header from routeMap) + `<Breadcrumb>` + body placeholder; respects URL state for filters per US6
- [X] T057 [US3] Add "Browse by category" affordance to the homepage `src/app/[locale]/page.tsx` immediately below the hero search: a row of 4–6 `<CategoryTile>` previews + a "See all categories →" link to `/en/categories`; uses existing tile component (depends on T039)

### Tests for User Story 3

- [X] T058 [P] [US3] Create `tests/integration/us3/category-browse.test.tsx`: renders homepage, asserts "Browse by category" tiles are present with links to `/en/categories`; renders `/en/categories`, asserts category tiles link to `/en/c/<slug>`; renders `/en/c/<slug>`, asserts breadcrumb back to `/en/categories` (depends on T055, T056, T057)
- [X] T059 [P] [US3] Create `tests/a11y/us3-categories.a11y.test.tsx`: axe-core on categories index and single-category page (depends on T055, T056)

**Checkpoint**: User Story 3 fully functional. Priya has a browse-first entry; category SEO surface ready.

---

## Phase 6: User Story 4 — Elena evaluates as a listing destination (Priority: P3)

**Goal**: A brand operator finds the "For brands" page from the footer, reads what listing entails, and reaches `/submit` via a primary CTA.

**Independent Test**: Open any page; scroll to footer; "For brands" link is present and labeled clearly under the "For operators" group; click → land on `/en/for-brands`; primary CTA links to `/en/submit`.

### Implementation for User Story 4

- [X] T060 [P] [US4] Create `src/app/[locale]/for-brands/page.tsx`: Server Component, renders `<AppShell>` + operator-targeted body (placeholder copy answering: who runs this, what does listing cost, what data is required, what does the profile look like, how to onboard); primary `<Button variant="primary">List your brand</Button>` linking to `/en/submit`
- [X] T061 [P] [US4] Create `src/app/[locale]/submit/page.tsx`: Server Component, renders `<AppShell>` + submission-form placeholder ("Brand submission — full form is a separate feature"; future feature owns the form); for now just confirms the route resolves and chrome renders
- [X] T062 [US4] Verify `<Footer>` (already built in T021) renders the "For operators" group containing the `/for-brands` link; if missing, fix `routeMap.ts` `footerGroup: 'operators'` assignment for the `for-brands` entry (depends on T021, T010)

### Tests for User Story 4

- [X] T063 [P] [US4] Create `tests/integration/us4/operator-path.test.tsx`: renders Footer, asserts "For operators" group contains a link to `/en/for-brands`; renders `/en/for-brands` page, asserts primary CTA exists and links to `/en/submit` (depends on T060, T061, T062)

**Checkpoint**: User Story 4 fully functional. Elena's evaluation path is intact.

---

## Phase 7: User Story 5 — Contributor enters editorial workflow (Priority: P3)

**Goal**: A signed-out visitor clicks "Suggest an edit" on a brand profile, completes GitHub OAuth, and is returned to the edit form with brand and field preserved. Established contributors have a workspace at `/admin` with a sidebar that preserves the consumer header.

**Independent Test**: Sign out; visit `/en/admin` → redirected to OAuth → after sign-in returns to `/en/admin`. On brand profile: click "Suggest an edit" → OAuth flow → return to `/en/admin/suggest?brand=x&field=y` with both params intact.

### Implementation for User Story 5

- [X] T064 [P] [US5] Create `src/app/[locale]/contribute/page.tsx`: Server Component, renders `<AppShell>` + public contributor-onboarding body (placeholder explaining the three contributor tiers per spec §3.7 and a "Sign in with GitHub" CTA that initiates OAuth)
- [X] T065 [US5] Create `src/app/[locale]/admin/layout.tsx`: Server Component, validates auth via Supabase session (Server Component-safe), redirects to OAuth if missing; renders `<AppShell>` PLUS `<WorkspaceSidebar>` per FR-015 — the consumer chrome stays visible at the top
- [X] T066 [US5] Create `src/app/[locale]/admin/page.tsx`: workspace home placeholder (queue counts, recent edits — actual implementation owned by future contributor-flow feature)
- [X] T067 [P] [US5] Create `src/components/nav/WorkspaceSidebar.tsx` (Server Component): DocShell-style sidebar matching the pattern at `src/app/design/(docs)/`; sections: Submissions queue, My edits, Disputes (Moderator only), Settings; active item highlighted via deep-teal underline (no pill fill — keeps the chrome rule)
- [X] T068 [US5] Extend `src/middleware.ts` (modifying T017): for paths matching `/[locale]/admin/*`, check Supabase session cookie; if missing, redirect to OAuth provider with `?next=<original-path>` preserved; on successful OAuth callback, the auth handler (existing or to-be-created) honors `next` for the return URL (depends on T017)
- [X] T069 [US5] Extend `src/components/nav/AccountMenu.tsx` (modifying T023): signed-in variant queries the user's contributor tier from Supabase; shows "Workspace" menu item only when tier is `'established'` or `'moderator'` per FR-021; emits `signin_completed` beacon on first render after sign-in (depends on T023)
- [X] T070 [US5] Create `src/app/[locale]/admin/suggest/page.tsx`: Client Component reading `searchParams.brand` and `searchParams.field`; renders pre-filled edit form (placeholder UI — actual form fields land with the contributor-flow feature); confirms FR-022 round-trip — user lands here with intent preserved

### Tests for User Story 5

- [X] T071 [P] [US5] Create `tests/integration/us5/admin-auth-gate.test.tsx`: GET `/en/admin` without session → 302 to OAuth with `?next=/en/admin`; with valid session → 200 with WorkspaceSidebar visible AND consumer NavBar still rendered (depends on T065, T068)
- [X] T072 [P] [US5] Create `tests/integration/us5/suggest-edit-intent.test.tsx`: simulate signed-out user clicking suggest-edit on `/en/brand/x` with `field=ownership_type`; assert redirect to OAuth with `?next=/en/admin/suggest?brand=x&field=ownership_type`; assert post-OAuth return to that URL with both params preserved (depends on T068, T070)
- [X] T073 [P] [US5] Create `tests/a11y/us5-admin.a11y.test.tsx`: axe-core on `/en/admin` rendered with mock established-contributor session; assert WorkspaceSidebar has correct landmark + keyboard order (depends on T065, T067)

**Checkpoint**: User Story 5 fully functional. Contributor workflow chrome is in place; consumer chrome stays consistent inside the workspace per FR-015.

---

## Phase 8: User Story 6 — URL state shareability (Priority: P3)

**Goal**: Applying filters on `/search`, `/c/[slug]`, or `/brands` updates the URL; opening that URL in a clean browser restores the exact same query, filters, and sort; browser back/forward preserve state without re-fetch.

**Independent Test**: Open `/en/search?q=shirts`; apply two filter chips; copy URL; open in private window; query and both filter chips are visible and active; click a result, browser back → state preserved.

### Implementation for User Story 6

- [X] T074 [P] [US6] Create `src/lib/routes/filterParams.ts`: typed serialize/deserialize between `URLSearchParams` and structured filter state (`{ q, ownership[], category[], priceRange, sortBy, page }`); pure functions with table-driven tests; handle empty values, multi-value params, sort order
- [X] T075 [US6] Wire `<FilterChip>` removal to URL update on `/search`, `/c/[slug]`, `/brands`: client-side `useRouter()` + `useSearchParams()`; uses Next.js `router.push` with `scroll: false` so removing a chip doesn't reset scroll; emits `filter_remove` beacon
- [X] T076 [US6] Wire filter application (selecting a chip) to URL update + `filter_apply` beacon emission; ensure active chips on render derive from URL (single source of truth)
- [X] T077 [US6] Configure Next.js `scroll: true` defaults on internal `<Link>` navigation between `/search` and brand profiles; verify browser back from brand → search restores prior scroll position (Next.js App Router does this by default — confirm and document)

### Tests for User Story 6

- [X] T078 [P] [US6] Create `tests/unit/lib/routes/filterParams.test.ts`: round-trip tests (state → URL → state is identity); edge cases (empty filters, single vs multi-value, malformed URLs default safely) (depends on T074)
- [X] T079 [P] [US6] Create `tests/integration/us6/url-state.test.tsx`: simulate applying filters via `<FilterChip>`, assert URL updates correctly; simulate loading the resulting URL, assert chip components render as active (depends on T075, T076)
- [X] T080 [P] [US6] Create `tests/integration/us6/back-button.test.tsx`: simulate `/search?q=x` → navigate to `/brand/y` → browser back; assert URL is `/search?q=x` and filter state is restored (depends on T077)

**Checkpoint**: All 6 user stories independently functional. The IA chrome is feature-complete.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates, audits, and infrastructure to verify the Success Criteria from the spec.

- [X] T081 [P] Create `scripts/audit-teal-ratio.ts` (Node script using `playwright` + a pixel sampler): visits each top-level route in headless Chromium, screenshots the header/footer/drawer, computes deep-teal (`#0d7377`) pixel ratio, asserts ≤ 10% per SC-004; CI-runnable
- [X] T082 [P] Add `.github/workflows/visual-guardrails.yml` step: greps `src/components/`, `src/app/` for `backdrop-blur`, `bg-.*\/[0-9]`, `border-l-\[[2-9]`, `border-r-\[[2-9]` patterns; fails the build on any match per SC-010 and DESIGN.md §6 Don'ts
- [X] T083 [P] Create `tests/a11y/nav.a11y.test.tsx`: axe-core sweep — renders `<AppShell pathname={p}>` for each `p` in routeMap, asserts zero Critical/Serious violations per FR-028 and SC-007
- [X] T084 [P] Create `src/app/sitemap.ts`: emits XML sitemap from `routeMap.filter(p => p.renderMode === 'static')`; one entry per (route × locale) pair; includes `<lastmod>` from build time
- [X] T085 [P] Create `src/app/robots.ts`: emits robots.txt allowing all consumer routes, disallowing `/api/*` and `/admin/*`, pointing to `/sitemap.xml`
- [X] T086 [P] Verify hreflang emission on each statically generated page per FR-030: add a runtime assertion in a `tests/integration/seo/hreflang.test.tsx` that fetches `/en/brand/<slug>`, `/en/c/<slug>`, `/en/brands` and confirms `<link rel="alternate" hreflang="en">` and `<link rel="alternate" hreflang="x-default">` are present in the HTML
- [X] T087 Configure Lighthouse CI for `/en/` (and `/en/search`, `/en/brand/<example>`): assert Performance ≥ 90, Accessibility ≥ 95 per Constitution §Code Quality §Performance + WCAG 2.1 AA
- [X] T088 [P] Create `tests/unit/lib/i18n/dictionary-voice.test.ts`: loads `en.json`, asserts no string starts with banned tokens ("Shop", "Sellers", "Ethics score", "ethical", "conscious", "sustainable", "guilt-free", "Amazon alternative") per FR-024
- [X] T089 [P] Add `npm run nav:audit` script wiring T081 + T082 + T086 into a single command for local pre-PR validation
- [X] T090 Run the `specs/001-ia-navigation/quickstart.md` walkthrough end-to-end on a clean clone: verify each section's recipe works as written; update quickstart if any step has drifted from the implementation
- [X] T091 Update `CLAUDE.md` § Information Architecture section: replace the placeholder route list with the IA URLs as actually implemented (locale-prefixed paths, `/for-brands` added, `/categories` and `/c/[slug]` added, `/manifesto` and `/design` already listed)
- [X] T092 Final Constitution review: confirm each Product Principle (§1–§5) and Technical Principle (§6–§10) is satisfied by a passing artifact (axe-core report → §Accessibility; Lighthouse score → §Performance; teal-ratio audit → §Calm-over-loud; no glassmorphism CI guard → DESIGN.md §6; OAuth round-trip test → §Zero Friction); document any gap in `Complexity Tracking` section of `plan.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies. Can begin immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1. Internal dependencies within Phase 2:
  - T009 depends on T006, T007
  - T013 depends on T012
  - T017 depends on T006, T008
  - T018 depends on T012
  - T019 depends on T006, T009, T013
  - T020 is atomic (no deps within Phase 2; modifies an existing file)
  - T021 depends on T007, T010
  - T022 depends on T013, T016
  - T023 depends on T016
  - T024 depends on T006, T007
  - T025 depends on T013, T016, T022
  - T026 depends on T020, T021, T022, T023, T024
  - T027 depends on T014, T015
  - T028 depends on T016, T026
  - T032 (cross-repo migration) can run in parallel with all of Phase 2; required before T027 + downstream beacon emission produces persisted data — see Risk Mitigation in research.md R12
  - T033–T038 (foundational tests) depend on their respective implementation tasks
- **Phase 3+ (User Stories)**: Each phase depends only on Phase 2 completion. Stories are independently testable and parallelizable per the Phase 2 checkpoint.
- **Phase 9 (Polish)**: Depends on all user stories chosen for the release being complete.

### Cross-story dependencies

- US2 T051 (Suggest edit link) and US5 T070 (Suggest edit handler) share the `/admin/suggest` URL contract. If US5 is deferred past MVP, US2's link will 404 — acceptable for staged delivery, but document it in the release notes.
- US6 (URL state) supplements US1 (`/search`) and US3 (`/c/[slug]`); the routes work without US6 (filter chips would still render but not update URL), but the full SC-005 acceptance test requires US6.

### Within Each User Story

- Tests (where included) MUST be written and FAIL before implementation, then pass after.
- Models / lib modules before components.
- Components before pages.
- Pages before integration tests.

### Parallel Opportunities

- **Phase 1**: T002–T005 all [P] (different files)
- **Phase 2**: T006–T008, T010–T012, T014–T016, T021–T024, T029–T030, T033–T038 are all [P] — large parallel window after T006 lands
- **Phase 3 (US1)**: T040, T042, T044–T046 are [P]
- **Phase 4 (US2)**: T047–T049, T052–T054 are [P]
- **Phase 5 (US3)**: T055–T056, T058–T059 are [P]
- **Phase 6 (US4)**: T060–T061, T063 are [P]
- **Phase 7 (US5)**: T064, T067, T071–T073 are [P]
- **Phase 8 (US6)**: T074, T078–T080 are [P]
- **Phase 9 (Polish)**: T081–T086, T088–T089 are [P]
- Different user stories can be worked on in parallel by different developers once Phase 2 lands.

---

## Parallel Example: Phase 2 Foundational

```bash
# After Phase 1 setup completes, launch all independent foundational primitives in parallel:
Task: "Create src/lib/i18n/config.ts (T006)"
Task: "Create src/lib/i18n/messages/en.json (T007)"
Task: "Create src/lib/i18n/matchLocale.ts (T008)"
Task: "Create src/lib/routes/routeMap.ts (T010)"
Task: "Create src/lib/routes/breadcrumbs.ts (T011)"
Task: "Create src/lib/theme/themeScript.ts (T012)"
Task: "Create src/lib/analytics/events.ts (T014)"
Task: "Create src/lib/analytics/sessionId.ts (T015)"
Task: "Create src/lib/analytics/beacon.ts (T016)"
Task: "Author infrastructure migration 0001_nav_events.sql in sibling repo (T032)"
```

## Parallel Example: User Story 1 (after Phase 2)

```bash
# Implementation in parallel where files are independent:
Task: "Create src/app/[locale]/search/page.tsx skeleton (T040)"
Task: "Export buyDirectClicked helper from analytics/events.ts (T042)"

# Tests can be written in parallel against the implementations:
Task: "Integration test: hero on / vs compact on /search (T044)"
Task: "axe-core sweep on /en/ and /en/search (T045)"
Task: "Beacon emission test for search_submit (T046)"
```

---

## Implementation Strategy

### MVP First (Setup + Foundational + User Story 1 only)

1. Complete **Phase 1** (T001–T005)
2. Complete **Phase 2** (T006–T038, plus cross-repo migration T032) — this is the chrome scaffolding
3. Complete **Phase 3 / US1** (T039–T046) — hero search + sticky compact + James's path
4. **STOP and VALIDATE**: Test US1 independently per the spec's Independent Test
5. Deploy: the site is usable. Visitors can search; the chrome is consistent; only the consumer-facing pages beyond `/` and `/search` are placeholders.

**MVP scope**: 46 tasks (T001–T046). Estimated 2–3 weeks for a solo developer.

### Incremental Delivery

After MVP:
- Add **US2 (Maya)** → brand profile chrome lands → test → ship
- Add **US3 (Priya)** → category surfaces land → test → ship
- Add **US4 (Elena)** → operator landing + submit chrome land → test → ship
- Add **US5 (Contributor)** → workspace + auth-gated chrome land → test → ship
- Add **US6 (URL state)** → filter shareability lands → test → ship
- Finally: **Phase 9 Polish** quality gates land before the IA work is declared done.

### Parallel Team Strategy

If multiple developers are available:
1. Whole team completes Phase 1 + Phase 2 together (the chrome must be coherent)
2. Once Phase 2 lands:
   - Developer A: US1 (P1) — search-first MVP
   - Developer B: US2 + US6 (Maya's path + URL state — overlapping component dependencies)
   - Developer C: US3 + US4 (browse + operator — share footer-group concerns)
   - Developer D: US5 (workspace + auth gating)
3. Polish phase coordinated jointly.

---

## Notes

- `[P]` = different files, no incomplete-task dependencies
- `[Story]` label maps each task to its spec.md user story for traceability
- Each user story is independently shippable after Phase 2; the MVP path is Phase 1 + Phase 2 + US1 only
- Tests MUST fail before implementation, then pass after
- Commit after each task or logical group (e.g., the i18n trio T006–T009 as one commit)
- The cross-repo migration (T032) requires an `infrastructure` PR landed before `/api/events` writes successfully — beacons are dropped silently until then per FR-036, an acceptable degradation
- The `NavBar.tsx` modification (T020) is the ONLY in-place edit to an existing component; everything else under `src/components/nav/` and `src/components/ui/` is additive
