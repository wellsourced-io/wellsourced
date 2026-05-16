---
name: WellSourced
description: Public infrastructure for finding products that are actually made well.
colors:
  teal-deep: "#0d7377"
  teal-deep-pressed: "#0a5c5f"
  teal-light: "#e6f5f5"
  sand: "#f5f0e8"
  sand-deep: "#ece4d4"
  white: "#ffffff"
  ink: "#1a1a2e"
  slate: "#64748b"
  cloud: "#f1f5f9"
  cloud-2: "#e2e8f0"
  ink-dark-bg: "#0c0c18"
  ink-dark-surface: "#151527"
  ink-dark-border: "#232340"
  ink-dark-muted: "#8a94a6"
  trust-self-reported: "#94a3b8"
  trust-self-reported-bg: "#f1f5f9"
  trust-community: "#3b82f6"
  trust-community-bg: "#eff6ff"
  trust-audited: "#22c55e"
  trust-audited-bg: "#ecfdf5"
  warn: "#f59e0b"
  warn-bg: "#fef3c7"
  err: "#ef4444"
  err-bg: "#fee2e2"
typography:
  display:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.005em"
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.04em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  editorial:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"
components:
  button-primary:
    backgroundColor: "{colors.teal-deep}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.teal-deep-pressed}"
    textColor: "{colors.white}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    textColor: "{colors.teal-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.cloud}"
  input-default:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "44px"
  input-focus:
    textColor: "{colors.ink}"
  search-bar-hero:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "60px"
  search-bar-compact:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 14px"
    height: "40px"
  chip-default:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: "32px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sand}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: "32px"
  card-default:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "24px"
  product-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "0"
  product-card-cta:
    backgroundColor: "{colors.teal-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: "40px"
  trust-badge-self-reported:
    backgroundColor: "{colors.trust-self-reported-bg}"
    textColor: "{colors.trust-self-reported}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  trust-badge-community:
    backgroundColor: "{colors.trust-community-bg}"
    textColor: "{colors.trust-community}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  trust-badge-audited:
    backgroundColor: "{colors.trust-audited-bg}"
    textColor: "{colors.trust-audited}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sand}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: WellSourced

## 1. Overview

**Creative North Star: "The Verified Commons"**

WellSourced is public infrastructure that happens to look like a fast shopping tool. The visual system is built around one signature pattern — the gray → blue → green trust-tier spectrum that runs through every claim, every brand, every product card. Verification is not a marketing flourish; it is the load-bearing element of the interface. Sources are linked. Tiers are visible. Everything claimed is also cited.

Around that spine, the system is calm and warm. A sand canvas instead of Amazon's sterile white. A single deep-teal accent that earns attention because nothing else competes for it. Documentary imagery, never stock. Type that reads as civic and grown-up — Satoshi for headings, DM Sans for body, DM Serif Display reserved for the rare editorial moment. The result feels closer to a public library or a government data portal than to a DTC brand site, which is exactly the point: *public infrastructure, not a brand.*

The system explicitly rejects the visual vocabulary of the things it competes with. No Amazon-style sterile-white canvas, no promotional banners, no fake urgency. No "ethical" startup vocabulary either — no purple-to-blue gradients on dark, no glowing accents, no glassmorphism, no gradient text. No "green-everything" greenwashing aesthetic. No trust badges that aren't backed by linkable sources.

**Key Characteristics:**
- One accent (deep teal) used on ≤10% of any screen
- Trust-tier color is semantic, never decorative
- Warm sand canvas (`#f5f0e8`) replaces sterile white in light mode
- Documentary imagery only — never stock, never AI-generated
- Motion is functional: four named durations, one easing curve, no bounce
- Theme follows `prefers-color-scheme`; both light and dark are first-class

## 2. Colors

A warm-neutral foundation with a single deep accent and a three-step verification spectrum that does most of the system's communicative work.

