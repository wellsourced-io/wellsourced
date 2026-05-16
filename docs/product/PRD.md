# WellSourced — Product Requirements Document (PRD)

> **Version:** 2.0 — MVP
> **Last Updated:** February 2026
> **Status:** Ready for Build
> **Build Tool:** Claude Code
> **Timeline:** 6–8 weeks, solo developer
> **Domain:** wellsourced.io
> **GitHub:** github.com/wellsourced-io

---

## 1. Overview

WellSourced is an open-source, community-maintained product discovery engine that helps people find and buy products directly from ethical, independent brands. It connects to brands' Shopify storefronts via the Storefront API to provide real product search with live pricing — so users can discover, compare, and buy without ever touching Amazon.

WellSourced is **not a marketplace**. It does not process transactions or take a cut. It is public infrastructure — a free utility for conscious consumers, funded by voluntary donations and grants.

### 1.1 Problem Statement

People who want to stop funneling money to extractive megacorporations face a discovery problem. They know they should buy direct from brands, but:

- They don't know which ethical brands exist
- They can't search across brands for specific products
- Navigating dozens of individual storefronts is exhausting
- They have no way to verify a brand's ethical claims — and 62% of consumers now believe companies engage in greenwashing (up from 33% in 2023)

The result: while 65% of consumers say they want to buy ethically, only 26% consistently do. The gap isn't a values problem — it's an infrastructure problem. 97% of consumers have abandoned a purchase due to inconvenience, and only 13% would leave Amazon solely for ethical reasons. The ethical shopper who "considers but doesn't act" — roughly 48% of the market — needs a tool that removes friction, not one that amplifies guilt.

### 1.2 Solution

A search-first web application where users type what they need — in natural language — and get back actual products from vetted, ethical Shopify-powered brands. Every product result is enriched with community-maintained transparency data about the brand behind it: who owns it, where it's made, how workers are treated, and what certifications it holds.

### 1.3 Market Context

The ethical consumer goods market is valued at approximately **$294 billion globally** (2023) and growing at ~10.7% CAGR. Products with ESG-related claims have driven **56% of all US consumer packaged goods growth** over the past five years. Shopify powers **4.8 million stores and $292 billion in annual GMV** — a massive, API-accessible catalog of independent brands with no ethical discovery layer. The competitive landscape is fragmented and weak: Good On You rates brands but doesn't enable shopping. Thrive Market sells but only groceries. EarthHero and DoneGood are too small and shrinking. No platform combines discovery, shopping functionality, and credible verification at scale.

### 1.4 Strategic Design Imperatives

Three principles derived from market research that must guide every product decision:

1. **Solve for convenience before values.** The 97% purchase abandonment rate due to inconvenience means WellSourced must match marketplace-grade UX. Ethical framing is additive, not the primary hook. Make it the easiest way to shop — the fact that it's also ethical is the bonus.

2. **Build trust through community verification layered with certification data.** Only 20% of consumers trust brand self-reporting. 40% trust third-party certifications. 28% trust peer reviews. A hybrid model — community verification anchored to certification data — outperforms either approach alone and directly addresses the 62% greenwashing skepticism rate.

3. **Target the "considers but doesn't act" segment.** 48% of consumers care about ethics but let other factors win. Converting them requires removing friction, not increasing moral pressure. The most effective messaging connects to personal benefit (health, quality, uniqueness) layered with sustainability — not sustainability alone.

### 1.5 Guiding Principles

1. **Transparency over curation** — Surface production conditions and ownership data; let users decide what "ethical" means to them. We don't score or rank ethics — we show the data.
2. **Commons, not commerce** — No transaction fees, no investors, no equity. This tool does not extract value from the ecosystem it serves.
3. **No gatekeeping** — Open source code, exportable data, no lock-in. Users and brands can leave anytime with their data.
4. **Community-governed** — Brand verification and editorial decisions are made by the contributor community, not a founder or board.
5. **Convenience is the feature** — Ethical shopping fails when it's harder than the default. Every UX decision must pass the test: "Is this easier than Amazon for this task?"

