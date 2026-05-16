# Quickstart: IA & Navigation

**Feature**: `001-ia-navigation`
**Audience**: Contributors implementing this feature, or extending the IA later (adding a new route, a new locale, a new event).
**Prerequisite**: Repo cloned, `npm install` run, `infrastructure/docker/docker-compose up` running (provides Meilisearch + Supabase). Constitution and `CLAUDE.md` skimmed.

This is a recipe book. Each section is a self-contained task with the files to touch and the test to add.

---

## How to add a new top-level route

Example: adding `/help` as a new editorial page in the "About" section.

1. **Register in the route map** — `src/lib/routes/routeMap.ts`:
   ```ts
   { id: 'help', path: '/help', section: 'about', headerNav: false,
     footerGroup: 'about', renderMode: 'static', primaryPersona: 'all',
     stickyHeader: false, headerSurface: 'sand',
     requiresAuth: false, requiresEstablishedContributor: false },
   ```
2. **Add the dictionary entry** — `src/lib/i18n/messages/en.json`:
   ```json
   "routes": { "help": { "label": "Help", "description": "How to use WellSourced" } }
   ```
3. **Create the page** — `src/app/[locale]/help/page.tsx`. Use a Server Component. The `AppShell` is mounted by the parent layout — your page only renders the body.
4. **No nav code changes needed.** The footer reads the route map and the dictionary; the new entry appears automatically under "About."
5. **Test:**
   ```ts
   // tests/unit/lib/routes/routeMap.test.ts — already covers the invariant
   it('every route id has a dictionary entry', ...);
   ```
   No new test required — the invariant test catches drift.

---

## How to add a route to the primary header

Constraint: FR-005 caps the primary header at exactly 4 links (Find, Brands, Categories, About). Adding a 5th requires a spec amendment, not just a route-map flag flip.

If a spec amendment lands, the steps are:

1. Set `headerNav: true` on the new route in `routeMap.ts`.
2. Confirm the entry's `section` is one of `'discover'` or `'about'` (validated by unit test in `routeMap.test.ts`).
3. Verify the dictionary `nav.<id>` key exists (e.g., `nav.help`).
4. Re-run the SC-004 visual audit — added link increases header pixel weight; ensure deep-teal stays ≤10%.

---

## How to add a new locale

Example: adding `de` (German).

1. **Update the config** — `src/lib/i18n/config.ts`:
   ```ts
   export const locales = ['en', 'de'] as const;
   ```
2. **Create the dictionary** — `src/lib/i18n/messages/de.json`, mirroring the `en.json` schema exactly. TypeScript's `Dictionary` type will fail to compile if any key is missing.
3. **Update `localeName`** in each dictionary so the `LocaleSwitcher` shows the right label.
4. **Verify `matchLocale.ts`** prefix-matches German `Accept-Language` headers correctly:
   ```ts
   // tests/unit/lib/i18n/matchLocale.test.ts
   expect(matchLocale('de-DE,en;q=0.9')).toBe('de');
   ```
5. **Static generation** is automatic — Next.js builds `/de/...` versions of every static page from the same source.
6. **Verify hreflang emission** — open a brand page and confirm `<link rel="alternate" hreflang="de" href=".../de/brand/[slug]">` and `<link rel="alternate" hreflang="en" href=".../en/brand/[slug]">` and `<link rel="alternate" hreflang="x-default" href=".../en/brand/[slug]">` are all present.
7. **Visual confirmation** — the `LocaleSwitcher` in the footer becomes interactive (`<select>` rather than non-interactive label).

---

## How to add a new nav event

Example: capturing `breadcrumb_clicked` to measure how often users use the back-link pattern.

1. **Update the event enum** in `src/lib/analytics/events.ts`:
   ```ts
   export type NavEvent =
     | { name: 'page_view'; ... }
     // ...
     | { name: 'breadcrumb_clicked'; meta: { from_path: string; to_path: string } };
   ```
2. **Update the OpenAPI contract** — `specs/001-ia-navigation/contracts/events-api.openapi.yaml`, add `breadcrumb_clicked` to the enum.
3. **Update the DB constraint** — `infrastructure/supabase/migrations/0002_add_breadcrumb_event.sql`:
   ```sql
   ALTER TABLE nav_events DROP CONSTRAINT event_name_enum;
   ALTER TABLE nav_events ADD CONSTRAINT event_name_enum CHECK (event_name IN (
     'page_view', /* ... */ 'breadcrumb_clicked'
   ));
   ```
4. **Emit from the component** — `src/components/nav/Breadcrumb.tsx`:
   ```tsx
   <a onClick={() => sendEvent({ name: 'breadcrumb_clicked', meta: { ... } })}>...</a>
   ```
5. **Verify no PII** — `meta.from_path` and `meta.to_path` are pathnames (no query/hash). The DB CHECK constraint will reject inserts that try to slip in `email`/`user_id`/`ip`/`query`.
6. **Add the integration test** — `tests/integration/api/events.test.ts` exercises the new event name and asserts a 204.

---

## How to verify the four signature behaviors

### James's path is unbroken (P1)

```bash
# 1. Start the dev server
npm run dev

# 2. Open / in a private window
# 3. Confirm: search bar is the most prominent interactive element on first viewport
# 4. Type "shirts", press Enter
# 5. Confirm: lands on /en/search?q=shirts with results visible above the fold
# 6. Click "Buy direct" on any result
# 7. Confirm: opens in a new tab to the brand's Shopify store (rel="noopener noreferrer")
```