### Primary
- **Deep Teal** (`#0d7377`): The only brand accent. Used on CTAs, links, active filter borders, focus rings, and the logo. Its rarity is the point — overuse kills the signal.
- **Deep Teal Pressed** (`#0a5c5f`): Hover and active state for primary buttons; underlines on press.

### Secondary
- **Soft Teal** (`#e6f5f5`): Hover backgrounds, selected pill fills, focus-ring glow halo, text selection. The only acceptable "tinted" surface — never repurpose for unrelated UI states.

### Tertiary — The Trust Spectrum
The semantic backbone of the system. These three colors are reserved for trust tiers and the variants users learn to read across pages. **Never repurpose them for unrelated UI states.**
- **Self-Reported Slate** (`#94a3b8`) on **Self-Reported Background** (`#f1f5f9`): Tier 1 — the brand provided this; nobody checked. The intentionally muted treatment communicates "starting point, not endorsement."
- **Community Blue** (`#3b82f6`) on **Community Background** (`#eff6ff`): Tier 2 — a contributor cross-checked against a public source. Mid-confidence, source link required.
- **Verified Green** (`#22c55e`) on **Verified Background** (`#ecfdf5`): Tier 3 — backed by a third-party certification or audit. The highest tier. Same green as Success — and that's intentional: verification IS success in this system.

### Neutral
- **Warm Sand** (`#f5f0e8`): Page canvas in light mode. The single decision that most distances WellSourced from Amazon. Never use pure `#ffffff` as a page background.
- **Sand Deep** (`#ece4d4`): Section dividers, alternating bands, subtle elevation on a sand canvas.
- **White** (`#ffffff`): Card and surface fill in light mode. Never the page canvas.
- **Ink** (`#1a1a2e`): All body text and headings in light mode. Tinted toward the brand's deep-teal hue family — never pure black.
- **Slate** (`#64748b`): Secondary text, metadata, default icon color, list markers.
- **Cloud** (`#f1f5f9`) and **Cloud 2** (`#e2e8f0`): Borders, dividers, ghost-button hover background.

### Dark Mode
- **Dark BG** (`#0c0c18`): Page canvas in dark mode. Tinted toward indigo, never sterile black.
- **Dark Surface** (`#151527`): Card and surface fill in dark mode.
- **Dark Border** (`#232340`): Borders and dividers.
- **Dark Muted** (`#8a94a6`): Secondary text in dark mode.

### Utility
- **Warning Amber** (`#f59e0b`) on **Amber BG** (`#fef3c7`): Conflict-of-interest flags, attention-required notices.
- **Error Red** (`#ef4444`) on **Error BG** (`#fee2e2`): Form errors, out-of-stock, destructive actions.

### Named Rules

**The One Voice Rule.** The deep-teal accent appears on ≤10% of any screen. It is the only saturated color permitted outside the trust spectrum. If a second accent feels needed, the design is wrong before the color is.

**The Verification Lock Rule.** Slate, Community Blue, and Verified Green belong to the trust tiers. They are never used decoratively — never as chip fills, never as section accents, never as illustration colors. Rebinding these hues anywhere else dissolves the spectrum users have learned to read.

**The Warm Canvas Rule.** Sand is the page; white is the surface. Inverting this — white page with sand cards — reads as Amazon by accident.

## 3. Typography

**Display Font:** Satoshi (Fontshare) — geometric warmth, civic posture.
**Body Font:** DM Sans (Google Fonts) — high legibility, slightly rounded, comfortable for long brand profiles.
**Editorial Font:** DM Serif Display — reserved for manifesto, brand stories, the "well**sourced**" wordmark split.
**Mono Font:** JetBrains Mono — Git hashes, contributor tooling, "no image yet" placeholders, technical data.