---

## 2. User Groups

WellSourced serves three distinct user groups. See the companion **User Personas** and **User Journey** documents for detailed profiles and flows.

| User Group | Role | Primary Goal |
|---|---|---|
| **Shoppers** | Browse and buy products | Find ethical alternatives to Amazon without friction |
| **Brands** | Get listed and maintain their profile | Gain direct-to-consumer visibility without marketplace fees |
| **Contributors** | Research and verify brand data | Maintain the integrity and breadth of the platform's trust data |

---

## 3. MVP Feature Requirements

### 3.1 Product Search (P0 — Must Have)

**Description:** The core feature. Users search for products by keyword or natural language query. Results show actual products with images, prices, and availability pulled live from Shopify Storefront API, enriched with brand trust data.

**Functional Requirements:**

- Full-text search across product titles, descriptions, and tags
- LLM-powered semantic search for natural language queries (e.g., "birthday gift for a gardener under $50 from a woman-owned brand")
- Search results display: product image, title, price, brand name, brand trust tier badge, and "Buy Direct" link
- Results are filterable and sortable (see 3.3)
- Search returns products, not just brands — each result links to a specific product on the brand's Shopify store
- Empty state: helpful messaging when no results found, with suggestions to broaden the query
- Search performance target: < 500ms for keyword search, < 2s for LLM-augmented search

**Technical Notes:**

- Index products via Shopify Storefront API (GraphQL)
- Use Meilisearch or Algolia for the search index
- LLM layer (Claude API) processes natural language queries into structured search parameters
- Product data should be cached and refreshed on a schedule (e.g., daily) to avoid rate limits
- Shopify Storefront API is free and doesn't require brand approval — only a storefront access token or public API access

### 3.2 Brand Profiles (P0 — Must Have)

**Description:** Each listed brand has a profile page showing transparency data maintained by the community.

**Functional Requirements:**

- Brand profile page includes: name, logo, description, website URL, product categories, ownership type, certifications, country of HQ, country of manufacture, worker conditions summary, CEO-to-worker pay ratio (where available), price range indicator, and direct link to their Shopify store
- Trust tier badges displayed prominently: Tier 1 (self-reported), Tier 2 (community-verified), Tier 3 (independently audited)
- Each data field shows its trust tier individually (e.g., "ownership type" might be Tier 2 while "worker conditions" is Tier 1)
- Source citations linked for Tier 2+ data
- Edit history viewable (links to Git history)
- "Suggest an Edit" button for logged-in contributors
- Products from this brand displayed on the profile page (pulled from Shopify)
- Plain language summaries alongside certification jargon ("Workers earn a living wage" not just "SA8000 certified") — research shows concrete, personal framing outperforms abstract labels

**Data Schema:**

```json
{
  "name": "string (required)",
  "slug": "string (required)",
  "url": "string (required)",
  "shopify_domain": "string (required for product indexing)",
  "storefront_access_token": "string (required for API access)",
  "logo_url": "string",
  "description": "string (required)",
  "categories": ["string"],
  "ownership_type": "indie | worker-owned | co-op | employee-owned | b-corp | public",
  "certifications": ["B Corp", "Fair Trade", "Climate Neutral", "..."],
  "country_hq": "string (required)",
  "country_manufactured": "string",
  "worker_conditions": "string (free text)",
  "ceo_worker_ratio": "string",
  "price_range": "$ | $$ | $$$ | $$$$",
  "sources": [{"url": "string", "description": "string", "accessed": "date"}],
  "verified_by": ["contributor_username"],
  "last_verified": "date",
  "trust_tiers": {
    "ownership_type": 1|2|3,
    "certifications": 1|2|3,
    "worker_conditions": 1|2|3,
    "country_manufactured": 1|2|3,
    "ceo_worker_ratio": 1|2|3
  }
}
```

### 3.3 Filtering & Sorting (P0 — Must Have)

**Description:** Users can narrow search results using structured filters.

