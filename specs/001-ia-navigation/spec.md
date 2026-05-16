# Feature Specification: Information Architecture & Navigation

**Feature Branch**: `001-ia-navigation`
**Created**: 2026-05-15
**Status**: Draft
**Input**: User description: "looking at @docs/product/PRD.md @DESIGN.md @PRODUCT.md help me define an information architecture and navigation for wellsourced"

## Context

WellSourced is a search-first product discovery utility that connects three audiences with very different jobs:

- **James (Reluctant Shopper)** — wants to find a product and buy direct, fast, without being lectured.
- **Maya (Conscious Defector)** — wants to verify a brand actually lives its claims.
- **Priya (Gift-Giver)** — wants to browse and discover something interesting.
- **Elena (DTC Brand operator)** — wants to evaluate whether listing here is worth her time.

Today, only the homepage (`/`) and the `/design` reference site exist; the consumer-facing surface is unbuilt. A `NavBar` component ships with placeholder links (`/brands`, `/categories`, `/submit`, `/about`) but no destinations and a `backdrop-blur-md` style that conflicts with the system's flat-by-default, no-glassmorphism rule.

This spec defines the **global information architecture** (every page, what it does, who it serves) and the **navigation behavior** (header, footer, sub-sections, wayfinding, mobile) that arbitrates how users move through the system. It does not specify the visual design of individual pages — only how they fit together and how the user gets between them.

The animating principle: **the navigation must disappear into the background for James**, while still **giving Maya, Priya, and Elena a way to reach depth on demand**. This mirrors Design Principle #1 (*convenience before values*) and Principle #4 (*public infrastructure, not a brand*).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - James completes a search-first task without ever reading the chrome (Priority: P1)

James lands on the homepage, types "organic cotton t-shirt," and within a few seconds is reading product results. He refines, clicks "Buy direct," and exits to a brand's Shopify store. At no point does he need to engage with global navigation, account chrome, or values messaging to complete his task.

**Why this priority**: James is the primary conversion target and the most-cited persona across PRD, PRODUCT, and DESIGN. If navigation impedes this path — by competing for attention, by burying the search bar, or by demanding sign-in — the project fails its core principle. Everything else is built around protecting this flow.

**Independent Test**: A first-time visitor can complete the path `/ → /search?q=... → external Shopify store` using only the search field and a result card. The header, footer, and nav chrome contribute no clicks to the critical path.

**Acceptance Scenarios**:

1. **Given** a new visitor lands on `/`, **When** the page renders, **Then** the search bar is the most visually prominent interactive element and accepts input within the first viewport without scrolling on desktop or mobile.
2. **Given** a visitor on `/search?q=...`, **When** they want to refine the query, **Then** a compact search input remains accessible in the page chrome without scrolling back to the top.
3. **Given** a visitor clicks "Buy direct" on a result, **When** the click resolves, **Then** they leave WellSourced for the brand's Shopify store in a new tab; WellSourced does not interpose any cart, modal, account prompt, or interstitial.

---

### User Story 2 - Maya reaches verified trust data from any product or brand reference (Priority: P2)

Maya sees a brand name on a product card or in editorial copy. She wants to know who owns the brand, where it's made, and what's been independently audited. She clicks the brand name, lands on the profile, and can scan the trust spectrum (gray → blue → green) without needing to search for it. From the profile she can drill into the brand's full product catalog or the source citations behind any claim.

**Why this priority**: Maya is the persona who validates the project's claim to be a "verified commons." Her path is what makes WellSourced credible to itself. The navigation must make brand profiles discoverable from every product result and must structure the profile so trust data is the second thing visible (after the brand name itself).

**Independent Test**: Starting from any product result on `/search`, a user can reach the brand profile in one click, see the trust-tier breakdown in the first viewport, and follow a source citation to its external evidence URL.

**Acceptance Scenarios**:

