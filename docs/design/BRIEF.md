# WellSourced — Design Brief

> **Version:** 1.0
> **Date:** February 14, 2026
> **Purpose:** Guide the visual identity (logo) and web experience (UI) for WellSourced.
> **Companion docs:** PRD, User Personas, User Journeys, Context

---

## Design Context

WellSourced is an open-source product discovery engine for ethical shopping. It connects shoppers with vetted, independent brands via Shopify Storefront API. It is **not** a marketplace — it's public infrastructure. Think Wikipedia for ethical commerce, with a shopping experience that rivals Amazon's convenience.

### Core Tension the Design Must Resolve

The brand must simultaneously feel like:

- **A serious shopping tool** (convenience, speed, trust) — to serve James (the Reluctant Shopper) who will leave if it feels preachy or amateur
- **A values-driven commons** (transparency, openness, community) — to serve Maya (the Conscious Defector) and Sam (the Activist Researcher) who need depth and credibility
- **Not Amazon** — the PRD explicitly states: *"Every design decision should be tested against: 'Would Amazon do this?' If yes, reconsider."*

### Strategic Design Imperatives (from PRD)

1. Solve for convenience before values
2. Build trust through visible verification, not aesthetics alone
3. Target the "considers but doesn't act" segment — remove friction, don't amplify guilt
4. Layer values onto utility — lead with product quality, add the ethical story

### Who We're Designing For (Priority Order)

| User | What they need to feel | Design implication |
|---|---|---|
| **James** (Reluctant Shopper) | "This is easy and normal" | Clean, fast, no guilt, prices front-and-center |
| **Maya** (Conscious Defector) | "I can trust this data" | Trust tiers visible, sources linked, depth accessible |
| **Priya** (Gift-Giver) | "This is fun to explore" | Discovery-forward, shareable, visually rich results |
| **Elena** (DTC Brand) | "This is credible and worth my time" | Professional, not scrappy — looks like real infrastructure |

---

## Part 1: Logo Design Brief

### Objective

Create a logomark + wordmark system for WellSourced that works across web, social, favicons, and embeddable badges ("Find us on WellSourced" / "Verified on WellSourced").

### Inspiration Analysis

The provided logo references share these qualities:

| Reference | Key Takeaway for WellSourced |
|---|---|
| **Evernest** | Nature-meets-structure (tree inside house shape). Organic icon with a grounded, modern wordmark. Monochrome. |
| **Everbrew** | Warmth, approachability, handwritten feel. Leaf motif. More artisanal/indie. |
| **Greenly** | Clean, geometric, corporate-leaning. Folded-envelope icon doubles as a "G." Gradient adds dimension. |
| **Upshift** | Bold, playful, high-energy. Icon embeds a concept (lightning bolt in speech bubble). Strong color commitment. |

### Direction

WellSourced should land between **Evernest's grounded organic feel** and **Greenly's clean modernity** — warm but not cutesy, structured but not corporate. The logo should feel like a **trusted public institution**, not a startup or a lifestyle brand.

### Logomark Concept Guidance

The icon should encode one of WellSourced's core ideas. Possible conceptual directions:

- **The source** — a spring, well, or origin point (plays on "well" + "sourced")
- **The lens** — magnifying glass or search-into-transparency (discovery + verification)
- **The checkmark-in-nature** — verification embedded in an organic shape (trust + values)
- **The open hand / open book** — commons, giving, public knowledge
- **The connected dots** — network of brands, community, supply chain visibility

Avoid: generic globes, recycling arrows, leaf-only icons, shopping carts, or anything that screams "eco" without substance.

### Wordmark

- **Style:** Modern sans-serif with subtle character. Not geometric/cold (no Futura), not overly humanist/quirky.
- **Weight:** Medium to semi-bold. Confident but not aggressive.
- **Case:** All lowercase preferred (approachable, modern — like the inspiration logos). "wellsourced" as one word.
- **Character:** Slight roundness or softening to feel human. Could have one distinctive letter treatment (e.g., a custom "w" or ligature).

### Color (Logo)

The logo should work in a **single primary brand color** as well as monochrome (black, white, reversed).

**Primary palette direction:**