Automated: `tests/e2e/james-path.spec.ts` (Playwright; not in scope of this plan — added in tasks).

### Maya reaches trust data (P2)

```bash
# 1. Open /en/search?q=shirts
# 2. Click the brand name on any result (not the product title)
# 3. Confirm: lands on /en/brand/[slug] with trust summary in first viewport
# 4. Click "View all products"
# 5. Confirm: lands on /en/brand/[slug]/products WITH a "← Brand name" breadcrumb (back-link pattern)
```

### Auth-gated route preserves intent (P3 / FR-022)

```bash
# 1. Sign out (or open private window)
# 2. Visit /en/admin
# 3. Confirm: redirected to OAuth flow
# 4. Complete OAuth
# 5. Confirm: returned to /en/admin (not to / or /en/)
```

### URL state survives (P3 / SC-005)

```bash
# 1. Open /en/search?q=shirts
# 2. Apply two filters
# 3. Copy the URL
# 4. Open in a clean browser
# 5. Confirm: query and both filters are restored; filter chips are visible
```

---

## How to run the SC-001 / SC-002 dashboards

The success-criteria queries live in `data-model.md §4`. To run them ad-hoc against local data:

```bash
# 1. In an SQL client connected to local Supabase Postgres:
\i specs/001-ia-navigation/data-model.md  # (not runnable; copy the queries by hand)

# OR via psql heredoc:
psql $DATABASE_URL <<'SQL'
  -- SC-001
  WITH home_views AS ( /* ... see data-model.md */ );
SQL
```

There is no production dashboard wired up by this feature — that is intentionally out of scope. Dashboards land in a follow-up feature once we have a week of data to validate the queries.

---

## How to update an existing nav surface without breaking the contract

Rules of thumb:

- **Never fork the existing `NavBar.tsx`** — modify it in place. The IA spec treats it as the canonical primary header.
- **Add components to `src/components/nav/`**, not `src/components/ui/`. The `ui/` namespace is for atomic primitives shared with the design site; `nav/` is for IA-specific composites.
- **Never reach into a page component from a nav component.** Pages tell `AppShell` what to render via Server Component props or route-map flags (`stickyHeader`, `headerSurface`); they don't poke at the header directly.
- **Theme toggle is the only icon-only control in the header right slot.** Adding a second icon-only control to the right slot requires a spec amendment.
- **No glassmorphism, ever.** If you find yourself reaching for `backdrop-blur` or a translucent `bg-*`, stop and use a solid token from `globals.css`. The CI guard from SC-010 will block you anyway.

---

## How to debug the locale redirect

If `/brand/patagonia` doesn't redirect to `/en/brand/patagonia`:

1. Confirm `src/middleware.ts` exists and exports `matcher` and `middleware`.
2. Check the `matcher` config excludes `/api/*`, `/_next/*`, `/design/*`, and static assets.
3. Hit the path with `curl -v` and confirm the `308 Permanent Redirect` and `Location: /en/brand/patagonia` headers.
4. If 308 is correct but the browser doesn't follow: check `Cache-Control` — a stale 200 may be cached in the browser. Hard-reload.
5. If you're testing in dev, restart `npm run dev` after editing `middleware.ts` — Next.js doesn't HMR middleware.

---

## How to confirm the global header renders without JS (SC-008)

```bash
# 1. Build production
npm run build
npm run start

# 2. curl any route
curl -s http://localhost:3000/en/about | grep -c '<header'
# Expect: ≥ 1

# 3. Disable JS in Chrome DevTools → reload /en/about
# Expect: header, search-icon button, theme toggle, hamburger, footer all visible
# (the search-icon button won't open the drawer without JS — that's acceptable;
#  the homepage hero search is a real <form> that still submits)
```

---

## Common gotchas

- **`useRouter` in a Server Component**: doesn't work. Use `next/headers` `headers()` to read the pathname (set by middleware as `x-pathname`).
- **localStorage access in SSR**: throws. Guard with `typeof window !== 'undefined'`. The inline `themeScript` runs in the browser only — never imported into a Server Component.
- **Brand JSON missing locale fields**: brand-data is locale-agnostic in this repo. Per-locale brand content (description in DE) is a future schema change in the `brand-data` repo; not in scope here.
- **`/api/events` returning 204 even when DB is down**: by design (FR-036). To debug, check Supabase logs directly — the endpoint will not surface DB errors to the client.
- **Mobile sticky header overlapping the keyboard**: shouldn't happen with `position: sticky` (see research R9). If it does on a specific device, file an issue with the device + OS version — don't switch to `position: fixed`.

---

## What is out of scope for this feature

- Visual design of individual pages (the page bodies — only the chrome around them is here)
- The actual `/search` results rendering, the brand profile data fetching, the category filtering logic
- Server actions for "Suggest an edit" — that's a contributor-flow feature
- The contributor authentication implementation — assumed to exist
- Dashboards for the nav events — follow-up feature
- Adding `/help`, `/api`, `/blog` or other routes not in FR-001 — requires spec amendment

---

## When in doubt

Re-read the spec (`spec.md`) and the plan's Constitution Check (`plan.md §Constitution Check`). The five Product Principles and ten Technical Principles arbitrate every judgment call. If a proposed change makes the search-first homepage less obvious, makes the chrome louder, introduces glassmorphism, adds a client-side analytics SDK, or sets a cookie — the answer is no.