**Functional Requirements:**

- Filter by: product category, price range, ownership type, certifications, country of manufacture, trust tier minimum
- Sort by: relevance (default), price low-to-high, price high-to-low, brand trust tier
- Filters are combinable (AND logic)
- Active filters displayed as removable chips
- Filter counts shown (e.g., "Worker-owned (23)")
- URL-based filter state (shareable filtered views)

### 3.4 Trust Tier System (P0 — Must Have)

**Description:** Visual system that communicates how verified each piece of brand data is. Directly addresses the 62% greenwashing skepticism rate by making verification status transparent per-field.

**Functional Requirements:**

- Three tiers with distinct visual indicators:
  - **Tier 1 — Self-Reported:** Brand or submitter provided this data. No independent verification. Displayed with a neutral/gray indicator.
  - **Tier 2 — Community-Verified:** A contributor researched this and cited sources. Displayed with a blue/moderate indicator.
  - **Tier 3 — Independently Audited:** Confirmed via third-party data (certified B Corp directory, SEC filings, audited reports). Displayed with a green/strong indicator.
- Trust tiers apply per-field, not per-brand (a brand can have Tier 3 certifications but Tier 1 worker conditions)
- Tooltip/expandable explanation of what each tier means
- Sources are clickable links for Tier 2+

### 3.5 Shopify Storefront API Integration (P0 — Must Have)

**Description:** Live product data from brand Shopify stores, enabling product-level search.

**Functional Requirements:**

- Connect to each listed brand's Shopify store via Storefront API
- Pull: product titles, descriptions, images, variants, prices, availability
- Products indexed in the search engine alongside brand metadata
- Product detail in search results links directly to the product on the brand's Shopify store (not an internal product page — we don't own the transaction)
- Data refresh schedule: daily full sync for catalog changes, with manual refresh trigger for admins
- Graceful handling of API failures (show cached data with "last updated" timestamp)
- Handle brands with large catalogs (pagination via Storefront API cursor-based pagination)

**Technical Notes:**

- Shopify Storefront API uses GraphQL
- Key queries: `products`, `collections`, `productByHandle`
- Rate limit: Shopify Storefront API has a cost-based throttle (~1000 cost points per second). Bulk syncs should be throttled.
- Access: Each brand's Shopify store needs a Storefront Access Token. For public stores, the headless access token can sometimes be extracted, or brands can provide one during onboarding.
- Consider a background worker (cron job or serverless function) for daily syncs

### 3.6 Brand Submission (P1 — Should Have)

**Description:** Anyone can nominate a brand for inclusion in WellSourced.

**Functional Requirements:**

- Public submission form (no account required to submit, but account helps track submissions)
- Required fields: brand name, URL, why they should be listed
- Optional fields: Shopify store URL, known certifications, ownership type, evidence links
- Submission enters a review queue visible to established contributors and moderators
- Submitter receives notification when their submission is reviewed
- Duplicate detection (warn if a brand with similar name/URL already exists)

### 3.7 Contributor System (P1 — Should Have)

**Description:** Wikipedia-style community editing with escalating trust.

**Functional Requirements:**

- Authentication via GitHub OAuth (aligns with the open-source ethos and simplifies contributor identity)
- Three trust levels:
  - **New Contributor:** Can submit brands and suggest edits. All contributions require moderator approval.
  - **Established Contributor (10+ verified edits):** Can approve new submissions, edit existing profiles directly, participate in dispute resolution.
  - **Moderator (community-elected):** Can resolve disputes, manage conflict of interest cases, approve governance changes, manage contributor trust levels.
- All edits tracked in Git with full history
- Conflict of interest disclosure: contributors must declare if they are affiliated with a brand they're editing
- Self-reported data clearly labeled — brands can submit their own data but it stays Tier 1 until independently verified

### 3.8 Donation Page (P1 — Should Have)

**Description:** Voluntary donation mechanism, Wikipedia-style.

**Functional Requirements:**