**Character:** A modern-civic pairing. Satoshi feels engineered without being cold; DM Sans is the friend that explains the engineering. The serif is held in reserve so it lands when it appears — not as decoration, but as voice. The pairing is project-locked: the Impeccable skill's "reflex font" rejection list is suspended for this project because these fonts were chosen deliberately and switching would break visual continuity with the shipped logo, design site, and product UI.

### Hierarchy
- **Display** (Satoshi 700, `clamp(2rem, 1.4rem + 2vw, 2.5rem)`, line-height 1.1, letter-spacing -0.01em): Page titles, landing-page hero, brand name on profile pages.
- **Headline** (Satoshi 600, 1.75rem, line-height 1.2): Section headings on profile pages and the design site.
- **Title** (Satoshi 600, 1.375rem, line-height 1.3): Subsection headings, card titles on dense surfaces.
- **Body** (DM Sans 400, 1rem, line-height 1.55): Body copy, descriptions, default UI text. **Capped at 65–75ch** for body passages; longer reads at 56ch (`.lede`, blockquote).
- **Label** (DM Sans 500, 0.75rem, line-height 1, tracking 0.04em, often uppercase): Trust badges, table headers, eyebrow labels. **All-caps only at this size and below.**
- **Mono** (JetBrains Mono 400, 0.8125rem): Inline `code`, "no product image yet" placeholders, contributor tooling, audit data.
- **Editorial** (DM Serif Display 400 italic, 1.125rem, line-height 1.55, max 56ch): Pull-quotes, blockquotes, manifesto opening lines. Italic by default.

OpenType: body font runs `font-feature-settings: "ss01", "cv01"` for slightly humanist alternates. Tabular numerics (`tabular-nums`) on filter chip counts, prices, and audit data.

### Named Rules

**The Reserved Serif Rule.** DM Serif Display appears in three places only: the wordmark's "**sourced**" split, blockquotes inside editorial pages, and explicitly-marked manifesto moments. Every other use dilutes its meaning.

**The Caps Ceiling Rule.** All-caps is permitted only on labels at 0.75rem and smaller. Headings are never all-caps. Body copy is never all-caps. This keeps the system from sliding into either a hospital portal or a hardware-store sign.

## 4. Elevation

The system is **flat by default with three earned shadows**. No ambient glow, no decorative depth. Shadows answer the question "is this element responding to me?" — never "is this section more important?"

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 2px rgba(26, 26, 46, 0.04), 0 1px 1px rgba(26, 26, 46, 0.03)`): The resting state of every surface. So subtle it reads as a hairline plus a hint of weight, not as a drop shadow.
- **Hover** (`box-shadow: 0 10px 24px -8px rgba(26, 26, 46, 0.12), 0 2px 6px rgba(26, 26, 46, 0.05)`): Interactive cards on hover, paired with a 1px upward translate. The lift is the response; the shadow makes the response visible.
- **Modal** (`box-shadow: 0 24px 48px -16px rgba(26, 26, 46, 0.18)`): Modal dialogs and tooltips that need to clearly float above the canvas.

All shadow ink is `rgba(26, 26, 46, …)` — the brand's tinted ink color, never pure black. Pure black shadows on a sand canvas read muddy.

### Named Rules

**The Earned Shadow Rule.** A shadow must answer a state question. Resting cards get the hairline `--shadow-card`. Interaction earns `--shadow-hover`. Floating layers get `--shadow-modal`. There is no fourth shadow, and there is no shadow used as decoration.

**The Tinted Black Rule.** Shadow ink is never `rgba(0, 0, 0, …)`. Always the ink-tinted alpha so shadows feel like they belong to the surface they sit under.

## 5. Components

Components share a single language: `--ease-standard` (`cubic-bezier(0.2, 0.7, 0.3, 1)`) for every transition, four named durations (`--dur-tick` 80ms, `--dur-crisp` 200ms, `--dur-tip` 240ms, `--dur-reveal` 320ms), `:focus-visible` outline of `2px solid var(--color-teal)` at 2px offset on every interactive surface.

### Buttons
Confident, civic, never shouty. Pill-shape signals approachability without going cute.
- **Shape:** Fully rounded pill (`border-radius: 9999px`).
- **Sizes:** `sm` 36px, `md` 44px, `lg` 52px tall — all with horizontal padding scaled to height.
- **Primary:** Deep Teal background (`#0d7377`), white text, the resting `--shadow-card` for a hint of weight. Hover and active shift to Deep Teal Pressed (`#0a5c5f`). Used for the single most important action on a screen.
- **Secondary:** White surface, ink text, 1px border. Hover swaps the border and text to Deep Teal — never a fill change. Used for the second action.
- **Ghost:** Transparent at rest, ink text. Hover fills with Cloud (`#f1f5f9`). Used for tertiary actions and toolbar buttons.
- **Loading:** A 16px spinner replaces the leading content; label remains visible. `aria-busy` is set.

