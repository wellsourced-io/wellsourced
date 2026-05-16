# Phase 1: Data Model — IA & Navigation

**Feature**: `001-ia-navigation`
**Date**: 2026-05-15

The IA/nav feature is primarily structural rather than data-heavy. The entities defined here are: (1) the **navigation graph** that the UI reads from (in-memory, no DB), (2) the **dictionary** for i18n strings (JSON file), (3) the **theme preference** (browser-local), and (4) the **nav events log** (the only persisted entity, in Postgres).

---

## 1. Navigation Graph (in-memory, `src/lib/routes/routeMap.ts`)

The single source of truth for "what routes exist, where they appear in nav, and who they serve." Read by the header, footer, breadcrumb, sitemap, and a build-time graph check (SC-003).

### Entity: `Page`

| Field | Type | Constraint | Notes |
|---|---|---|---|
| `path` | `string` | Unique; Next.js dynamic-segment syntax (`/brand/[slug]`) | Path WITHOUT locale prefix |
| `id` | `string` | Unique; kebab-case | Stable identifier (e.g., `'brand-profile'`) used in i18n dictionary keys |
| `section` | `SectionId` | One of: `'discover' | 'profile' | 'operator' | 'contribute' | 'about' | 'system'` | Maps to footer group + header active-state |
| `headerNav` | `boolean` | — | True if this page appears in the primary header cluster |
| `footerGroup` | `FooterGroup \| null` | — | Which footer group lists this page (null = unlinked) |
| `renderMode` | `RenderMode` | One of: `'static' | 'ssr' | 'authenticated'` | Drives Next.js generation strategy |
| `primaryPersona` | `Persona` | One of: `'james' | 'maya' | 'priya' | 'elena' | 'contributor' | 'all'` | Used in audits and routing analytics tagging |
| `stickyHeader` | `boolean` | — | If true, header stays visible on scroll (FR-009) |
| `headerSurface` | `'sand' | 'white'` | — | FR-008 background mapping ("data-dense" pages → white) |
| `requiresAuth` | `boolean` | — | True for `/admin/*` — middleware enforces |
| `requiresEstablishedContributor` | `boolean` | — | True for the established-contributor surfaces of `/admin/*` |

### Entity: `Section`

| Field | Type | Notes |
|---|---|---|
| `id` | `SectionId` | See above |
| `label` | `string` | Dictionary key; resolved at render time |
| `activeIndicator` | `'underline' | 'chip' | 'sidebar' | 'none'` | Surface-specific pattern (FR-006 / FR-014 / FR-015) |

### Validation rules

- `path` MUST be unique across all entries.
- `id` MUST be unique across all entries.
- If `requiresAuth` is true, `renderMode` MUST be `'authenticated'`.
- If `headerNav` is true, `section` MUST be one of: `'discover'`, `'about'`.
- Every `path` listed in FR-001 of the spec MUST appear exactly once in the route map (enforced by unit test).
- `id` MUST have a matching entry in `src/lib/i18n/messages/en.json` under `routes.<id>.label` (enforced by unit test).

### Initial seed (matches FR-001 verbatim)

