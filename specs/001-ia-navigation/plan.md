# Implementation Plan: Information Architecture & Navigation

**Branch**: `001-ia-navigation` | **Date**: 2026-05-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-ia-navigation/spec.md`

## Summary

This feature establishes the global IA and navigation contract for WellSourced: the canonical route map, a single `AppShell` (header + footer) rendered on every consumer route, sticky search behavior, locale-prefixed routing (`/[locale]/...` with `en` as the only MVP locale), an in-chrome theme toggle, mobile drawer, breadcrumbs, auth-aware account chrome, and a server-side instrumentation pipeline that backs the spec's measurable success criteria. The primary technical decisions are: keep dependencies minimal (lean on Next.js built-ins for locale routing and middleware; no `next-intl` or third-party analytics), reuse the existing `NavBar`, `SearchBar`, `FilterChip`, and `Lockup` components rather than fork them, and store nav events in a single append-only Supabase table queried offline to compute success-criteria targets.

## Technical Context

**Language/Version**: TypeScript 5.x, strict mode (per Constitution §6)
**Primary Dependencies**:
- Next.js 16 (App Router, middleware, route handlers) — already in package.json
- React 19, react-dom 19 — already in package.json
- Tailwind CSS 4 — already in package.json
- Radix UI primitives (`@radix-ui/react-dialog` for drawer + account menu, `@radix-ui/react-tooltip` for theme toggle hint) — already in package.json
- lucide-react (icons) — already in package.json
- Supabase JS client — TO ADD (used for `/api/events` write path and existing auth-flow assumptions in spec)
- Vitest + `@testing-library/react` + `axe-core` — TO ADD (per Constitution testing standards)

**Storage**:
- Supabase Postgres — new `nav_events` table for server-side beacons (append-only, no PII, session-rotating opaque ID per FR-034). No new DB connection layer required.
- Brand data is read-only from sibling repo; not modified by this feature.

**Testing**: Vitest (per Constitution Code Quality §Testing). Suites:
- Unit: route map resolution, locale matching, breadcrumb derivation, session-ID rotation, event payload builders
- Integration: `/api/events` POST contract, locale-redirect middleware (308 behavior)
- Accessibility: axe-core sweep across `<AppShell>` rendered with each top-level route

**Target Platform**: Linux server in Docker (Next.js standalone output per `next.config.ts`, Constitution §8). No Vercel-specific APIs.

**Project Type**: web (single Next.js app — `src/app/` App Router structure)

**Performance Goals**:
- Landing page Lighthouse Performance ≥ 90 (per Constitution Performance bar)
- Mobile drawer open within 200ms (SC-007)
- Beacon emission MUST NOT block navigation (FR-036)
- Global header visible before client hydration (SC-008) — implementation target: header is in the SSR HTML payload of every route, not a Client Component

**Constraints**:
- `next.config.ts` keeps `output: "standalone"` (Constitution §8)
- No third-party analytics SDK on the client (FR-033)
- No cookies / persistent client identifiers set by chrome (FR-035)
- No glassmorphism, no border-left accent stripes (DESIGN.md §6)
- Deep-teal accent ≤ 10% pixel area on every nav surface (SC-004)
- Active state via deep-teal underline (no pill fills) per FR-006

**Scale/Scope**:
- 15 consumer routes plus 2 error routes (per FR-001)
- 1 locale at MVP (`en`); architecture ready for ≥ 2 with no shape change
- 10 instrumentation event types (FR-033)
- Target: 5,000 MAU at 6 months (PRD §8); event volume budget ~50k events/day at MAU peak

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Product Principles

| Principle | Status | Evidence |
|---|---|---|
| §1 Convenience over ethics framing | ✅ PASS | FR-007 keeps hero search dominant on `/`; FR-024 forbids "ethical/conscious/sustainable" lead labels in nav copy |
| §2 Zero friction to value | ✅ PASS | FR-020 keeps sign-in to a ghost affordance; no chrome forces account creation; James's path uses zero chrome clicks |
| §3 Trust is visible, not assumed | ✅ PASS | FR-014 sub-nav surfaces Trust data tab on brand profile; nav does not block direct access to source citations |
| §4 Transaction belongs to brand | ✅ PASS | Spec's "Buy direct" CTA is out of nav scope; nav never owns a cart surface; FR-001 routes contain no `/cart` or `/checkout` |
| §5 Commons, not commerce | ✅ PASS | FR-013 forbids newsletter signups, social-follow CTAs, premium tiers; donate page is in footer, not gated |

### Technical Principles

| Principle | Status | Evidence |
|---|---|---|
| §6 TypeScript everywhere | ✅ PASS | All new code is `.ts`/`.tsx` strict; nav event types defined as discriminated union in `src/lib/analytics/events.ts` |
| §7 Server-first rendering | ✅ PASS | `<AppShell>`, `<NavBar>`, `<Footer>` render as Server Components; only `<ThemeToggle>`, `<MobileDrawer>`, `<AccountMenu>`, `<SearchBar>` are Client Components (interactivity requirement) |
| §8 Container-ready | ✅ PASS | All Next.js features used (middleware, route handlers, App Router) are framework-built-in, no Vercel-only APIs; `output: "standalone"` preserved |
| §9 Secrets never in code | ✅ PASS | No new secrets introduced by IA work; Supabase service key already in `.env.example` |
| §10 Brand data is git-native | ✅ PASS | This feature does not write brand JSON; brand metadata is read-only in brand-profile pages (out of scope) |

### Code Quality Standards

| Standard | Status | Evidence |
|---|---|---|
| Testing — Vitest, >80% lib coverage | ✅ PASS (planned) | Vitest setup is a deliverable of this plan (Phase 2 task); each `src/lib/` module has a corresponding `*.test.ts` |
| Code Style — Tailwind only, no CSS-in-JS | ✅ PASS | All nav styling via Tailwind utility classes + existing CSS variables in `globals.css` |
| Performance — Lighthouse ≥ 90, SSG for brand pages | ✅ PASS | Header/footer render as SSR HTML; FR-003 mandates SSG for `/brand/[slug]` and friends |
| Accessibility — WCAG AA, keyboard navigable | ✅ PASS — strengthened | FR-028 pins WCAG 2.1 AA explicitly; SC-007 verifies via axe-core + assistive-tech matrix |

### Architecture Constraints

| Constraint | Status | Notes |
|---|---|---|
| Builds product search, brand profiles, contribution, donation infra | ✅ PASS | This feature is the IA chrome that hosts them |
| Does NOT build shopping carts, shopper accounts, payments, mobile apps, scoring | ✅ PASS | Nav contains no cart/checkout/payment route; `/admin` is contributor-only, no shopper accounts |
| Dependency Guidelines — minimize npm deps, no CSS-in-JS, no state libs | ⚠️ JUSTIFIED ADDITIONS | Adding Supabase JS client (already implied by spec's auth dependency), Vitest + testing-library + axe-core (mandated by Constitution testing standards). NO `next-intl` (rolling a thin internal i18n layer in `src/lib/i18n/`). NO third-party analytics SDK (FR-033 forbids it). See Phase 0 research item R1 for the i18n decision rationale. |

### Verdict

**GATE: PASS.** All principles aligned; the one "watch item" (dep additions) is constrained to libraries already mandated by the Constitution or the spec, and the i18n research explicitly chose the leaner internal path over `next-intl` to honor the *minimize dependencies* rule.

## Project Structure

### Documentation (this feature)

```text
specs/001-ia-navigation/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification (already complete)
├── research.md          # Phase 0 output (this command)
├── data-model.md        # Phase 1 output (this command)
├── quickstart.md        # Phase 1 output (this command)
├── contracts/           # Phase 1 output (this command)
│   └── events-api.openapi.yaml
├── checklists/
│   └── requirements.md  # From /speckit.specify (already complete)
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── [locale]/                            # NEW — locale segment, wraps all consumer routes
│   │   ├── layout.tsx                       # NEW — loads dictionary, sets <html lang>, mounts AppShell
│   │   ├── page.tsx                         # MOVED from src/app/page.tsx — homepage (hero search)
│   │   ├── search/page.tsx                  # NEW — Client Component for sticky search + filters (uses Suspense for results)
│   │   ├── brands/page.tsx                  # NEW — SSG with revalidate; directory listing
│   │   ├── brand/[slug]/page.tsx            # NEW — SSG; profile (Overview tab)
│   │   ├── brand/[slug]/products/page.tsx   # NEW — SSG; product catalog tab
│   │   ├── categories/page.tsx              # NEW — SSG; category index
│   │   ├── c/[slug]/page.tsx                # NEW — SSG; faceted category browse
│   │   ├── submit/page.tsx                  # NEW
│   │   ├── for-brands/page.tsx              # NEW
│   │   ├── contribute/page.tsx              # NEW
│   │   ├── admin/                           # NEW — auth-gated workspace
│   │   │   ├── layout.tsx                   # NEW — wraps AppShell PLUS WorkspaceSidebar
│   │   │   └── page.tsx                     # NEW
│   │   ├── about/page.tsx                   # NEW
│   │   ├── manifesto/page.tsx               # NEW
│   │   ├── donate/page.tsx                  # NEW
│   │   ├── not-found.tsx                    # NEW — locale-aware 404
│   │   └── error.tsx                        # NEW — locale-aware 500
│   ├── design/                              # UNCHANGED — self-contained scope per FR-016
│   ├── api/
│   │   └── events/route.ts                  # NEW — POST handler for FR-033 beacons
│   ├── layout.tsx                           # MODIFIED — root layout, mounts theme inline script, fonts
│   ├── not-found.tsx                        # NEW — redirects to /[en]/not-found for un-prefixed paths
│   └── globals.css                          # UNCHANGED (tokens already in place)
├── components/
│   ├── ui/                                  # EXISTING ATOMIC PRIMITIVES — extend, don't fork
│   │   ├── NavBar.tsx                       # MODIFIED — remove backdrop-blur-md (FR-008), accept right-slot children
│   │   ├── SearchBar.tsx                    # EXISTING — used as-is in hero and compact variants
│   │   ├── FilterChip.tsx                   # EXISTING — used by sticky filter row
│   │   ├── Logo.tsx                         # EXISTING — Lockup component
│   │   ├── Button.tsx, Card.tsx, ... etc.   # EXISTING
│   │   └── index.ts                         # MODIFIED — exports for new components
│   └── nav/                                 # NEW — IA-specific composites
│       ├── AppShell.tsx                     # NEW — composes NavBar + Footer per route policy (sticky / scroll-away)
│       ├── Footer.tsx                       # NEW — 5-group footer per FR-012
│       ├── ThemeToggle.tsx                  # NEW — Client Component; cycles system / light / dark (FR-004a)
│       ├── MobileDrawer.tsx                 # NEW — Client Component via Radix Dialog (FR-010)
│       ├── Breadcrumb.tsx                   # NEW — back-link pattern (FR-017)
│       ├── AccountMenu.tsx                  # NEW — Client Component via Radix Dropdown (FR-020/021)
│       ├── LocaleSwitcher.tsx               # NEW — non-interactive at MVP (FR-031)
│       ├── BrandProfileSubNav.tsx           # NEW — chip-pattern sub-nav (FR-014)
│       └── WorkspaceSidebar.tsx             # NEW — DocShell-style sidebar for /admin (FR-015)
├── lib/
│   ├── i18n/
│   │   ├── config.ts                        # NEW — locales: ['en'], defaultLocale: 'en'
│   │   ├── dictionary.ts                    # NEW — async dictionary loader, cached per request
│   │   ├── matchLocale.ts                   # NEW — Accept-Language → best match, fallback to default
│   │   └── messages/
│   │       └── en.json                      # NEW — all chrome strings (nav labels, footer groups, drawer labels, a11y labels)
│   ├── routes/
│   │   ├── routeMap.ts                      # NEW — single source of truth for {path, section, persona, render, navPosition}
│   │   └── breadcrumbs.ts                   # NEW — pathname → breadcrumb trail
│   ├── theme/
│   │   ├── ThemeProvider.tsx                # NEW — Client Component; reads localStorage, sets data-theme
│   │   └── themeScript.ts                   # NEW — inline pre-hydration script that sets data-theme before paint (FOUC avoidance)
│   └── analytics/
│       ├── events.ts                        # NEW — discriminated union of event types (FR-033 set)
│       ├── beacon.ts                        # NEW — Client: navigator.sendBeacon with fetch keepalive fallback (FR-036)
│       └── sessionId.ts                     # NEW — Server: derive opaque 30-min-rotating ID from request metadata (FR-034)
└── middleware.ts                            # NEW — locale resolution + 308 redirect for unprefixed paths (FR-029)