### Inputs / Fields
Generous, breathable, with a recognizable focus state.
- **Style:** White surface, 1px Cloud-2 border, 12px radius (`--radius-md`), 44px tall, 14px text.
- **Focus:** Border shifts to Deep Teal AND a 4px Soft-Teal halo (`box-shadow: 0 0 0 4px var(--color-teal-light)`). The combination is the signature focus state across the app — copy this pattern wherever a field needs focus emphasis.
- **Error:** Border swaps to Error Red; helper text turns Error Red. The halo never turns red; halo is reserved for focus alone.

### SearchBar — *signature surface*
The primary entry point of the system. Where James finds what he came for; where the Verified Commons opens. Built on the Input focus pattern but pill-shaped and given two scales.
- **Variants:** `hero` (60px tall, 16px text — homepage, brand pages) and `compact` (40px tall, 14px text — sticky bar on search results pages).
- **Shape:** Fully rounded pill (`border-radius: 9999px`). Surface fill, 1px Cloud-2 border.
- **Icon slot:** Leading `Search` (Lucide), muted color. `20×20px` on hero, `16×16px` on compact.
- **Focus:** Same signature halo as Input — border shifts to Deep Teal AND a 4px Soft-Teal halo. Driven by `focus-within` on the wrapping label so the entire pill responds, not just the `<input>`.
- **Shortcut affordance:** Optional trailing `<kbd>` chip (JetBrains Mono, 11.5px, Cloud background, 1px border, 6px radius) showing the keyboard shortcut. Hidden under `sm` breakpoint.
- **Placeholder:** A real example query, never "Search…" — *"Search organic cotton shirts, Japanese denim, …"* The placeholder doubles as a hint that the search is exploratory, that natural language is welcome.

### Filter Chips
Horizontal-scrolling row beneath the search bar. Toggle filters with optional counts.
- **Shape:** Pill (`border-radius: 9999px`), 32px tall.
- **Default:** White surface, ink text, 1px Cloud-2 border. Hover shifts border + text to Deep Teal.
- **Selected:** **Inverts to ink fill with sand text** (`background: #1a1a2e; color: #f5f0e8`). This inversion is intentional — the selected chip pulls visual weight without using the deep-teal accent, preserving teal for true CTAs.
- **Count:** Optional tabular-numerics monospace count after the label; subdued when selected.

### Cards / Containers
The default vessel for products, brands, and verification facts.
- **Shape:** 16px radius (`--radius-lg`), white surface, 1px Cloud-2 border, the resting `--shadow-card`.
- **Padding scale:** `none` / 16px / 24px / 40px — pick by content density.
- **Interactive:** On hover, `transform: translateY(-1px)` plus `--shadow-hover` plus border shift to Cloud-2. 200ms with `--ease-standard`. Never animate width, height, padding, or margin.
- **Border:** Always present at 1px. Cards are never borderless on the sand canvas — the border + hairline shadow combination is what makes them legible against the warm tone.

