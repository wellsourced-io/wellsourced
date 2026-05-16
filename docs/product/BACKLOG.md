# WellSourced — Launch Backlog

> **Source of truth:** [PRD.md](./PRD.md) v2.0
> **Timeline:** 6–8 weeks to MVP launch
> **Scope:** Everything needed to launch wellsourced.io with 200+ brands, product search, trust tiers, and contributor flow.

Each item is tagged with a phase (`W1`–`W8`), a track (`DES` design / `DEV` development / `OPS` infrastructure / `CON` content), and a priority (`P0` required for launch, `P1` should-have, `P2` nice-to-have, `PX` post-MVP).

---

## 0. Foundations (W1 · OPS · P0)

Things that block every other workstream. Get these done first.

- [ ] Initialize Next.js 15 + TypeScript + Tailwind project (`output: "standalone"` in `next.config.ts`)
- [ ] Configure `.env.example` with all keys from CLAUDE.md (Meilisearch, Anthropic, Supabase, Shopify tokens)
- [ ] Install gitleaks pre-commit hook (`./scripts/setup-hooks.sh`)
- [ ] Create sibling `brand-data` repo with initial schema folder structure
- [ ] Create sibling `infrastructure` repo with `docker-compose.yml` (app + Meilisearch on :7700)
- [ ] Set up Supabase project + GitHub OAuth provider
- [ ] Register Open Collective fiscal-sponsorship application (parallel — can take weeks)
- [ ] Decide license (MIT vs AGPL) — open question in PRD §12
- [ ] Decide Storefront Access Token collection strategy (manual vs automated) — open question in PRD §12

---

## 1. Design System & IA (W1–W2 · DES · P0)

Branch `001-ia-navigation` is already in progress. Design system doc exists per commit `7e8e9f1`.

- [ ] Finalize design tokens: color palette, type scale, spacing scale, radii, shadows
- [ ] Define trust-tier visual language (Tier 1 neutral / Tier 2 blue / Tier 3 green) with accessible contrast
- [ ] Component library: Button, Input, SearchBar, Chip, Card, Badge, TrustTierBadge, Tooltip
- [ ] Information architecture: confirm route map matches PRD §5
- [ ] Navigation: global header, footer, mobile menu
- [ ] Empty / loading / error states for every async surface (search, profile, submission queue)
- [ ] Mobile-first responsive breakpoints
- [ ] Accessibility baseline: WCAG 2.1 AA, keyboard nav, focus rings, screen reader labels
- [ ] Brand identity polish: logo lockups, favicon, OG image template
- [ ] Plain-language pattern: how cert jargon ("SA8000") renders alongside human summaries ("Workers earn a living wage")

---

## 2. Brand Data Schema & Seed (W1 · DEV+CON · P0)

- [ ] Lock JSON schema (matches PRD §3.2): `name`, `slug`, `shopify_domain`, `storefront_access_token` (env, not JSON), `trust_tiers`, `sources`, etc.
- [ ] Write JSON Schema validator (CI on `brand-data` repo)
- [ ] Research and draft 50–100 initial brand profiles (manual)
- [ ] Collect Storefront Access Tokens for each → populate `SHOPIFY_STOREFRONT_TOKENS` env blob
- [ ] Conflict-of-interest field on each profile
- [ ] Per-field `trust_tier` defaults for self-reported submissions

---

## 3. Shopify Storefront Integration (W2 · DEV · P0)

- [ ] `lib/shopify/` GraphQL client with cost-throttle (≤1000 points/sec)
- [ ] Query helpers: `products`, `productByHandle`, `collections` with cursor pagination
- [ ] `scripts/sync-shopify.ts` — per-brand product pull → upsert into Meilisearch
- [ ] Token loader from `SHOPIFY_STOREFRONT_TOKENS` env (never from brand JSON)
- [ ] Failure recovery: retry, skip, log; show cached data with "last updated" timestamp
- [ ] `Dockerfile.worker` for sync container
- [ ] GitHub Actions cron job (daily 3 AM UTC) running sync
- [ ] Admin trigger endpoint for manual refresh

---

## 4. Search Infrastructure (W2–W3 · DEV · P0)

- [ ] Meilisearch indexes: `products` and `brands` with field configs
- [ ] `lib/search/` typed client wrapping Meilisearch SDK
- [ ] `scripts/seed-brands.ts` — push brand JSON into `brands` index
- [ ] `scripts/reindex-search.ts` — full rebuild
- [ ] Filterable / sortable attributes wired (category, price, ownership, certifications, country, trust tier)
- [ ] Synonyms + typo tolerance tuned
- [ ] Performance budget: keyword search < 500ms

