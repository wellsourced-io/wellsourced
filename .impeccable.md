# WellSourced — Design Context

> Loaded by every `/impeccable` skill invocation. Source-of-truth for audience, voice, and aesthetic direction.
> For the full long-form rationale, see `docs/design/BRIEF.md` (Feb 2026, still authoritative).
> For the implemented token system, see `src/app/globals.css`.
> For the visual reference of the system in one document, see `/design` (the live poster).
> **Last confirmed:** 2026-05-15 — full re-interview ran; direction unchanged; Imagery, motion-token names, empty-state principle, and `/design` structure added.

---

## Users

Priority order. Design every screen for James first; let Maya and Priya access depth on demand.

| User | Job to be done | What they need to *feel* |
|---|---|---|
| **James** — the Reluctant Shopper | Buy a thing, fast, without guilt or friction | "This is easy and normal. Prices are visible. I'm not being lectured." |
| **Maya** — the Conscious Defector | Verify a brand actually lives its claims | "I can trust this data. Sources are linked. Verification tier is obvious." |
| **Priya** — the Gift-Giver | Discover something interesting for someone else | "This is fun to browse. Visually rich. Shareable." |
| **Elena** — the DTC Brand operator | Decide if listing here is worth her time | "This looks like real infrastructure, not a side project." |

**Context of use:** Mostly browser, mixed desktop and mobile. Often a quick session ("I need running shorts") rather than long browsing. Almost never the primary tab — competing with Amazon in another tab.

---

## Brand Personality

Five attributes, in tension on purpose. Hold all five — losing any one tips the brand into a failure mode. Three-word distillation when you need a quick sanity check: **Clear, Honest, Warm**.

| Attribute | Means | Doesn't mean |
|---|---|---|
| **Clear** | Direct, plain language, no jargon | Dumbed-down or patronizing |
| **Honest** | States what's verified vs. unverified; admits limits | Falsely modest or self-deprecating |
| **Warm** | Approachable, human, encouraging | Cute, quirky, or trying too hard |
| **Confident** | Knows what it is and doesn't apologize | Arrogant, preachy, self-righteous |
| **Practical** | Focused on utility and action | Philosophical or lecture-y in the UI |

**Core tension to hold:** A serious shopping tool *and* a values-driven commons. **Never Amazon.** Test every decision against: *"Would Amazon do this?"* If yes, reconsider.

**Voice quick rules** — say "Find" not "Shop"; "Buy direct" not "Add to cart"; "Brands" not "Sellers"; "Trust data" not "Ethics score"; "Suggest an edit" not "Report an error". Avoid "ethical / conscious / sustainable / guilt-free / save the planet / Amazon alternative / curated" as lead messaging — they preach to the choir and lose James.

**Empty & error states** — never apologize, never dead-end. Hand the user the next useful action ("Try a broader search, or browse by category"). Helpful, not contrite. The illustration is an open magnifying glass, not a sad face.

---

## Aesthetic Direction

**Reference triangulation** — sits between Evernest's grounded organic feel and Greenly's clean modernity. Reads as a **trusted public institution**, not a startup or a lifestyle brand. Closer to a museum / public library / civic-tech tool than to a DTC brand site.

**Theme** — default follows the user's system preference (`prefers-color-scheme`). Both modes are first-class and tokens are wired in `globals.css`. Do not hard-code a theme; respect `data-theme` overrides. (Exception: the `/design` poster is light-only by design — it's a specimen of the canonical light palette and pins its own tokens.)

**Surface temperament** — warm sand canvas (`#F5F0E8`) with white surfaces in light mode; deep ink (`#0c0c18`) with charcoal surfaces in dark. Avoid sterile-white "Amazon" backgrounds; avoid "glowing accent on pure black" AI dark mode.

**Color discipline**
- Deep teal (`#0D7377`) is the *only* brand accent. Use it sparingly: CTAs, links, active states, the logo. It works because it's rare.
- Trust tier colors (gray → blue → green) are **semantic, not decorative**. Never repurpose them for unrelated UI states. They build the verification spectrum users learn to read.
- Tint neutrals; don't use pure black or pure white. Tokens already do this — use the variables, don't hand-roll hex.
- Never use gradient text. Never use border-left stripes >1px as accent. Never use the "purple-to-blue gradient on dark" AI palette.

**Typography** — *project-locked, do not propose alternatives.* The brief deliberately committed to:
- **Satoshi** (Fontshare) — display / headings
- **DM Sans** — body / UI
- **DM Serif Display** — editorial accents (sparingly, e.g. manifesto, brand-story pages, the "well**sourced**" wordmark split)
- **JetBrains Mono** — code, contributor tooling, technical data

These are loaded in `src/app/layout.tsx` and aliased to `--font-display / --font-sans / --font-serif / --font-mono`. The impeccable skill's "reflex font" guidance does not apply here — these were chosen deliberately, not by reflex, and switching would break visual continuity with the existing logo, design site, and shipped UI.