### ProductCard — *primary content surface*
The result that closes James's loop. A composite that hangs the trust badge on the product image, then commits to the outbound CTA — because WellSourced is never in the transaction path.
- **Frame:** Built on `Card` with `interactive padding="none"` and `overflow: hidden`. Inherits the 16px radius, 1px border, and hover lift.
- **Image:** 4:3 aspect, `object-cover`, `loading="lazy"`. Background is **Sand Deep** (`#ece4d4`) — never plain white, never gray — so missing or letterboxed images sit on the warm canvas family.
- **Fallback:** When no image is provided, a Lucide-style line icon at 40×40 in muted color at 40% opacity, centered. Doubles as a contributor prompt; never a broken-image glyph, never a sad face.
- **Trust badge overlay:** Absolute-positioned at 12px top + 12px left, sitting *on* the image. The badge is the first thing the eye finds, before title or price.
- **Body:** 20px padding. Eyebrow brand label in uppercase mono-style (`11.5px`, `0.14em` tracking, Slate). Title in Satoshi 17px/600, line-height 1.25, `line-clamp-2`. Price in Satoshi 20px/600 with `tabular-nums`, right-aligned to the title row.
- **CTA:** 40px-tall teal pill labeled **"Buy direct"** with a trailing `ArrowUpRight` icon to signal an outbound link. Opens in a new tab with `rel="noopener noreferrer"`. Hover transitions to Deep Teal Pressed. This is the *only* call-to-action on the card — there is no "Add to cart", because there is no cart.

### Navigation
Sticky top bar on the search results page; transparent over the canvas elsewhere.
- **Background:** Sand on most pages; white on dense data pages. Solid; never a translucent blur — sticky-nav glassmorphism is still glassmorphism, and the system rejects it.
- **Type:** Body weight 500 for nav items, ink color, slate for inactive.
- **Active:** Deep-teal underline 2px, never a pill background.

### Lockup / Wordmark
The wordmark is the one place the editorial serif appears in the application chrome. It carries the system's claim to seriousness without ever needing to use the word.
- **LogoMark:** A 44×44 monogram (paired W and S strokes) in `currentColor` sitting on a rounded square at 8% opacity tint. Rendered in **Deep Teal** whenever it's paired with the wordmark.
- **Wordmark split:** "Well" in Satoshi 700, immediately followed by "**Sourced**" in DM Serif Display 400 italic at 80% opacity. The serif split is the brand's only routine use of the editorial face — protected by the Reserved Serif Rule.
- **Sizes:** `sm` (20px text, 22px mark — used in NavBar), `md` (26px, 30px — default), `lg` (32px, 36px — footer, `/design` poster, donate page).
- **Tone:** `default` renders ink-colored text; `inverse` renders white text for dark surfaces. The mark stays teal in both — never recolor the mark.

### Trust Badge — *signature component*
The system's most distinctive pattern. A pill that carries an icon, a label, and a tooltip; clickable to a source URL when the source exists.
- **Shape:** Pill, `padding: 4px 10px`, 11.5px text at 0.02em letter-spacing.
- **Tier 1 — Self-Reported:** Cloud background, slate text, `UserCheck` icon. Communicates "claimed, not checked."
- **Tier 2 — Community-Verified:** Pale-blue background (`#eff6ff`), Community Blue text, `Users` icon. Communicates "a contributor cross-checked this against a source."
- **Tier 3 — Independently Audited:** Pale-green background (`#ecfdf5`), Verified Green text, `ShieldCheck` icon. Communicates "third-party certified."
- **Tooltip:** Ink fill, sand text, 8px radius, `--shadow-modal`. Carries the human-language explanation of the tier — never just the tier name.
- **Source link:** When `sourceUrl` is present, the entire pill becomes a link with hover opacity 0.9. Trust without a link is asserted; trust with a link is shown.

