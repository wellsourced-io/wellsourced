<!--
SYNC IMPACT REPORT
==================
Version change: UNVERSIONED → 1.0.0
Modified principles: None (initial versioning)
Added sections:
  - Governance section with amendment procedure and versioning policy
  - Version metadata footer
Removed sections: None
Templates requiring updates:
  ✅ plan-template.md - Already references "Constitution Check" correctly
  ✅ spec-template.md - No constitution-specific constraints, aligned with principle-based requirements
  ✅ tasks-template.md - Task categorization aligns with testing principles (code quality section)
  ⚠️  No commands directory exists yet - when created, ensure constitution references use "Claude" generically
Follow-up TODOs: None

Rationale for version 1.0.0:
  - This is the initial versioned release of the constitution
  - All principles are well-defined and operational
  - Constitution has been used to guide development but not formally versioned until now
  - MAJOR version 1 signals this is the production-ready governance framework
-->

# WellSourced — Project Constitution

> This document establishes the non-negotiable principles for WellSourced development.
> All specifications, plans, tasks, and implementations must comply with these principles.
> This file is managed by spec-kit and referenced by `/speckit.plan` and `/speckit.implement`.

---

## Product Principles

### 1. Convenience Is the Product, Ethics Is the Differentiator

97% of consumers abandon purchases due to inconvenience. Every feature must pass the test: "Is this easier than Amazon for this task?" If it's not easier than the default, nothing else matters. Ethical framing is additive — lead with utility, layer in values.

### 2. Zero Friction to Value

No account required to search or buy. The first useful result must appear within 10 seconds of landing on the site. Signup is only required for contributing, never for shopping.

### 3. Trust Is Visible, Not Assumed

Every piece of brand data shows how it was verified (Tier 1/2/3 per field). Users make their own decisions about what "ethical" means. We don't score or rank ethics — we show the data. This directly addresses the 62% greenwashing skepticism rate.

### 4. The Transaction Belongs to the Brand

WellSourced never owns the checkout. "Buy Direct" links go to the brand's own Shopify store. We help people find products; brands sell them directly. No marketplace fees, no transaction intermediation.

### 5. Commons, Not Commerce

No transaction fees, no investors, no equity. Open-source code, exportable data, no lock-in. This tool does not extract value from the ecosystem it serves.

---

## Technical Principles

### 6. TypeScript Everywhere

All application code is TypeScript with strict mode. No `any` types unless absolutely unavoidable (and documented with a comment explaining why). Type safety prevents bugs and serves as documentation.

### 7. Server-First Rendering

Use Next.js App Router with Server Components as the default. Client Components only when interactivity requires it (search input, filters, dropdowns). This ensures fast initial loads and good SEO.

### 8. Container-Ready Architecture

Every service has a Dockerfile. The app must run identically in Docker Compose (local dev) and in production. No Vercel-specific APIs that would prevent self-hosting. `next.config.ts` must keep `output: "standalone"`.

### 9. Secrets Never in Code

All API keys, tokens, and credentials live in environment variables. Never hardcoded, never committed. Gitleaks pre-commit hooks are mandatory. Storefront Access Tokens are especially sensitive — they never appear in the `brand-data` repo.

### 10. Brand Data Is Git-Native

Brand metadata lives as JSON files in the `brand-data` repo, not in a database. This provides: version control, audit trail, open access, PR-based editing, and no vendor lock-in for the trust layer. The database (Supabase) is for contributor accounts and workflow state only.

---

## Code Quality Standards

### Testing

- All API routes and utility functions must have unit tests
- Search integration must have integration tests against a local Meilisearch instance
- Shopify sync scripts must have tests with mocked API responses
- Target: >80% code coverage for `src/lib/` modules
- Test framework: Vitest (aligned with Vite/Next.js ecosystem)

### Code Style

- ESLint with Next.js recommended config
- Prettier for formatting (consistent, no debates)
- Tailwind CSS for all styling — no custom CSS files unless absolutely necessary
- Component files: PascalCase (`SearchResults.tsx`)
- Utility/lib files: camelCase (`searchClient.ts`)
- Brand data: kebab-case (`brand-name.json`)

### Performance

- Search keyword queries: < 500ms response time
- LLM-augmented search: < 2 seconds response time
- Landing page: Lighthouse performance score > 90
- Brand profile pages: statically generated (SSG) for SEO and speed
- Images: use Next.js `<Image>` with Shopify CDN domains whitelisted

### Accessibility