| Option | Hex Range | Rationale |
|---|---|---|
| **Deep Teal** | `#0D7377` – `#1A8F8C` | Trust + nature without cliché green. Distinctive in e-commerce. Professional. |
| **Forest Green** | `#2D6A4F` – `#40916C` | Grounded, earthy, ethical. Risks feeling "generic eco" unless paired well. |
| **Warm Indigo** | `#3D5A80` – `#4A6FA5` | Trustworthy, institutional, differentiated. Less expected for ethical commerce. |

**Recommendation:** Deep teal. It bridges the trust/institutional feel (like a bank or government site) with the natural/ethical positioning. It avoids the "green = eco" cliché while still feeling organic.

### Typography (Logo/Brand)

Fonts to explore for the wordmark (not final — for direction):

- **General Sans** — clean, slightly rounded, modern
- **Satoshi** — geometric but warm, good for a tech-forward commons
- **Cabinet Grotesk** — distinctive character, slightly editorial
- **Plus Jakarta Sans** — rounded, friendly, professional
- **Outfit** — clean, modern, slightly geometric with warmth

Avoid: Inter, Roboto, Montserrat, Poppins (overused), script fonts (wrong tone), slab serifs (too editorial).

### Logo System Requirements

- **Logomark only** — for favicons, app icons, social avatars (min 32×32px legible)
- **Logomark + wordmark** — horizontal lockup for nav bars and headers
- **Wordmark only** — for contexts where the icon is too small
- **Badge variant** — "Verified on WellSourced" and "Find us on WellSourced" for brand websites (like Stripe or Shopify trust badges)
- **Monochrome versions** — black, white, single-color for various backgrounds

### What the Logo Must NOT Do

- Look like a startup logo (no gradients-on-gradients, no trendy abstract blobs)
- Look like a nonprofit brochure (no handshakes, no globes)
- Look like greenwashing (no gratuitous leaf/earth imagery)
- Look cheap or DIY (this needs to earn trust from David, the Skeptical Mid-Size Brand VP)

---

## Part 2: Website Design Brief

### Objective

Design the web experience for wellsourced.io — a search-first product discovery platform. The site must feel like a credible, fast, well-built shopping tool that happens to also be an ethical commons.

### Inspiration Analysis

| Reference | What to borrow | What to avoid |
|---|---|---|
| **Amazon Redesign** | Prominent search bar, clean product grid, category cards, clear navigation hierarchy, product cards with image + price + ratings | The marketplace feel, promotional banners, "shop latest" consumerist language |
| **Shopcart** | Horizontal filter chips below search, clean product cards, consistent card sizing, subtle category sidebar | Hero banner pushing deals/discounts, "grab upto 50% off" promotional voice |
| **PetDuct** | Warm color palette, category icons with illustrations, testimonial/trust section, community feel, rounded UI elements | Discount badges, aggressive CTAs, overly cute/niche aesthetic |

### Key Pages to Design

Per the PRD's information architecture:

| Page | Priority | Core UX Goal |
|---|---|---|
| **Landing / Home** (`/`) | P0 | Search bar front-and-center, category browse, value prop in one line |
| **Search Results** (`/search?q=...`) | P0 | Product grid with trust badges, filters, sort — this IS the product |
| **Brand Profile** (`/brand/[slug]`) | P0 | Trust data hierarchy, per-field verification, products from this brand |
| **Brand Directory** (`/brands`) | P1 | Browse all brands, filter by ownership/category/certification |
| **Submit a Brand** (`/submit`) | P1 | Simple form, clear expectations, Storefront token instructions |
| **About / Manifesto** (`/about`, `/manifesto`) | P1 | Mission, principles, open-source ethos — without being preachy |
| **Donate** (`/donate`) | P1 | Clean, Wikipedia-style, transparent about what donations cover |

### Color Palette (Website)

Building from the logo's primary color, here's the full UI palette direction:

**Core Colors:**

| Role | Color | Hex | Usage |
|---|---|---|---|
| **Primary** | Deep Teal | `#0D7377` | CTAs, links, active states, logo |
| **Primary Light** | Soft Teal | `#E6F5F5` | Hover backgrounds, selected filter chips, subtle highlights |
| **Secondary** | Warm Sand | `#F5F0E8` | Page backgrounds, card backgrounds (alternative to pure white) |
| **Neutral Dark** | Charcoal | `#1A1A2E` | Headings, body text, primary typography |
| **Neutral Mid** | Slate | `#64748B` | Secondary text, metadata, descriptions |
| **Neutral Light** | Cloud | `#F1F5F9` | Borders, dividers, inactive elements |
| **White** | Pure White | `#FFFFFF` | Card surfaces, modals, clean backgrounds |