1. **Given** a result on `/search`, **When** Maya clicks the brand name (not the product), **Then** she arrives at `/brand/[slug]` with the brand identity and trust summary in the first viewport.
2. **Given** Maya is on a brand profile, **When** she wants the full product catalog, **Then** a "View all products" affordance leads to `/brand/[slug]/products` and a breadcrumb returns her to the profile.
3. **Given** Maya wants to suggest a correction, **When** she clicks "Suggest an edit," **Then** she enters the contributor flow with her intent preserved (which brand, which field).

---

### User Story 3 - Priya browses by category and discovers brands she hasn't heard of (Priority: P2)

Priya isn't looking for a specific product — she wants ideas. She lands on the homepage, sees a "Browse by category" affordance, picks "Home & kitchen," and gets a category landing page with featured brands and products. From there she can drill into a brand profile, save her interest, or jump back into search.

**Why this priority**: Priya represents the "considers but doesn't act" segment (48% of the market per PRD §1.3) — the people the project must convert by removing friction, not by amplifying values. Without a browse-first entry, she has no on-ramp. The category surface is also the SEO and shareability layer.

**Independent Test**: A visitor can reach a category listing in two clicks from `/`, see brands and products grouped under that category, and navigate to a brand profile or refine into search with the category preselected.

**Acceptance Scenarios**:

1. **Given** Priya is on `/`, **When** she looks for a browse entry, **Then** a clearly labeled affordance leads her into category browsing without requiring her to type a query.
2. **Given** Priya is on a category page (`/c/[slug]`), **When** she wants to narrow further, **Then** filtering and a search-with-this-category-preselected option are both available.
3. **Given** Priya finds an interesting brand, **When** she clicks it, **Then** she arrives at the brand profile with a breadcrumb back to the category.

---

### User Story 4 - Elena evaluates WellSourced as a listing destination and reaches the submission flow (Priority: P3)

Elena (a brand operator) hears about WellSourced. She visits the site to evaluate: who runs this, what does listing cost, what data is required, how is the brand presented, will it convert. She needs a dedicated landing that answers those questions without scrolling through Maya- or James-oriented copy, and a clear path into submission.

**Why this priority**: Brand supply is the constraint on catalog quality. If Elena can't quickly evaluate and submit, the catalog stagnates. But she's a smaller audience than James and Maya, so her path lives in the footer rather than the primary header.

**Independent Test**: A first-time brand operator can find the "For brands" page from the footer or a discoverable link, read what listing entails, and reach the submission form without first clicking through About or Contribute.

**Acceptance Scenarios**:

1. **Given** Elena is on any page, **When** she scrolls to the footer, **Then** a "For brands" link is present and clearly labeled.
2. **Given** Elena is on the `/for-brands` page, **When** she decides to list, **Then** a primary call-to-action leads her to `/submit` with context preserved.
3. **Given** Elena's brand is already listed, **When** she visits her brand profile, **Then** she can see the data on file and the citation sources behind each claim, even though she cannot edit her own profile without contributor disclosure.

---

### User Story 5 - A contributor enters the editorial workflow (Priority: P3)

A reader notices missing or stale brand data. They click "Suggest an edit" on a profile, are prompted to sign in via GitHub OAuth, and arrive at a submission form prefilled with the brand and field they wanted to correct. Established contributors land instead in a dashboard at `/admin` where they can review queues, approve submissions, and edit directly.

**Why this priority**: The Wikipedia-style contributor model is core to the project's claim to be a commons. Navigation must make "Suggest an edit" feel low-friction from anywhere a claim is displayed, and must give established contributors a clear workspace separate from the public chrome.

**Independent Test**: An unauthenticated visitor on a brand profile can initiate an edit suggestion that survives the OAuth round-trip and lands them back at the suggestion form with their context intact.

**Acceptance Scenarios**:

1. **Given** any signed-out user on a brand profile, **When** they click "Suggest an edit," **Then** they are routed through GitHub OAuth and returned to the edit form for that brand/field.
2. **Given** an established contributor signs in, **When** they reach the global header, **Then** their account menu surfaces a path to `/admin` (the contributor workspace) distinct from `/contribute` (the public onboarding page).
3. **Given** any contributor is in the workspace, **When** they navigate to consumer-facing pages, **Then** the global header remains consistent — there is no separate "logged-in app" shell that breaks continuity with the public site.