- All interactive elements must be keyboard-navigable
- Color contrast must meet WCAG AA standards
- Trust tier badges must not rely on color alone (use icons + labels)
- Search results must be screen-reader friendly with proper ARIA labels

---

## Architecture Constraints

### What WellSourced Builds

- Product search across ethical brands (keyword + natural language)
- Brand profile pages with per-field trust data
- Shopify Storefront API integration for live product data
- Community contribution system (submissions, edits, disputes)
- Donation infrastructure (no paywalls, no premium tiers)

### What WellSourced Does NOT Build

- Shopping carts or checkout flows (brands own this)
- User accounts for shoppers (no login to browse/buy)
- Payment processing (donations only, via Open Collective / Stripe)
- Mobile native apps (responsive web only for MVP)
- Brand scoring or ranking algorithms (we show data, not judgments)
- Content/editorial (no blog posts, no "top 10" lists — pure utility)

### Dependency Guidelines

- Minimize npm dependencies. Prefer built-in Next.js / React features.
- For search: Meilisearch JS client only
- For database: Supabase JS client only
- For LLM: Anthropic SDK only
- For Shopify: direct GraphQL queries (no Shopify SDK — it's heavy and opinionated)
- No CSS-in-JS libraries — Tailwind only
- No state management libraries — React state + URL params for search state

---

## Multi-Repo Awareness

This application spans multiple repositories:

| Repo | What | When to reference |
|---|---|---|
| `wellsourced` (this repo) | App code, API routes, scripts, Dockerfiles | All feature development |
| `brand-data` | Brand JSON files, schema, contributing guide | When working with brand data structures |
| `infrastructure` | Docker Compose, Supabase migrations, Meilisearch config | When changing services, database schema, or search config |

**Key cross-repo dependencies:**
- Brand JSON schema (`brand-data/schema/brand.schema.json`) defines what fields the app can display
- Meilisearch index settings (`infrastructure/meilisearch/indexes/product-settings.json`) define what's searchable/filterable
- Supabase migrations (`infrastructure/supabase/migrations/`) define the contributor/submission database schema
- Docker Compose (`infrastructure/docker/docker-compose.yml`) wires everything together for local dev

When implementing features that touch brand data display, search configuration, or database schema, check the relevant sibling repo for the source of truth.

---

## User Experience Mandates

### For Shoppers (Primary Users)

- Search bar above the fold on every page
- No signup, no popups, no interruptions before first search result
- Price displayed prominently on every product result
- Trust tier badge visible at a glance — tooltip for details
- "Buy Direct" button is the primary CTA on product results
- Mobile-responsive from day one (most shoppers are on mobile)

### For Brands

- Onboarding must be completable in under 15 minutes
- Brand profile must be claimable via domain email verification
- Brands are notified when their data is edited
- Self-reported data is clearly labeled (Tier 1) — no pretending

### For Contributors

- "Suggest an Edit" must work without a GitHub account (for casual verifiers)
- Full contributor workflow uses GitHub OAuth
- Clear progression: New → Established (10+ verified edits) → Moderator (community-elected)
- Contributions are attributed publicly (username on brand profiles)

---

## Governance

### Amendment Procedure

This constitution may be amended through the following process:

1. **Proposal**: Any contributor or maintainer may propose an amendment via GitHub issue in the `wellsourced` repo
2. **Review Period**: Minimum 7-day review period for community feedback
3. **Approval**: Amendment requires approval from at least 2 core maintainers
4. **Documentation**: Amendment must include:
   - Rationale for the change
   - Impact assessment on existing specifications and implementations
   - Migration plan if breaking changes are introduced
5. **Version Bump**: Amendment triggers version update per semantic versioning rules below

### Versioning Policy

Constitution version follows semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Backward-incompatible governance changes, principle removals, or fundamental redefinitions that invalidate existing specs
- **MINOR**: New principles added, sections expanded, or material guidance additions that don't break existing compliance
- **PATCH**: Clarifications, wording improvements, typo fixes, or non-semantic refinements

### Compliance Review

All feature specifications, implementation plans, and pull requests must demonstrate compliance with this constitution:

- **Planning Phase**: Constitution Check section in `plan.md` must validate alignment with all relevant principles
- **Implementation Phase**: Code reviews must verify adherence to technical principles and code quality standards
- **Continuous**: Any complexity or constraint violations must be justified in the Complexity Tracking section of `plan.md`

Constitution supersedes all other development practices and conventions. When in doubt, refer to these principles.

---

**Version**: 1.0.0 | **Ratified**: 2026-02-14 | **Last Amended**: 2026-02-14