infrastructure/                              # SIBLING REPO — separate PR required
└── supabase/migrations/
    └── 0001_nav_events.sql                  # NEW — nav_events table (append-only, no PII)

tests/
├── unit/
│   ├── lib/routes/routeMap.test.ts
│   ├── lib/routes/breadcrumbs.test.ts
│   ├── lib/i18n/matchLocale.test.ts
│   ├── lib/analytics/sessionId.test.ts
│   ├── lib/analytics/beacon.test.ts
│   └── components/nav/AppShell.test.tsx
├── integration/
│   ├── api/events.test.ts                   # POST contract, rejects PII, append-only behavior
│   └── middleware/locale.test.ts            # 308 redirect, query/hash preservation
└── a11y/
    └── nav.a11y.test.tsx                    # axe-core sweep across each top-level route's <AppShell>

vitest.config.ts                             # NEW — Vitest config
```

**Structure Decision**: Single Next.js web app, App Router. All consumer routes live under `src/app/[locale]/`; the design poster site at `src/app/design/` is preserved unchanged per FR-016. The instrumentation endpoint is a standard Next.js route handler at `src/app/api/events/route.ts`. Atomic UI primitives stay in `src/components/ui/` (modified in place, never forked per spec direction); composite navigation surfaces live in a new `src/components/nav/` directory to keep the ui/ namespace small and atomic. Cross-repo coupling: the `nav_events` table migration lives in the sibling `infrastructure` repo and requires a separate PR per Constitution §Multi-Repo Awareness.

## Complexity Tracking

> *No violations to track.* The constitution gate passed cleanly. The two added runtime dependencies (Supabase JS client, Vitest + companions) are explicitly mandated by Constitution §10 / §Code Quality and the spec's auth-flow dependency — they are not discretionary additions. The deliberate choice to roll a thin internal i18n layer rather than adopt `next-intl` (a justified non-addition) is documented in Phase 0 research item R1.