- Simple, clean donation page explaining what donations cover
- One-time and recurring donation options
- Payment processing via Open Collective (provides fiscal sponsorship umbrella for tax-deductible donations) or Stripe
- Financial transparency: monthly public reports showing donations received, costs incurred, reserve balance
- No paywalls, premium tiers, or feature gating based on donation status
- Optional: periodic donation banners (tasteful, dismissible, infrequent)

### 3.9 Landing Page / About / Manifesto (P1 — Should Have)

**Description:** Public-facing pages that communicate the project's mission and values.

**Functional Requirements:**

- Landing page: clear value proposition, search bar front and center, sample results. Lead with convenience and product quality, layer in ethical positioning — research shows layering two sustainability messages onto a core product attribute increases appeal from 44% to 74%.
- About page: mission, principles, how it works, team/contributors
- Manifesto: the philosophical foundation — why this exists, the Wikipedia/commons model, the radical transparency approach (without being preachy)
- Open source callout: link to GitHub repo, contribution guide, how to get involved
- For Brands page: how to get listed, benefits of direct-to-consumer visibility, the onboarding process

---

## 4. Technical Architecture

### 4.1 Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js (React) + Tailwind CSS | SSR for SEO, static generation for brand pages, fast iteration |
| Hosting | Vercel | Free tier covers MVP, domain already registered there |
| Search | Meilisearch (self-hosted) or Algolia | Fast, typo-tolerant search. Meilisearch is open source (aligns with values). |
| LLM Layer | Claude API | Natural language query parsing. Converts "gift for a gardener under $50" into structured search params. |
| Database | Supabase (Postgres) | Contributor accounts, edit tracking, submission queue. Free tier for MVP. |
| Brand Data | JSON/Markdown files in GitHub repo | The "wiki" layer. Version-controlled, auditable, open. PRs for edits. |
| Product Data | Shopify Storefront API → Search Index | Live product catalogs cached and indexed daily. |
| Auth | GitHub OAuth via Supabase Auth | Simple, aligns with open-source contributor identity. |
| Background Jobs | Vercel Cron or GitHub Actions | Daily Shopify product sync, search index updates. |
| Payments | Open Collective (fiscal sponsorship) + Stripe | Donation processing with built-in financial transparency. |

### 4.2 Architecture Diagram

```
[User] → [Next.js Frontend (Vercel — wellsourced.io)]
              ↓
    [Search Query Input]
              ↓
  ┌──────────┴──────────┐
  ↓                     ↓
[Keyword Search]   [LLM Query Parser]
  ↓                     ↓
  └──────────┬──────────┘
              ↓
[Meilisearch / Algolia Product + Brand Index]
              ↓
  ┌──────────┴──────────┐
  ↓                     ↓
[Brand Data             [Product Data
 (JSON/MD in GitHub)]    (Shopify Storefront API → Cached)]
              ↓
[Search Results: Products + Brand Trust Data]
              ↓
[User clicks "Buy Direct" → Brand's Shopify Checkout]
```

**Background Sync:**
```
[Cron Job (daily)] → [Shopify Storefront API (per brand)]
                          ↓
                   [Fetch products, prices, availability]
                          ↓
                   [Update Search Index]
```

**Contributor Flow:**
```
[Contributor] → [GitHub OAuth Login]
                      ↓
              [Edit Brand Profile]
                      ↓
              [Git Commit / PR to Brand Data Repo]
                      ↓
              [Review by Moderator (if new contributor)]
                      ↓
              [Merge → Search Index Updated]
```

### 4.3 Data Flow

1. **Brand onboarding:** Brand data (metadata, trust info) is added to the GitHub repo as JSON/MD files — either by a contributor submitting a PR or via the submission form.
2. **Product sync:** A daily cron job reads each brand's `shopify_domain` and `storefront_access_token`, queries the Shopify Storefront API for their full product catalog, and upserts into the search index.
3. **Search:** User queries hit the search index which contains both product data (from Shopify) and brand metadata (from GitHub). Results are merged so each product result carries its brand's trust data.
4. **Purchase:** User clicks a product → redirected to the product page on the brand's own Shopify store. WellSourced is not in the transaction path.