**Trust Tier Colors (Critical — per PRD Section 3.4):**

| Tier | Color | Hex | Usage |
|---|---|---|---|
| **Tier 1 — Self-Reported** | Neutral Gray | `#94A3B8` | Gray badge, subtle — indicates unverified |
| **Tier 2 — Community Verified** | Ocean Blue | `#3B82F6` | Blue badge — indicates community research with citations |
| **Tier 3 — Independently Audited** | Verified Green | `#22C55E` | Green badge — highest trust, third-party confirmed |

**Accent / Utility Colors:**

| Role | Hex | Usage |
|---|---|---|
| **Warning** | `#F59E0B` | Alerts, conflict-of-interest flags |
| **Error** | `#EF4444` | Form errors, out-of-stock indicators |
| **Success** | `#22C55E` | Confirmation messages, approved edits |

**Palette Rationale:** The warm sand background (`#F5F0E8`) differentiates WellSourced from Amazon's sterile white while feeling premium and calm. The teal primary avoids "eco green" cliché. The trust tier colors (gray → blue → green) create an intuitive verification spectrum that addresses the 62% greenwashing skepticism rate — users can see at a glance how verified each data point is.

### Typography (Website)

**Heading Font:** A distinctive, modern sans-serif with character.

Candidates:
- **General Sans** (clean, slightly rounded, versatile)
- **Satoshi** (geometric warmth, pairs well with teal)
- **Cabinet Grotesk** (editorial character, stands out)

**Body Font:** Highly legible, comfortable for reading brand profiles and product descriptions.

Candidates:
- **DM Sans** (excellent readability, slightly rounded, open-source)
- **Source Sans 3** (designed for UI, open-source, professional)
- **Nunito Sans** (friendly, readable, good at small sizes)

**Mono Font (for data/code/contributor tools):**
- **JetBrains Mono** or **Fira Code** — for Git hashes, contributor dashboard, technical data

**Type Scale:**

| Element | Size | Weight | Font |
|---|---|---|---|
| Page title / H1 | 36–40px | Bold (700) | Heading font |
| Section heading / H2 | 28–32px | Semi-bold (600) | Heading font |
| Subsection / H3 | 22–24px | Semi-bold (600) | Heading font |
| Body text | 16px | Regular (400) | Body font |
| Small / metadata | 14px | Regular (400) | Body font |
| Product price | 18–20px | Semi-bold (600) | Body font |
| Trust badge label | 12–13px | Medium (500) | Body font, uppercase |
| Button text | 15–16px | Medium (500) | Body font |

### Iconography

**Style:** Line icons with consistent 1.5–2px stroke weight. Slightly rounded caps and joins (matching the rounded, approachable brand feel). Not filled — line icons feel more transparent and open (aligns with the commons ethos).

**Icon Set Direction:**
- Use **Lucide** (open-source, clean, consistent) or **Phosphor** (slightly more character, also open-source) as a base set
- Custom icons needed for: trust tier badges, ownership type indicators (indie, co-op, worker-owned, B Corp), certification logos, category icons

**Key Custom Icons:**

| Icon | Usage | Notes |
|---|---|---|
| **Trust Tier 1** (circle outline) | Self-reported data indicator | Gray, minimal — suggests "unconfirmed" |
| **Trust Tier 2** (shield with check) | Community-verified indicator | Blue, moderate confidence |
| **Trust Tier 3** (shield with star) | Independently audited indicator | Green, highest confidence |
| **Buy Direct** (external link arrow) | CTA on product cards | Must feel like "going to the brand's store" |
| **Ownership types** | Filter chips and brand profiles | Distinct icons for: indie, worker-owned, co-op, B Corp, employee-owned |
| **Suggest an Edit** (pencil + plus) | Brand profile edit trigger | Must feel low-friction, inviting |

**Icon Color Rules:**
- Default state: `#64748B` (slate/neutral)
- Active/selected: Primary teal
- Trust tier icons: Use their respective tier colors
- Never use multi-color icons in the product grid — keep it clean

### Voice & Tone

WellSourced's voice is the product of its core tension: it must sound like a **trusted tool**, not an **activist platform** or a **startup**.