---

### User Story 6 - A returning visitor shares a filtered search via URL (Priority: P3)

A returning visitor refines a search down to "worker-owned brands in the US under $50," then sends the URL to a friend. The friend opens the URL and sees the exact same filtered results, with the query and filters reflected in the visible chrome.

**Why this priority**: URL-state is what makes the catalog feel like infrastructure rather than an app. It enables sharing, bookmarking, deep-linking from search engines, and predictable browser back/forward — all of which compound trust and reduce friction. Per PRD §3.3, "URL-based filter state (shareable filtered views)" is a P0 requirement.

**Independent Test**: Applying a filter or sort produces a URL that, when opened in a clean browser, restores the same query, the same filters, and the same active state in chrome.

**Acceptance Scenarios**:

1. **Given** a visitor applies filters on `/search`, **When** the URL updates, **Then** every active filter is reflected in query parameters and every parameter restores the corresponding filter chip on load.
2. **Given** a visitor uses browser Back after navigating from `/search` to a brand profile, **When** they return, **Then** the search query, filters, sort, and scroll position are preserved.

---

### Edge Cases

- **JavaScript disabled / progressive enhancement:** The homepage search form must be a real `<form>` that submits to `/search?q=...` so a no-JS visitor can still complete the primary task. Filtering and live refinement are progressive enhancements.
- **Deep links into unknown brands:** `/brand/[slug]` for a slug that doesn't exist must render a helpful 404 that points the visitor back to search or to the directory, never an apology or a dead-end.
- **Authenticated routes hit while signed-out:** `/admin` and other contributor-only pages must route through OAuth and return the user to the page they originally requested, with intent preserved.
- **Mobile keyboard occluding sticky search:** When the on-screen keyboard appears on a results page, the sticky compact search must not double-stack with the keyboard or cover its own input.
- **Empty search:** A visit to `/search` with no query renders a useful landing — featured categories, recently verified brands — rather than a blank "no results" state.
- **Category with no brands yet:** A category page with no listings shows recently submitted brand candidates and an invitation to suggest a brand, not an apology.
- **Sign-out from `/admin`:** Signing out from a contributor-only page routes the user to a consumer-facing page (`/`), never to an "access denied" screen.
- **Browser back from external Shopify checkout:** When the user returns to WellSourced after visiting a brand's Shopify store, their prior search state is preserved (they can resume browsing without re-querying).
- **Search submitted with no results:** The empty state offers the next useful action ("Try a broader search, or browse categories"), per the *never apologize, never dead-end* rule.

## Requirements *(mandatory)*

### Functional Requirements

#### Global Route Map