### Skeletons
Used during search-results load and brand-profile fetch.
- **Treatment:** Sand-deep base with a slow horizontal shimmer keyframe (`wsShimmer`, 200% → -200% over a slow loop). Respects `prefers-reduced-motion` — the shimmer freezes, the placeholder remains.

## 6. Do's and Don'ts

These are the tests every visual decision has to pass. Quoted directly from the project's design context where applicable.

### Do:
- **Do** use Deep Teal (`#0d7377`) as the only brand accent, on ≤10% of any screen.
- **Do** keep the trust spectrum (Slate / Community Blue / Verified Green) reserved for trust tiers and their variants.
- **Do** use Sand (`#f5f0e8`) as the page canvas in light mode and white as the surface — never invert.
- **Do** tint everything (text, shadows, surfaces) toward the brand hue family. Never pure black, never pure white.
- **Do** cap body line length at 65–75ch; cap editorial passages at 56ch.
- **Do** pair every trust claim with a linkable source. *"Trust is shown, not asserted."*
- **Do** use the four named motion durations (`--dur-tick` 80ms, `--dur-crisp` 200ms, `--dur-tip` 240ms, `--dur-reveal` 320ms) and the single `--ease-standard` curve. Promote a value to a token before introducing a third instance.
- **Do** respect `prefers-reduced-motion` (already wired globally) and `prefers-color-scheme` (both themes are first-class).
- **Do** offer the next useful action in every empty/error state — *"never apologize, never dead-end."* The illustration is an open magnifying glass, not a sad face.
- **Do** use documentary imagery sourced from the brand itself. Credit non-product photos. Show process, not pose.
- **Do** treat missing imagery as a feature: warm-sand placeholder tile with a JetBrains-Mono "No product image yet" label is the canonical fallback.
- **Do** say "Find" not "Shop"; "Buy direct" not "Add to cart"; "Brands" not "Sellers"; "Trust data" not "Ethics score"; "Suggest an edit" not "Report an error."
- **Do** test every decision against *"Would Amazon do this?"* — if yes, reconsider.

### Don't:
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on cards, list items, callouts, or alerts. **Forbidden in every form**, including CSS variables. Reach for full borders, background tints, or no indicator at all.
- **Don't** use gradient text. Never combine `background-clip: text` with any gradient.
- **Don't** use the AI palette: cyan-on-dark, purple-to-blue gradients, neon accents on dark backgrounds, glowing teal halos.
- **Don't** use glassmorphism (blur cards, glass borders) — the system is flat with three earned shadows.
- **Don't** repurpose trust-tier colors (Slate / Blue / Green) for unrelated UI. Rebinding these hues dissolves the spectrum users have learned to read.
- **Don't** use pure black (`#000`) or pure white (`#fff`) anywhere — surfaces, shadows, borders, type. Always tint.
- **Don't** use sterile-white page backgrounds in light mode. Sand is the canvas.
- **Don't** introduce a second brand accent. Teal is the one voice; if a second accent feels needed, the design is wrong before the color is.
- **Don't** wrap everything in cards. Don't nest cards inside cards.
- **Don't** use bouncy or elastic easing. Real objects decelerate smoothly.
- **Don't** animate `width`, `height`, `padding`, or `margin`. Transform and opacity only.
- **Don't** use lifestyle stock photography, AI-generated imagery, or staged smiles. Documentary or nothing.
- **Don't** ship dark patterns: countdown timers, fake urgency, newsletter pop-ups on first visit, autoplay video, infinite scroll without URL state, ratings/scores for brands. *"If Amazon would do it, we don't."*
- **Don't** use lead messaging like "ethical / conscious / sustainable / guilt-free / save the planet / Amazon alternative / curated." These preach to the choir and lose James, the primary conversion target.
- **Don't** apologize in empty or error states. Helpful, not contrite.
- **Don't** propose alternative fonts. Satoshi / DM Sans / DM Serif Display / JetBrains Mono are project-locked.