```ts
export const routeMap: Page[] = [
  { id: 'home',        path: '/',                  section: 'discover',  headerNav: false, footerGroup: null,         renderMode: 'static', primaryPersona: 'james',      stickyHeader: false, headerSurface: 'sand',  requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'search',      path: '/search',            section: 'discover',  headerNav: true,  footerGroup: 'discover',   renderMode: 'ssr',    primaryPersona: 'james',      stickyHeader: true,  headerSurface: 'white', requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'brands',      path: '/brands',            section: 'discover',  headerNav: true,  footerGroup: 'discover',   renderMode: 'static', primaryPersona: 'priya',      stickyHeader: false, headerSurface: 'white', requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'brand',       path: '/brand/[slug]',      section: 'profile',   headerNav: false, footerGroup: null,         renderMode: 'static', primaryPersona: 'maya',       stickyHeader: false, headerSurface: 'sand',  requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'brand-products', path: '/brand/[slug]/products', section: 'profile', headerNav: false, footerGroup: null,    renderMode: 'static', primaryPersona: 'maya',       stickyHeader: false, headerSurface: 'white', requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'categories',  path: '/categories',        section: 'discover',  headerNav: true,  footerGroup: 'discover',   renderMode: 'static', primaryPersona: 'priya',      stickyHeader: false, headerSurface: 'sand',  requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'category',    path: '/c/[slug]',          section: 'discover',  headerNav: false, footerGroup: null,         renderMode: 'static', primaryPersona: 'priya',      stickyHeader: true,  headerSurface: 'white', requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'submit',      path: '/submit',            section: 'operator',  headerNav: false, footerGroup: 'contribute', renderMode: 'static', primaryPersona: 'elena',      stickyHeader: false, headerSurface: 'sand',  requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'for-brands',  path: '/for-brands',        section: 'operator',  headerNav: false, footerGroup: 'operators',  renderMode: 'static', primaryPersona: 'elena',      stickyHeader: false, headerSurface: 'sand',  requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'contribute',  path: '/contribute',        section: 'contribute', headerNav: false, footerGroup: 'contribute', renderMode: 'static', primaryPersona: 'contributor', stickyHeader: false, headerSurface: 'sand', requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'admin',       path: '/admin',             section: 'contribute', headerNav: false, footerGroup: null,        renderMode: 'authenticated', primaryPersona: 'contributor', stickyHeader: false, headerSurface: 'white', requiresAuth: true, requiresEstablishedContributor: true },
  { id: 'about',       path: '/about',             section: 'about',     headerNav: true,  footerGroup: 'about',      renderMode: 'static', primaryPersona: 'all',        stickyHeader: false, headerSurface: 'sand',  requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'manifesto',   path: '/manifesto',         section: 'about',     headerNav: false, footerGroup: 'about',      renderMode: 'static', primaryPersona: 'all',        stickyHeader: false, headerSurface: 'sand',  requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'donate',      path: '/donate',            section: 'about',     headerNav: false, footerGroup: 'about',      renderMode: 'static', primaryPersona: 'all',        stickyHeader: false, headerSurface: 'sand',  requiresAuth: false, requiresEstablishedContributor: false },
  { id: 'design',      path: '/design',            section: 'system',    headerNav: false, footerGroup: 'system',     renderMode: 'static', primaryPersona: 'contributor', stickyHeader: false, headerSurface: 'sand', requiresAuth: false, requiresEstablishedContributor: false },
];
```

### Derived structures

- **Header nav cluster**: `routeMap.filter(p => p.headerNav)` — exactly 4 entries per FR-005.
- **Footer groups**: `groupBy(routeMap, 'footerGroup')` — keys: `'discover' | 'contribute' | 'about' | 'operators' | 'system'`.
- **Sitemap source**: `routeMap.filter(p => p.renderMode === 'static')` — feeds `app/sitemap.ts`.

---

## 2. Dictionary (file-backed, `src/lib/i18n/messages/en.json`)

The translation surface for navigation chrome. Keyed by locale.

### Schema

```ts
type Dictionary = {
  nav: {
    find: string;       // "Find"
    brands: string;     // "Brands"
    categories: string; // "Categories"
    about: string;      // "About"
  };
  footer: {
    discover: string;       // "Discover"
    contribute: string;     // "Contribute"
    about: string;          // "About"
    operators: string;      // "For operators"
    system: string;         // "System"
    tagline: string;        // "Public infrastructure for finding products that are actually made well"
  };
  routes: {
    [routeId: string]: {
      label: string;           // shown in footer / breadcrumbs
      description?: string;    // optional, for sitemap / SEO
    };
  };
  drawer: {
    open: string;            // a11y label, "Open menu"
    close: string;
    searchPlaceholder: string;
  };
  theme: {
    label: string;           // a11y label for toggle
    system: string;
    light: string;
    dark: string;
  };
  account: {
    signIn: string;
    myContributions: string;
    workspace: string;
    settings: string;
    signOut: string;
    avatarLabel: string;     // a11y
  };
  breadcrumb: {
    backTo: string;          // "← {0}" pattern
  };
  errors: {
    notFound: {
      title: string;
      lede: string;
      ctaSearch: string;
      ctaBrowse: string;
    };
    serverError: {
      title: string;
      lede: string;
    };
  };
  localeName: string;        // "English (US)" — shown in non-interactive LocaleSwitcher (FR-031)
};
```

### Validation rules