- **FR-001**: The system MUST expose the following consumer routes, each with a single canonical URL:
  - `/` — search-first homepage (James's primary entry)
  - `/search` — search results (with optional `?q=` and filter querystring)
  - `/brands` — full brand directory, browsable and filterable
  - `/brand/[slug]` — single brand profile (Maya's verification surface)
  - `/brand/[slug]/products` — full product catalog for one brand
  - `/categories` — category index (Priya's browse entry)
  - `/c/[slug]` — single category browse (faceted listing)
  - `/submit` — public brand submission form
  - `/for-brands` — Elena's evaluation and onboarding landing
  - `/contribute` — public contributor onboarding and guide
  - `/admin` — authenticated contributor workspace (sign-in required)
  - `/about` — mission and how-it-works
  - `/manifesto` — long-form editorial foundation
  - `/donate` — donation page with financial transparency
  - `/design` — design system reference (poster + deep-dive docs)
  - `/404` and `/500` — helpful error pages

- **FR-002**: Every route MUST be reachable from `/` within two clicks, counting the homepage as click zero. Routes that require authentication MUST be reachable from the global footer (so they are *discoverable* even when not *accessible*).

- **FR-003**: The system MUST treat `/brand/[slug]`, `/c/[slug]`, and `/brands` as statically generated where possible, and `/search` and `/admin` as dynamic, so brand and category pages can be indexed by search engines and shared.

#### Global Header (Top Navigation)

- **FR-004**: The system MUST render a global header on every consumer route. The header MUST contain, from left to right:
  - The WellSourced lockup (linking to `/`)
  - A primary navigation cluster of section links
  - A right-aligned slot for the search affordance (on internal pages) and the account control

- **FR-005**: The primary navigation cluster MUST contain exactly these top-level links: **Find** (`/search` or `/`), **Brands** (`/brands`), **Categories** (`/categories`), **About** (`/about`). It MUST NOT contain "Submit," "Contribute," "Donate," or "Design" — those live in the footer to avoid competing with consumer tasks.

- **FR-006**: The active section MUST be visually indicated using the design system's active-state pattern (deep-teal underline, per DESIGN.md §5 Navigation). The indicator MUST NOT use a pill-shaped fill, MUST NOT introduce a second accent color, and MUST be distinguishable to keyboard and assistive-tech users via `aria-current="page"`.

- **FR-007**: On the homepage (`/`), the header MUST NOT contain a compact search bar — the hero search owns that role. On every other consumer route, the header MUST contain the compact search variant (40px tall pill per DESIGN.md §5) in the right slot, so search is always reachable.

- **FR-008**: The header MUST use solid surface fill (sand on most pages, white on data-dense pages per DESIGN.md §5 Navigation) — translucent blur / glassmorphism is forbidden, and the current `NavBar.tsx` implementation MUST be updated to remove `backdrop-blur-md` before this spec is considered satisfied.

- **FR-009**: The header MUST remain visible (sticky to top) on `/search` and `/c/[slug]`, where ongoing refinement is the user's task. On editorial pages (`/about`, `/manifesto`, `/donate`) the header MAY scroll away with content.

- **FR-010**: The header MUST collapse to a mobile pattern below the `md` breakpoint: lockup left, search-icon button center-right, account-icon button right, hamburger opens a full-screen drawer containing the primary nav and a "Search WellSourced" field.

#### Global Footer

- **FR-011**: The system MUST render a global footer on every consumer route. The footer is the discovery surface for everything the header omits.

- **FR-012**: The footer MUST organize links into named groups. The minimum required groups and their contents:
  - **Discover** — Find, Brands, Categories
  - **Contribute** — Suggest a brand (`/submit`), Become a contributor (`/contribute`), GitHub repo (external)
  - **About** — Mission (`/about`), Manifesto (`/manifesto`), Donate (`/donate`)
  - **For operators** — For brands (`/for-brands`)
  - **System** — Design system (`/design`), Status / changelog

- **FR-013**: The footer MUST include a compact restatement of the project's nature — "Public infrastructure for finding products that are actually made well" — and the lockup. It MUST NOT include a newsletter signup, social-follow CTAs, or any dark-pattern affordance per Design Principle #5.

#### Sub-navigation (within sections)

- **FR-014**: The brand profile (`/brand/[slug]`) MUST expose section navigation between **Overview** (default), **Products** (`/brand/[slug]/products`), and **Trust data** (in-page anchor). Sub-navigation uses the design system's chip pattern, not the primary-nav underline pattern, so it does not visually compete with the global header.

- **FR-015**: The contributor workspace (`/admin`) MUST expose its own internal navigation distinct from the consumer header — a sidebar following the same `DocShell` pattern used at `/design/(docs)/*`. The global consumer header MUST remain at the top of this view so contributors do not feel "trapped" in a separate app.

- **FR-016**: The `/design` route is its own self-contained nav scope (the poster page and the `DocShell` sidebar). It MUST continue to follow its existing structure and is out of scope for this IA refresh, except that the global footer link to `/design` MUST point to the poster page (not a deep-dive doc).

#### Wayfinding

- **FR-017**: The system MUST render breadcrumbs on routes nested below a parent — minimally `/brand/[slug]/products`, `/c/[slug]` (when entered from `/categories`), and `/admin` sub-pages. Breadcrumbs MUST use the back-link pattern (`← Brand name`) rather than a chain of separators, to feel like navigation rather than ornament.

- **FR-018**: The system MUST preserve filter, sort, and pagination state in the URL on `/search`, `/c/[slug]`, and `/brands`. Browser back/forward MUST restore the prior state without a re-fetch where possible.

- **FR-019**: Active filters MUST be visible as removable chips on the page itself (per DESIGN.md §5 Filter Chips), so the URL is not the only place state is exposed.

#### Auth-aware Navigation

- **FR-020**: When a visitor is signed out, the header's right slot MUST contain a single ghost "Sign in" affordance (no avatar, no menu) — small enough to stay below 10% of header weight per the One Voice Rule.

- **FR-021**: When a visitor is signed in, the right slot MUST contain an avatar that opens a menu containing: **My contributions**, **Workspace** (`/admin`, shown only for established contributors), **Settings**, **Sign out**.

- **FR-022**: An unauthenticated visitor who clicks any auth-required affordance (e.g., "Suggest an edit," "Workspace") MUST be routed through OAuth and returned to the originating context, including any in-progress form state.

#### Voice and Labeling

- **FR-023**: Navigation labels MUST follow the project's voice rules: **Find** not "Shop," **Brands** not "Sellers" or "Stores," **Suggest an edit** not "Report an error," **Buy direct** not "Add to cart" or "Buy now," **Trust data** not "Ethics score." This applies to header, footer, breadcrumbs, sub-nav, and account-menu copy.

- **FR-024**: Editorial route labels MUST NOT lead with "ethical," "conscious," "sustainable," "guilt-free," or "Amazon alternative" — these violate the PRODUCT brief's voice rules and lose James, the primary conversion target.

#### Empty, Error, and Loading States

- **FR-025**: The 404 page MUST offer the next useful action (a search field and links to `/brands` and `/categories`), MUST NOT apologize, and MUST illustrate with the open-magnifying-glass motif per the *never dead-end* rule.

- **FR-026**: The system MUST render skeleton states (per DESIGN.md §5 Skeletons) on `/search` results, `/brand/[slug]` profile data, and `/brands` directory while content loads. The global header and footer MUST render immediately (no skeleton chrome) so the page never feels structurally absent.

- **FR-027**: All interactive nav elements (links, buttons, chips, drawer toggles) MUST expose `:focus-visible` styles using the system's signature focus pattern (deep-teal border + 4px soft-teal halo per DESIGN.md §5 Inputs/SearchBar).

### Key Entities *(navigation entities, not data entities)*

- **Page** — A canonical route in the system. Each page has: a URL pattern, a primary persona, a section assignment (Discover / Profile / Operator / Contribute / About / System), a render mode (static / SSR / authenticated), and a position in nav (primary header / footer-group / sub-nav / breadcrumb-only / unlinked).

- **Section** — A logical grouping of pages that shares a navigation surface. Sections defined here: **Discover** (Find, Search, Brands directory, Categories), **Profile** (Brand profile, Brand products), **Operator** (For brands, Submit), **Contribute** (Contribute, Workspace), **About** (About, Manifesto, Donate), **System** (Design, Status).

- **Navigation Surface** — A persistent UI region that exposes routes. The surfaces in scope: **Global Header**, **Global Footer**, **Brand Profile Sub-nav**, **Workspace Sidebar**, **Mobile Drawer**, **Breadcrumbs**, **In-page Anchors**.

- **Active State Indicator** — A visual signal that the current page belongs to a given section. Each navigation surface has exactly one active-state pattern; they MUST NOT be mixed within one surface.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor on `/` submits a search query within 15 seconds of page load in 80% of sessions (measures whether the search affordance reads as the primary action without explanation).

- **SC-002**: On `/search` and category pages, the rate of users who refine their query at least once exceeds 40% (measures whether the sticky compact search and filter chips are discoverable and usable in context).

- **SC-003**: Every route in the system is reachable from the homepage in no more than two clicks, verified by a navigation-graph check at build time.

- **SC-004**: The deep-teal accent appears on no more than 10% of pixel area on every navigation surface (header, footer, drawer), measured by automated visual audit, per the One Voice Rule in DESIGN.md §2.

- **SC-005**: A shared `/search?q=...&filter=...` URL, opened in a clean browser, restores the same query, the same active filter chips, and the same sort order with no visible difference from the originating session.

- **SC-006**: Brand profile pages rank in search-engine results for "<brand name> ethical" or "<brand name> ownership" queries within 90 days of indexing (measures whether SSG and metadata are configured correctly).

- **SC-007**: The mobile drawer opens within 200ms of tap and the primary nav is fully usable with keyboard or screen reader (verified by automated accessibility audit, no critical or serious violations).

- **SC-008**: The global header renders in the first 1KB of HTML and is visible before any client-side hydration, so the navigation is usable for no-JS visitors and during slow loads.

- **SC-009**: Returning visitors who navigate from `/search` to a brand profile and back land on the same scroll position and filter state in 95% of cases (measures whether URL state and browser history work correctly).

- **SC-010**: Zero instances of glassmorphism (`backdrop-blur`, translucent `bg-*` with alpha < 1) remain in navigation chrome after this work ships, verified by a CI grep check or a visual audit.

## Assumptions

These defaults are documented so reviewers can challenge any that don't fit. Each one was chosen to minimize friction and respect the design principles, but is not load-bearing — challenging them costs little.

- **Categories deserves a top-level nav slot.** Priya (the gift-giver) and SEO-driven entry both benefit from a discoverable, indexable browse-by-category surface. If category browsing were demoted to a filter on `/search`, both would suffer. The current `NavBar.tsx` already includes it, which is the right instinct.

- **`/for-brands` is a dedicated route, not a section of `/about`.** Elena's evaluation criteria (cost, fit, conversion) are unrelated to James's interests in mission, and mixing them dilutes both. The route lives in the footer "For operators" group rather than the primary header to keep the header consumer-focused.

- **Sign-in is a quiet ghost affordance, not a primary CTA.** Most visitors never need an account. A loud sign-in button would compete with search for visual weight and violate Design Principle #1. The signed-in state surfaces more chrome (avatar + menu) because the audience that needs it has already opted in.

- **The contributor workspace (`/admin`) preserves the consumer header.** A separate "logged-in app shell" would visually fork the project into a public site and an internal tool, undermining the *public infrastructure* principle. Sidebar-within-shell mirrors the `/design/(docs)` pattern already shipped.

- **No mega-menus, no hover-revealed flyouts.** Every link in the header resolves to a real page in one click. Flyouts and mega-menus belong to enterprise SaaS and shopping malls; they violate calm-over-loud.

- **Breadcrumbs are back-link styled, not chain-of-separators.** The chain pattern (`Home / Brands / Patagonia / Products`) reads as bureaucratic; a single back-link with the parent name reads as natural language and matches the project's voice.

- **Filter and sort state lives in the URL.** This is restated from PRD §3.3 as a hard requirement, not a design preference, because it underpins shareability and the back-button contract.

- **Search is the primary entry, but not the only one.** James enters via search; Priya enters via Categories; Maya often arrives via a deep link to a brand profile (from an article, a Google result, or a friend). The IA must serve all three without privileging James to the exclusion of the others.

## Dependencies

- The PRD §5 "Information Architecture" table lists the routes this spec formalizes — this spec is the IA definition the PRD points to, not a competing alternative.
- DESIGN.md §5 defines the visual treatment of the Navigation, Footer (implicit), SearchBar, FilterChip, and TrustBadge components — this spec governs *which routes link where*, not *how the link looks*.
- The `Lockup`, `NavBar`, `SearchBar`, and `FilterChip` components in `src/components/ui/` are already partially built and will be the foundation. The existing `NavBar.tsx` uses `backdrop-blur-md` which conflicts with DESIGN.md and must be updated as part of executing this spec.
- The contributor authentication flow (GitHub OAuth via Supabase, per CLAUDE.md) is a separate feature; this spec assumes that flow exists and only specifies where it surfaces in the navigation.