### 4.4 Key Technical Considerations

- **Shopify Storefront Access Tokens:** Each brand needs one. For MVP, these can be collected during brand onboarding (manual process). Some public Shopify stores expose their token in the page source. Long-term, brands can onboard via a self-service flow.
- **Search Index Size:** 500 brands × average 200 products = ~100k products. Well within free/cheap tiers of Meilisearch or Algolia.
- **Caching Strategy:** Product data cached locally (JSON or DB). Search index rebuilt daily. Brand metadata is low-churn and served directly from static files.
- **Rate Limiting:** Shopify Storefront API allows ~1000 cost points/second. Stagger syncs across brands. A 500-brand sync at 200 products each takes ~15-30 minutes throttled.
- **SEO:** Brand profile pages and category pages should be statically generated for search engine indexing. Product search is dynamic/SSR.

---

## 5. Information Architecture

```
/                         → Landing page with search bar
/search?q=...             → Search results (products + brands)
/brand/[slug]             → Brand profile page with products
/brand/[slug]/products    → Full product listing for a brand
/submit                   → Brand submission form
/contribute               → Contributor onboarding + guide
/about                    → Mission, principles, how it works
/manifesto                → The philosophical foundation
/donate                   → Donation page with transparency
/brands                   → Browse all brands (directory)
/admin                    → Contributor dashboard (auth required)
```

---

## 6. Build Plan

Solo developer, 6–8 week timeline. Shopify Storefront API integration is woven throughout.

| Week | Focus | Deliverables |
|---|---|---|
| **1** | Data seeding + Shopify exploration | Define brand data schema. Research and create profiles for initial 50–100 Shopify-powered brands. Collect Storefront Access Tokens. Test Shopify API queries. Set up GitHub repo structure (wellsourced-io org). |
| **2** | Core infrastructure | Next.js project setup, Tailwind config, Meilisearch instance. Build Shopify product sync script. First product index populated. |
| **3** | Search + product display | Product search UI with results grid. Filtering and sorting. Brand trust tier badges on results. "Buy Direct" links to Shopify stores. |
| **4** | Brand profiles + LLM search | Brand profile pages with trust data. LLM-powered natural language search. Product listings on brand pages. |
| **5** | Community features | Brand submission form. GitHub OAuth. Contributor accounts. Basic edit/suggest flow. Trust tier display per-field. |
| **6** | Polish + launch prep | Landing page, about, manifesto. Donation page (Open Collective). Expand brand catalog to 200+. Open source the repo. |
| **7–8** | Buffer + iteration | Bug fixes, performance optimization, user testing feedback, documentation. |

---

## 7. Estimated Costs

| Item | MVP (Year 1) | Growth (Year 2+) |
|---|---|---|
| Hosting (Vercel) | $0 | $20–$50/mo |
| Search (Meilisearch / Algolia) | $0–$25/mo | $30–$100/mo |
| LLM API (Claude — semantic search) | $10–$30/mo | $50–$200/mo |
| Database (Supabase) | $0 | $25/mo |
| Domain (wellsourced.io) | ~$3/mo | ~$3/mo |
| **Total** | **$13–$58/mo** | **$128–$378/mo** |

Shopify Storefront API is free. The primary cost driver at scale is search indexing volume and LLM API usage. Fiscal sponsorship overhead (Open Collective) is 5-10% of donations received.

---

## 8. Success Metrics (6 Months Post-Launch)