**Brand Voice Attributes:**

| Attribute | What it means | What it doesn't mean |
|---|---|---|
| **Clear** | Direct, plain language, no jargon | Not dumbed-down or patronizing |
| **Honest** | States what's verified and what isn't; admits limitations | Not falsely modest or self-deprecating |
| **Warm** | Approachable, human, encouraging | Not cute, quirky, or trying too hard |
| **Confident** | Knows what it is and doesn't apologize for it | Not arrogant, preachy, or self-righteous |
| **Practical** | Focused on utility and action | Not philosophical or lecture-y in the UI |

**Tone by Context:**

| Context | Tone | Example |
|---|---|---|
| **Search UI / product cards** | Minimal, functional, let the data speak | Product name. Price. Brand. Badge. "Buy Direct →" |
| **Landing page** | Confident, concise, benefit-first | "Find great products from brands you can trust. Search across hundreds of ethical brands, buy direct." |
| **Trust tier tooltips** | Educational, neutral, factual | "Community-verified: A contributor researched this claim and cited sources. View sources →" |
| **Brand profiles** | Informative, transparent, plain language | "Workers earn a living wage" not "SA8000 certified." Show the cert, but explain it in human terms. |
| **Error states / empty results** | Helpful, not apologetic | "No results for 'purple widgets.' Try broadening your search, or browse by category." |
| **Contributor guide** | Encouraging, clear, structured | "Submit your first brand in 10 minutes. Here's what you need." |
| **About / Manifesto** | Direct, passionate (but controlled), principled | "WellSourced is not a startup. It's a public utility for people who want to know where their money goes." |
| **Donation page** | Honest, no guilt | "WellSourced costs $X/month to run. Donations keep it free. Here's exactly where the money goes." |

**Words We Use:**

