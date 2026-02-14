# WellSourced — Main Application

> **Repo:** `wellsourced-io/wellsourced`
> **Role:** The core Next.js application — frontend, API routes, search integration, and Shopify sync scripts.
> **This is where all feature development happens.** Spec-kit is initialized here.

## Critical Rules

- **Never commit secrets.** All API keys, tokens, and credentials go in env vars. Run `./scripts/setup-hooks.sh` to install the gitleaks pre-commit hook.
- **Never store Shopify Storefront Access Tokens in code or brand-data.** They go in the `SHOPIFY_STOREFRONT_TOKENS` env var (JSON blob of `domain:token` pairs).
- **Standalone output required.** `next.config.ts` must keep `output: "standalone"` — the Docker build depends on it.
- **Brand data is read-only in this repo.** Brand JSON files live in the `brand-data` repo and are mounted at `/app/brand-data/` in containers. Do not create or modify brand JSON here.
- **WellSourced is never in the transaction path.** "Buy Direct" links go to the brand's Shopify store. We do not process payments or own checkout.

## Project Structure

```
wellsourced/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page with search bar
│   │   ├── search/             # /search?q=... results page
│   │   ├── brand/[slug]/       # /brand/[slug] profile pages (SSG)
│   │   ├── submit/             # Brand submission form
│   │   ├── contribute/         # Contributor onboarding
│   │   ├── about/              # Mission and principles
│   │   └── donate/             # Donation page
│   ├── components/             # Shared React components
│   └── lib/
│       ├── search/             # Meilisearch client and query helpers
│       ├── shopify/            # Shopify Storefront API client
│       ├── supabase/           # Supabase client (auth, submissions, edits)
│       └── llm/                # Claude API integration (NL query parsing)
├── scripts/
│   ├── sync-shopify.ts         # Shopify Storefront API → Meilisearch sync
│   ├── reindex-search.ts       # Rebuild Meilisearch indexes from brand-data + cached products
│   ├── seed-brands.ts          # Push brand metadata from brand-data/ into Meilisearch
│   └── setup-hooks.sh          # Install gitleaks pre-commit hook
├── Dockerfile                  # Multi-stage production build (standalone output, ~100MB)
├── Dockerfile.worker           # Sync worker container (runs sync-shopify.ts)
├── next.config.ts              # MUST keep output: "standalone"
├── .env.example                # Template for all required env vars
├── .gitleaks.toml              # Secret scanning config
└── .specify/                   # Spec-kit artifacts (constitution, specs, plans, tasks)
```

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Search:** Meilisearch (local: Docker on port 7700, prod: Railway)
- **LLM:** Claude API — converts natural language queries into structured Meilisearch filters
- **Database:** Supabase (Postgres + GitHub OAuth + RLS) — for contributor accounts, submissions, edit suggestions, disputes
- **Product Data:** Shopify Storefront API (GraphQL) — daily sync into Meilisearch
- **Brand Data:** JSON files from sibling `brand-data` repo, mounted read-only

## Key Environment Variables

See `.env.example` for the full list. Critical ones:

| Variable | Purpose |
|---|---|
| `MEILISEARCH_HOST` | Meilisearch URL (local: `http://localhost:7700`, prod: Railway URL) |
| `MEILISEARCH_API_KEY` | Meilisearch master key |
| `ANTHROPIC_API_KEY` | Claude API key for semantic search |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (safe for browser) |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (server-side only) |
| `SHOPIFY_STOREFRONT_TOKENS` | JSON: `{"brand-domain.myshopify.com": "token123"}` |

## Development

```bash
# Option 1: Docker Compose (recommended — runs app + Meilisearch together)
cd ../infrastructure/docker
docker compose up --build

# Option 2: Local Node.js (requires Meilisearch running separately)
npm install
npm run dev
```

## Search Architecture

```
User query → Is it natural language? 
  ├── YES → Claude API parses into structured params (category, price, ownership, etc.)
  └── NO  → Direct keyword search
         ↓
Meilisearch query (products index + brand metadata)
         ↓
Results: product image, title, price, brand name, trust tier badge, "Buy Direct" link
```

Meilisearch indexes:
- **products** — title, description, brand_name, tags, categories, price, availability
- **brands** — name, description, categories, certifications, ownership_type, country_hq

## Shopify Sync (scripts/sync-shopify.ts)

Runs daily via GitHub Actions cron (3 AM UTC) or manually:
1. Reads brand JSON files from `/app/brand-data/`
2. For each brand with a `shopify_domain`, queries Shopify Storefront API for products
3. Upserts product data into Meilisearch `products` index
4. Handles pagination, rate limiting (1000 cost points/sec), and failure recovery

## Sibling Repos

| Repo | What it provides to this app |
|---|---|
| `brand-data` | Brand JSON files mounted at `/app/brand-data/` (read-only) |
| `infrastructure` | Docker Compose config, Supabase migrations, Meilisearch index settings |

## Information Architecture

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