**Iconography** — Lucide line icons, 1.5–2px stroke. Slate (`#64748B`) default, teal when active. Trust tier badges use their tier colors. Never multi-color icons in product grids.

**Motion** — functional, not decorative. Use the named tokens, do not invent new timings:
- `--dur-tick` (80ms) — tap feedback, focus ring, checkbox tick
- `--dur-crisp` (200ms) — card lift, tooltip fade, chip dismiss
- `--dur-tip` (240ms) — tooltip popover, drawer slide, modal open
- `--dur-reveal` (320ms) — full-screen / route transitions only
- (150ms "micro" for hover/chip toggle/arrow nudge — inline literal since used everywhere; promote to `--dur-micro` if it appears in a third place)
- `--ease-standard` — `cubic-bezier(0.2, 0.7, 0.3, 1)`, the default for everything

No bounce, no parallax, no autoplay, no springs. Respect `prefers-reduced-motion` — already wired globally.

**Spacing & layout** — 4px base via `--space-*` tokens. Max content width 1280px. Asymmetric is fine; centered-everything is not. Body line length capped ~65–75ch. Don't wrap everything in cards; don't nest cards in cards.

**Imagery** — every image must earn its place. Five categories, each with its own treatment:

| Category | Ratio | Used in | Rule |
|---|---|---|---|
| **Product shot** | 1:1, 1200px | Search cards, brand galleries, category browse | Product centered, 15% padding min, plain background. No SALE stickers, no lifestyle clutter. |
| **Maker / workshop** | 4:5, documentary | Brand profile header, ownership sections | Working portraits — hands, tools, process. Natural light. No staged smiles, no headshots. |
| **Document / evidence** | 16:10, cropped | Trust tier sources, audit trail | Real scans (B Corp, SEC filings, bylaws), 8px corners, source URL visible. No mocked-up docs. |
| **Place of origin** | 16:9, establishing | HQ cards, manufacturing context | Wide shots of the actual site, with geographic context. No generic skylines, no stock factories. |
| **Brand logomark** | 1:1, SVG preferred | Product cards, search autocomplete | SVG, PNG transparent fallback. Sits on white only — never on sand, never on teal. No recoloring. |

**Four imagery principles:** *Useful* (shows the product). *Sourced* (from the brand itself — never stock, never AI-generated). *Credited* (non-product photos name the photographer or source). *Human, not happy* (documentary, not marketing — process over pose).

**Missing imagery is a feature, not a failure.** Warm-sand placeholder tile with a JetBrains-Mono label ("No product image yet") beats a broken image, a stock fallback, or an AI guess. The placeholder doubles as a contributor prompt.

---

## Design Principles

Five principles that arbitrate every visual decision. When two pull against each other, the higher-numbered one wins.

1. **Convenience before values.** James must complete his task without ever reading the word "ethical." The values layer on top of utility, never in front of it.
2. **Trust is shown, not asserted.** Verification tier, sources, and per-field provenance do the work. No "trust badges," no "as seen in," no testimonial walls.
3. **Calm over loud.** Warm sand, generous whitespace, restrained motion. The single teal accent earns attention because nothing else competes for it.
4. **Public infrastructure, not a brand.** Closer to a government data portal or Wikipedia than to a Shopify storefront. Polish is high; theatricality is zero.
5. **Don't become what we're replacing.** No dark patterns, no fake urgency, no newsletter pop-ups, no infinite scroll without URL state, no autoplay anything, no apologetic empty states. If Amazon would do it, we don't.

---

## Project Notes

- **Component library** lives in `src/components/ui/` — Button, Card, ProductCard, BrandProfileHeader, TrustBadge, FilterChip, CategoryTile, Input, NavBar, SearchBar, Skeleton, Logo, Badge. Prefer extending these over inventing parallel primitives.
- **Design site** lives under `/design`:
  - `/design` itself is the **single-page poster** (`src/app/design/page.tsx` + `poster.css`) — the 11-section reference document (brand, color, type, space, icons, components, forms, motion, imagery, empty states, sample composition). Light-mode-only specimen. Use it as the canonical visual reference when a question is *"what does X look like?"*.
  - `/design/foundations/*`, `/design/components/*`, `/design/patterns/*`, `/design/{tokens,brand,content,accessibility,getting-started,changelog}` are the **deep-dive MDX docs**, wrapped by `DocShell` (sidebar + topbar). Use them when a question is *"how do I use X?"* or *"why was X decided?"*.
  - The whole `/design` route is public-facing but unmarketed — accessible only via the homepage footer link or direct URL. Treat it as a quiet companion site for contributors and brand operators, not part of the main consumer funnel.
- **Brand data is read-only** in this repo (lives in sibling `brand-data` repo). Never invent or modify brand JSON in design work.
- **WellSourced is never in the transaction path** — every product CTA is "Buy Direct →" and links out to the brand's Shopify store. Do not design checkout, cart, or payment surfaces.