- "Find" not "Shop" (we're a discovery tool, not a store)
- "Buy direct" not "Purchase" or "Add to cart" (we don't own the transaction)
- "Brands" not "Sellers" or "Vendors" (dignified, direct relationship)
- "Trust data" not "Ethics score" or "Rating" (we show data, we don't judge)
- "Community-verified" not "Fact-checked" (less political, more collaborative)
- "Suggest an edit" not "Report an error" (inviting, not adversarial)

**Words We Avoid:**

- "Ethical" as a primary hook (it's the bonus, not the headline)
- "Conscious," "mindful," "sustainable" as lead messaging (preaches to the choir, loses James)
- "Guilt-free" (implies guilt in the first place)
- "Save the planet" (too grandiose, triggers skepticism)
- "Amazon alternative" (defines us by what we're against, not what we are)
- "Curated" (implies gatekeeping — we're a commons, not a boutique)

### Layout & Spacing

**Grid:** 12-column grid with responsive breakpoints. Max content width: 1280px (comfortable, not sprawling).

**Spacing System:** 4px base unit. Use multiples: 8, 12, 16, 24, 32, 48, 64, 96.

**Card Design (Product Cards):**

- White card on sand background (or white-on-white with subtle border)
- Rounded corners: 12px (friendly, modern — matches the rounded icon style)
- Subtle shadow or 1px border — not both (clean, not heavy)
- Product image: 1:1 or 4:3 aspect ratio, consistent across grid
- Content: Product name → Price → Brand name → Trust tier badge → "Buy Direct →"
- Price must be **immediately visible** (James needs this — he's in the 47-65% citing price as primary friction)

**Search Bar:**

- Large, prominent, centered on the landing page (follows all three website inspirations)
- Placeholder text: "Search for products, brands, or try 'birthday gift under $50'" (hints at NLP capability)
- Suggested searches or recent categories below the bar on the homepage
- On results page: search bar moves to top nav (sticky header)

**Filter Bar:**

- Horizontal chip-style filters below search results header (inspired by Shopcart)
- Chips: Category, Price Range, Ownership Type, Certifications, Trust Tier Minimum
- Active filters shown as filled chips with "×" to remove
- "Sort by" dropdown on the right
- Collapsible on mobile (expand/collapse toggle)

### Responsive Behavior

| Breakpoint | Layout | Notes |
|---|---|---|
| **Desktop** (≥1024px) | 12-column grid, 4 product cards per row, sidebar filters optional | Full experience |
| **Tablet** (768–1023px) | 8-column grid, 3 cards per row, filters as horizontal chips | Compact nav |
| **Mobile** (<768px) | Single column, 2 cards per row, filters as expandable sheet | Search bar always accessible, bottom nav optional |

Product cards should maintain consistent aspect ratios across breakpoints. Brand profiles stack vertically on mobile with trust data above products.

### Interaction & Motion

**Principles:** Motion should be functional, not decorative. Every animation should serve a purpose: feedback, orientation, or delight.

| Interaction | Animation | Duration |
|---|---|---|
| Page load | Subtle fade-in, staggered card reveal | 200–400ms |
| Search results loading | Skeleton placeholders → fade in results | 150ms per card |
| Filter chip selection | Fill color + subtle scale (1.02x) | 150ms ease-out |
| Trust tier tooltip | Fade + slight upward shift | 200ms |
| "Buy Direct" hover | Arrow nudge right (2px) + color shift | 150ms |
| Card hover | Subtle lift (translateY -2px) + shadow increase | 200ms |
| Navigation transitions | Crossfade between pages | 200ms |

Avoid: bouncy animations, parallax scrolling, auto-playing carousels, animated backgrounds. These conflict with the "convenience-first, fast, trustworthy" positioning.

### Accessibility Requirements

- WCAG 2.1 AA minimum across all pages
- Color contrast: 4.5:1 for body text, 3:1 for large text
- All trust tier information must be conveyed through more than color alone (icons + labels + color)
- Keyboard navigable: full tab order through search, filters, product cards, and brand profiles
- Screen reader support: semantic HTML, ARIA labels for trust badges, alt text for product images
- Reduced motion: respect `prefers-reduced-motion` — disable non-essential animations

### Anti-Patterns (Things to Explicitly Avoid)

| Anti-Pattern | Why |
|---|---|
| Dark patterns (countdown timers, fake urgency) | Violates the "don't become what you're replacing" principle |
| Newsletter popups on first visit | 97% abandon due to friction — don't add more |
| Autoplay video | Slow, distracting, feels like advertising |
| Infinite scroll without URL state | Breaks shareability and back-button behavior |
| Ratings/scores for brands | WellSourced shows data, not judgment — users decide |
| Green-everything aesthetic | Triggers "greenwashing" radar — the 62% will bounce |
| Stock photos of happy diverse people | Feels corporate and inauthentic — use real product images |
| "Join the movement" language | Preachy, guilt-driven — loses James, the primary conversion target |

---

## Design Deliverables Checklist

### Logo Package
- [ ] Logomark (standalone icon)
- [ ] Logomark + wordmark (horizontal lockup)
- [ ] Wordmark only
- [ ] Badge variants ("Verified on WellSourced," "Find us on WellSourced")
- [ ] Favicon and social avatar versions
- [ ] Monochrome variants (black, white, single-color)
- [ ] Color specifications (hex, RGB, HSL)
- [ ] Minimum size rules and clear space requirements
- [ ] Usage guidelines (do's and don'ts)

### Website Design
- [ ] Landing page (desktop + mobile)
- [ ] Search results page with product grid (desktop + mobile)
- [ ] Brand profile page with trust data (desktop + mobile)
- [ ] Brand directory / browse page
- [ ] Brand submission form
- [ ] Component library: product cards, trust badges, filter chips, buttons, form elements, navigation
- [ ] Trust tier visual system (badges, tooltips, per-field indicators)
- [ ] Empty states and error states
- [ ] Loading/skeleton states

---

## Summary / TL;DR

**Logo:** Modern, grounded, institutional-feeling mark that avoids startup and nonprofit clichés. Deep teal primary color. Lowercase wordmark in a warm-but-clean sans-serif. Needs to work as a favicon and as an embeddable trust badge on brand websites.

**Website:** Search-first shopping tool with warm sand + white palette, teal accents, and a clear gray → blue → green trust tier system. Convenience is the priority — prices visible, filters accessible, zero friction to first result. Voice is clear, honest, and practical — never preachy. Layout borrows the best of modern e-commerce (prominent search, clean product grids, horizontal filter chips) while rejecting the worst (dark patterns, fake urgency, guilt messaging). Everything is open, auditable, and designed to earn trust through transparency rather than aesthetics alone.

---

*This brief should be treated as a living document. Update after logo explorations and first design iterations.*