- Every `Page.id` in the route map MUST have a corresponding `routes.<id>.label` entry. Enforced by unit test (`routeMap.test.ts`).
- Every key in the schema MUST be present in `en.json` (the typed schema serves as the contract; missing keys = TypeScript error).
- No string in the dictionary MUST contain HTML tags (rendered as plain text).
- Strings MUST follow the voice rules from FR-023/FR-024 — enforced by an ESLint custom rule or a content-lint test (`dictionary-voice.test.ts`) checking the dictionary for the banned tokens: "Shop", "Sellers", "Ethics score", "ethical", "conscious", "sustainable", etc., when appearing as leading words.

---

## 3. Theme Preference (browser-local)

### Storage

- **Location**: `localStorage`
- **Key**: `ws-theme`
- **Type**: `'system' | 'light' | 'dark'`
- **Default**: `'system'` (when key is absent or invalid)

### State transitions

```
[on first visit]                      → 'system'
[user clicks toggle on 'system']      → 'light'
[user clicks toggle on 'light']       → 'dark'
[user clicks toggle on 'dark']        → 'system'
[user clears localStorage / new tab]  → 'system' (reads from storage)
[prefers-color-scheme changes while 'system'] → re-resolves automatically (matchMedia listener)
```

### Resolved attribute

When `ws-theme` is `'system'`, the resolved attribute on `<html>` is `data-theme="light"` or `data-theme="dark"` based on `prefers-color-scheme`. When `ws-theme` is `'light'` or `'dark'`, the attribute matches verbatim. This is set:
1. Synchronously by the inline `themeScript` in `<head>` before paint (R4).
2. Reactively by the `ThemeProvider` Client Component when the user toggles, or when system preference changes while in `'system'` mode.

### No server-side persistence

The server never sees the theme preference. This keeps FR-035 honest (no cookies) and lets per-device preferences differ for the same logged-in user.

---

## 4. NavEvent (Postgres, append-only)

### Table: `nav_events`

```sql
CREATE TABLE nav_events (
  id              BIGSERIAL PRIMARY KEY,
  event_name      TEXT NOT NULL,
  session_hash    TEXT NOT NULL,
  path            TEXT NOT NULL,
  referrer_category TEXT NOT NULL,
  viewport_bucket TEXT NOT NULL,
  locale          TEXT NOT NULL DEFAULT 'en',
  meta            JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT event_name_enum CHECK (event_name IN (
    'page_view',
    'search_submit',
    'filter_apply',
    'filter_remove',
    'nav_click',
    'drawer_open',
    'theme_change',
    'signin_initiated',
    'signin_completed',
    'buy_direct_clicked'
  )),
  CONSTRAINT referrer_category_enum CHECK (referrer_category IN ('internal','external','search_engine','direct')),
  CONSTRAINT viewport_bucket_enum CHECK (viewport_bucket IN ('mobile','tablet','desktop')),
  CONSTRAINT no_pii_in_meta CHECK (
    NOT (meta ? 'query') AND
    NOT (meta ? 'email') AND
    NOT (meta ? 'user_id') AND
    NOT (meta ? 'ip')
  )
);

CREATE INDEX idx_nav_events_created_at ON nav_events (created_at DESC);
CREATE INDEX idx_nav_events_session ON nav_events (session_hash, created_at);
CREATE INDEX idx_nav_events_event_time ON nav_events (event_name, created_at DESC);

-- RLS: service-role write only; no anon access
ALTER TABLE nav_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY service_write ON nav_events FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY no_anon_read ON nav_events FOR SELECT TO anon USING (false);
```

### Field semantics

| Field | Notes |
|---|---|
| `event_name` | One of the 10 events from FR-033. Constrained by CHECK. |
| `session_hash` | sha256 from R6. Anonymous, rotates every 30 min by construction. |
| `path` | Pathname only (no query string by default). Stored as `/[locale]/...` (preserves locale for cohort analysis). |
| `referrer_category` | Bucketed referrer per FR-034 — never the full URL. |
| `viewport_bucket` | mobile (<768px), tablet (768–1024px), desktop (≥1024px). |
| `locale` | The locale segment from the path. Always `'en'` at MVP. |
| `meta` | Sparse JSONB for event-specific fields. Examples: `search_submit` → `{ "query_length": 12, "has_filters": true }`; `nav_click` → `{ "section": "brands" }`; `theme_change` → `{ "from": "system", "to": "dark" }`. NEVER contains query text, email, user ID, or IP — enforced by CHECK constraint. |
| `created_at` | Server-assigned at insert. Used for all time-based queries. |

### Retention