| Metric | Target | Signal |
|---|---|---|
| Monthly active users | 5,000+ | Demand exists |
| Brands listed | 500+ | Catalog is useful |
| Products indexed | 50,000+ | Product-level search adds value |
| Community contributors | 50+ | Wikipedia model is viable |
| Search → click-through to brand | 20%+ | Tool drives actual purchases |
| Donation revenue | Covers operating costs | Financially sustainable |

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Brand data quality / fraud | Users lose trust | Tiered trust system, citation requirements, community moderation |
| Shopify API changes / restrictions | Product data breaks | Abstract API layer, cache aggressively, monitor Shopify changelog |
| Storefront token collection at scale | Onboarding bottleneck | Self-service brand onboarding flow, automate token detection |
| Contributor burnout | Catalog stagnates | Keep contribution lightweight, automate where possible, celebrate contributors |
| Donation shortfall | Can't cover costs | Keep costs near zero, apply for grants, founder covers gap |
| Brands gaming the system | Greenwashing | Require citations, flag self-reported data, conflict of interest policy |
| Malicious forks | Brand confusion / scams | Trademark name, cryptographically sign trust data, canonical domain |
| Price premium perception | Users bounce on price | Surface competitively-priced options first; research shows 12% premium willingness but 28% actual premium — help users find the affordable ethical options |

---

## 10. Governance & Entity Structure

### Entity Structure

WellSourced operates as an **open-source project with no formal business entity** at MVP. The path to formalization:

1. **Now (MVP):** Individual-maintained open-source project. Donations via personal payment methods or platforms (GitHub Sponsors, Ko-fi).
2. **When donations/grants get real:** Fiscal sponsorship via Open Source Collective or similar 501(c)(3). Handles tax-deductible donations, grant applications, and compliance at 5-10% overhead.
3. **At scale (if/when justified):** 501(c)(3) nonprofit formalization. Own board, own tax-exempt status, own reporting obligations.

No LLC. No investors. No equity. The project's legal identity scales with its actual needs.

### Anti-Exploitation Safeguards

- **Trademark the name.** Code is open source; identity is not. Forks cannot use the WellSourced name.
- **Cryptographically signed trust data.** Brand verification data is signed so forks can't forge the trust layer.
- **Conflict of interest policy.** Brands cannot edit their own profiles without disclosure. Self-reported data is labeled Tier 1.
- **All edits are public** via Git history. Full audit trail.

### Contributor Trust Levels

- **New:** Submit brands, suggest edits. Requires moderator approval.
- **Established (10+ verified edits):** Direct edits, approve submissions, participate in disputes.
- **Moderator (community-elected):** Resolve disputes, manage COI cases, governance changes.

### Financial Transparency

Monthly public reports in the GitHub repo: donations received, infrastructure costs, contributor compensation (if any), reserve balance.

---

## 11. Future Roadmap (Post-MVP)

Not commitments — directions based on community demand.

- **Browser extension** — While on Amazon, see WellSourced alternatives for the same product
- **Unified cart** — Single checkout across multiple Shopify brands via Storefront API
- **Automated brand onboarding** — Tooling to discover, validate, and index new Shopify ethical brands at scale
- **Non-profit formalization** — Establish 501(c)(3) when scale justifies it
- **Supply chain transparency API** — Brands publish and verify supply chain data programmatically
- **Community governance formalization** — Voting system for policy, moderation, and roadmap decisions
- **Price comparison layer** — Show equivalent Amazon prices to help users see the real premium (or lack thereof)

---

## 12. Resolved & Open Questions

### Resolved
- [x] ~~Brand name~~ → **WellSourced** (wellsourced.io)
- [x] ~~Entity structure~~ → No LLC. Fiscal sponsorship when needed, 501(c)(3) at scale.
- [x] ~~GitHub org~~ → wellsourced-io
- [x] ~~LLM provider~~ → Claude API
- [x] ~~Hosting~~ → Vercel (domain already registered there)

### Open
- [ ] Storefront Access Token strategy — collect manually for MVP or attempt automated detection?
- [ ] License — MIT? AGPL (prevents proprietary forks)?
- [ ] Non-Shopify brands — manual "Buy Direct" links only, or explore other platform APIs (WooCommerce, BigCommerce)?
- [ ] Fiscal sponsorship provider — Open Source Collective vs. Software Freedom Conservancy vs. other?

---

*WellSourced is not a startup. It's a public utility for people who want to know where their money goes.*