---

## 5. Product Search UX (W3 · DEV+DES · P0)

PRD §3.1, §3.3.

- [ ] `/search?q=…` route with SSR
- [ ] Search bar component (landing + persistent header variant)
- [ ] Results grid: product image, title, price, brand name, trust tier badge, "Buy Direct" link
- [ ] Filter rail: category, price range, ownership type, certifications, country of manufacture, minimum trust tier
- [ ] Sort dropdown: relevance, price ↑/↓, trust tier
- [ ] Active filters as removable chips with counts (e.g. "Worker-owned (23)")
- [ ] URL-driven filter state (shareable links)
- [ ] Empty state with query broadening suggestions
- [ ] Skeleton loaders and error boundary

---

## 6. LLM Semantic Search (W4 · DEV · P0)

PRD §3.1.

- [ ] `lib/llm/` Claude API wrapper with prompt caching
- [ ] NL-vs-keyword classifier (don't pay for LLM on bare-term queries)
- [ ] Prompt: parse query → structured `{ categories, price_max, ownership_type, certifications, … }`
- [ ] Fallback to keyword search on parse failure
- [ ] Performance budget: NL search < 2s end-to-end
- [ ] Cost telemetry (token usage per query)

---

## 7. Brand Profile Pages (W4 · DEV+DES · P0)

PRD §3.2, §3.4.

- [ ] `/brand/[slug]` SSG with ISR for new brands
- [ ] Header: name, logo, description, website, "Visit Shopify Store" CTA
- [ ] Trust-tier panel: each data field renders with its own tier badge + tooltip
- [ ] Plain-language summaries paired with cert jargon
- [ ] Source citations as inline links (Tier 2+)
- [ ] Git edit history link
- [ ] Embedded product grid for the brand (from Shopify cache)
- [ ] `/brand/[slug]/products` full catalog page with pagination
- [ ] "Suggest an Edit" CTA (auth-gated)
- [ ] OG metadata + structured data (Organization schema)

---

## 8. `/brands` Directory (W4 · DEV+DES · P1)

- [ ] Browseable index of all brands
- [ ] Filter by category, ownership type, certifications, country
- [ ] Sort by name, trust tier, recently added
- [ ] Pagination or infinite scroll

---

## 9. Brand Submission (W5 · DEV · P1)

PRD §3.6.

- [ ] `/submit` public form (no auth required)
- [ ] Fields: name (req), URL (req), why-listed (req); optional Shopify URL, certs, ownership type, evidence links
- [ ] Duplicate detection (slug + URL similarity check against `brands` index)
- [ ] Submission queue table in Supabase
- [ ] Email/notification on review status change
- [ ] Spam protection (Turnstile or hCaptcha)

---

## 10. Auth & Contributor System (W5 · DEV · P1)

PRD §3.7.

- [ ] GitHub OAuth via Supabase Auth
- [ ] `contributors` table: user_id, trust_level (`new` / `established` / `moderator`), edit_count
- [ ] RLS policies for all contributor tables
- [ ] Edit suggestion flow → opens PR against `brand-data` repo
- [ ] Conflict-of-interest disclosure on edit form
- [ ] Moderator approval queue for new contributors
- [ ] Auto-promote new → established at 10 verified edits
- [ ] `/admin` dashboard: submission queue, edit queue, dispute resolution

---

## 11. Donation & Sustainability (W6 · DEV+CON · P1)

PRD §3.8.

- [ ] `/donate` page with Open Collective embed (or Stripe if OC not approved by W6)
- [ ] One-time + recurring options
- [ ] Monthly financial-transparency markdown file in repo (donations / costs / reserve)
- [ ] Dismissible donation banner (tasteful, infrequent — Wikipedia-style)
- [ ] No paywalls, no premium tiers — verify nothing accidentally gates on donation status

---

## 12. Static Pages & Content (W6 · CON+DES · P1)

PRD §3.9.

- [ ] `/` landing — search bar front & center, sample results, convenience-first messaging layered with ethical framing
- [ ] `/about` — mission, principles, how it works, contributors
- [ ] `/manifesto` — philosophical foundation, commons model
- [ ] `/contribute` — onboarding guide, link to GitHub, contribution etiquette
- [ ] "For Brands" page — onboarding pitch, benefits, token-collection process
- [ ] Open-source callout: GitHub repo link, contribution guide
- [ ] Copywriting pass: avoid preachiness, lead with convenience/quality

---

## 13. Trust & Anti-Exploitation (W6 · DEV+OPS · P0)

PRD §10.

- [ ] Trademark filing for "WellSourced" name (legal — start in W1, lands later)
- [ ] Cryptographic signing of brand-data JSON (signed manifest in `brand-data` repo)
- [ ] Public conflict-of-interest policy in repo
- [ ] All edits traceable via Git history — surface link from profile
- [ ] Brand self-edit detection (warn on COI, force Tier 1 labeling)

---

## 14. SEO & Discoverability (W6 · DEV · P1)

- [ ] `sitemap.xml` generation (static brand pages + categories)
- [ ] `robots.txt`
- [ ] Metadata for every page (title, description, OG, Twitter card)
- [ ] Structured data: Organization for brands, Product for product cards
- [ ] Canonical URLs
- [ ] Performance: Lighthouse ≥ 90 on landing + brand pages

---

## 15. Observability & Ops (W7 · OPS · P1)

- [ ] Error tracking (Sentry or equivalent)
- [ ] Search analytics: query log, click-through, zero-result tracking
- [ ] Privacy-respecting page analytics (Plausible / Umami)
- [ ] Uptime monitoring for app + Meilisearch + Shopify sync
- [ ] Cost dashboard: Anthropic, Meilisearch, Vercel, Supabase
- [ ] Sync-job alerting on failure

---

## 16. Testing & QA (W7 · DEV · P0)

- [ ] Unit tests: search query builder, LLM parser, trust-tier resolver
- [ ] Integration tests: Shopify sync (mocked API), Meilisearch indexing
- [ ] E2E: search → results → click-through to Shopify (Playwright)
- [ ] Accessibility audit (axe + manual screen reader)
- [ ] Performance audit (Lighthouse, web vitals)
- [ ] Load test: simulate 1000 concurrent searches
- [ ] Manual cross-browser pass (Safari iOS, Chrome Android, Firefox)

---

## 17. Launch Prep (W7–W8 · MIXED · P0)

- [ ] Expand brand catalog to 200+
- [ ] Open-source the repo publicly (license, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md)
- [ ] Production deploy: Vercel for app, Railway for Meilisearch, Supabase prod project
- [ ] DNS: point `wellsourced.io` → Vercel; subdomains for Meilisearch
- [ ] Backup strategy: Supabase daily snapshots, Meilisearch index dump
- [ ] Incident-response runbook
- [ ] Launch announcement copy (HN, Show HN, relevant subreddits, Mastodon, Threads)
- [ ] Press kit (logo, screenshots, positioning)
- [ ] Final UX dogfood pass against the "is this easier than Amazon for this task?" test

---

## 18. Post-Launch / Future Roadmap (PX)

From PRD §11 — not commitments, surfaced here so they don't get lost.

- [ ] Browser extension: surface WellSourced alternatives while on Amazon
- [ ] Unified cart across multiple Shopify brands (Storefront API checkout mutations)
- [ ] Automated brand-onboarding pipeline (discover, validate, index ethical Shopify stores at scale)
- [ ] 501(c)(3) formalization when scale justifies it
- [ ] Supply-chain transparency API for brands to publish/verify data
- [ ] Community-governance formalization (voting on policy, moderation, roadmap)
- [ ] Price-comparison layer showing equivalent Amazon prices
- [ ] Non-Shopify platform support (WooCommerce, BigCommerce) — open question in PRD §12

---

## Risk Register (running)

Mirrors PRD §9 — review monthly post-launch.

| Risk | Owner | Status |
|---|---|---|
| Brand data quality / greenwashing | Moderators | Mitigated via trust tiers + citations |
| Shopify API changes | DEV | Watch changelog, abstract client |
| Token collection bottleneck | DEV/CON | Manual for MVP; automate post-launch |
| Contributor burnout | Community | Celebrate contributions, automate toil |
| Donation shortfall | Founder | Keep costs near zero, grant applications |
| Malicious forks | Legal/DEV | Trademark + signed trust data |

---

## Success Criteria (6 months post-launch)

From PRD §8 — track in `/admin` analytics dashboard.

- 5,000+ MAU
- 500+ brands listed
- 50,000+ products indexed
- 50+ active contributors
- 20%+ search → brand click-through rate
- Donation revenue covers operating costs