Append-only with TTL pruning via a scheduled Postgres function:

```sql
CREATE OR REPLACE FUNCTION prune_nav_events_older_than_90d()
RETURNS void LANGUAGE sql AS $$
  DELETE FROM nav_events WHERE created_at < now() - interval '90 days';
$$;

-- Scheduled via pg_cron in the infrastructure repo
SELECT cron.schedule('prune-nav-events', '0 3 * * *', 'SELECT prune_nav_events_older_than_90d()');
```

90-day retention covers the success-criteria measurement windows (SC-001 / SC-002 are computed weekly; SC-009 within-session).

### Success-criteria query reference

These queries are the verification path for the success criteria — they are not part of the runtime code path, but inform schema choices.

**SC-001** — % of `/` page_views with a `search_submit` within 15s by the same session:
```sql
WITH home_views AS (
  SELECT session_hash, created_at AS view_at
  FROM nav_events
  WHERE event_name = 'page_view' AND path = '/en/'
    AND created_at > now() - interval '7 days'
),
first_submits AS (
  SELECT h.session_hash, h.view_at,
         MIN(s.created_at) FILTER (WHERE s.created_at BETWEEN h.view_at AND h.view_at + interval '15 seconds') AS submit_at
  FROM home_views h
  LEFT JOIN nav_events s
    ON s.session_hash = h.session_hash AND s.event_name = 'search_submit'
  GROUP BY h.session_hash, h.view_at
)
SELECT
  count(*) FILTER (WHERE submit_at IS NOT NULL) * 1.0 / count(*) AS sc001_rate
FROM first_submits;
```

**SC-002** — refinement rate on search/category pages:
```sql
WITH results_views AS (
  SELECT session_hash, MIN(created_at) AS first_view
  FROM nav_events
  WHERE event_name = 'page_view'
    AND (path LIKE '/en/search%' OR path LIKE '/en/c/%')
    AND created_at > now() - interval '7 days'
  GROUP BY session_hash
)
SELECT
  count(*) FILTER (
    WHERE EXISTS (
      SELECT 1 FROM nav_events e
      WHERE e.session_hash = r.session_hash
        AND e.event_name IN ('filter_apply','search_submit')
        AND e.created_at > r.first_view
    )
  ) * 1.0 / count(*) AS sc002_rate
FROM results_views r;
```

---

## 5. Breadcrumb Trail (derived, not persisted)

### Entity: `BreadcrumbTrail`

```ts
type Breadcrumb = {
  label: string;     // from dictionary or dynamic (e.g., brand name)
  href: string;      // absolute path including locale
};

type BreadcrumbTrail = Breadcrumb[];
```

### Derivation rules (`src/lib/routes/breadcrumbs.ts`)

| Current path | Trail |
|---|---|
| `/[locale]/` | `[]` (no breadcrumbs on home) |
| `/[locale]/search` | `[]` |
| `/[locale]/brands` | `[]` |
| `/[locale]/brand/[slug]` | `[]` (top-level destination; no parent shown) |
| `/[locale]/brand/[slug]/products` | `[{ label: brandName, href: '/[locale]/brand/[slug]' }]` |
| `/[locale]/categories` | `[]` |
| `/[locale]/c/[slug]` | `[{ label: t.routes.categories.label, href: '/[locale]/categories' }]` (only when entered from `/categories`; check referrer category) |
| `/[locale]/admin/*` | `[{ label: t.routes.admin.label, href: '/[locale]/admin' }, ...]` |

Per FR-017, breadcrumbs use the "← Parent" back-link pattern; the array has length 1 in most cases. Length > 1 is reserved for `/admin/*` sub-pages.

---

## Entity Relationship Summary

```text
Page (in-memory) ──── many ──── Section (in-memory)
  │
  └── id ──── corresponds ──── Dictionary.routes.[id] (file)

ThemePreference (browser localStorage) ── independent of all other entities

NavEvent (Postgres) ──── session_hash groups events from same session window
  │
  └── path ──── (informational only; no FK to Page route map)
```

No cross-entity foreign keys. The route map's `id` is the only logical join key between code and i18n; enforced by unit test.

---

## Data Model Verdict

All entities defined. No DB tables beyond `nav_events`. No new schemas in `brand-data`. The cross-repo dependency on `infrastructure/supabase/migrations/0001_nav_events.sql` is acknowledged in plan.md §R12 and will appear as an explicit task in Phase 2.
