import type { Metadata } from "next";

import "./poster.css";
import { MotionScale } from "./MotionScale";
import { MotionChip } from "./MotionChip";
import { MotionStagger } from "./MotionStagger";

export const metadata: Metadata = {
  title: "Design System v1",
  description:
    "The WellSourced design system: a single-page reference for brand, color, type, motion, imagery, and the components that compose every page.",
};

const Wordmark = () => (
  <>
    well<span className="ws-serif">sourced</span>
  </>
);

function Logomark({
  background,
  bgRadius = 12,
  stroke = "#0D7377",
  size = 44,
  showBackground = true,
}: {
  background?: string;
  bgRadius?: number;
  stroke?: string;
  size?: number;
  showBackground?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {showBackground ? (
        <rect width="44" height="44" rx={bgRadius} fill={background ?? "#E6F5F5"} />
      ) : null}
      <path
        d="M10 14 L15 30 L22 20 L29 30 L34 14"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="14" r="2.3" fill={stroke} />
    </svg>
  );
}

function Tier1Icon({ size = 12 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function Tier2Icon({ size = 12 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 4 6v6c0 4.5 3.3 8.5 8 9 4.7-.5 8-4.5 8-9V6l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function Tier3Icon({ size = 12 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 4 6v6c0 4.5 3.3 8.5 8 9 4.7-.5 8-4.5 8-9V6l-8-3z" />
      <path d="m12 8 1.6 3.2L17 12l-2.5 2.3.6 3.4L12 16l-3.1 1.7.6-3.4L7 12l3.4-.8L12 8z" />
    </svg>
  );
}

function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function BuyDirectIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function ClearIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function CaretDown({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 4 4 14v6h6L20 10z" />
      <path d="m14 4 6 6" />
    </svg>
  );
}

function WorkerOwnedIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="9" r="2.5" />
      <circle cx="15" cy="9" r="2.5" />
      <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5M14 19c0-2.5 2-4.5 4.5-4.5S23 16.5 23 19" />
    </svg>
  );
}

function BookmarkIcon({ size = 15, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function DesignSystemPosterPage() {
  return (
    <div className="ds-poster" data-theme="light">
      <div className="page">
        {/* ============ HEADER ============ */}
        <header className="doc-header">
          <div>
            <div className="eyebrow">WellSourced &middot; Design System v1</div>
            <h1 className="display" style={{ marginBottom: 20 }}>
              A commons, <br />
              not a storefront.
            </h1>
            <p className="lede">
              The visual system for WellSourced, an open-source product discovery engine for ethical
              shopping. Built to feel like trusted public infrastructure: fast, honest, and warm. Convenience
              leads; values follow.
            </p>
          </div>
          <div className="meta">
            <strong>Release</strong> v1.0 &middot; Feb 2026
            <br />
            <strong>Primary</strong> #0D7377 Deep Teal
            <br />
            <strong>Type</strong> Satoshi &middot; DM Serif Display &middot; DM Sans &middot; JetBrains Mono
            <br />
            <strong>Grid</strong> 12 col &middot; 1280 max &middot; 4px base
          </div>
        </header>

        <nav className="toc" aria-label="Table of contents">
          <a href="#brand">01 Brand</a>
          <a href="#color">02 Color</a>
          <a href="#type">03 Type</a>
          <a href="#space">04 Space &amp; Radius</a>
          <a href="#icon">05 Icons</a>
          <a href="#comp">06 Components</a>
          <a href="#form">07 Forms</a>
          <a href="#motion">08 Motion</a>
          <a href="#imagery">09 Imagery</a>
          <a href="#empty">10 Empty States</a>
          <a href="#sample">11 Sample Composition</a>
        </nav>

        {/* ============ 01 BRAND ============ */}
        <section className="section" id="brand">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">01</span>
              <h2 className="h2">Brand</h2>
            </div>
            <p className="hd-desc">
              Grounded organic meets clean modernity. Lowercase wordmark. A single-color mark that reads as a
              &ldquo;w&rdquo; folded into a well: origin, source, enclosed.
            </p>
          </div>

          <div className="brand-grid">
            <div className="brand-card hero">
              <div className="sub-label">Primary lockup &middot; reversed</div>
              <div className="lockup" style={{ color: "#fff" }}>
                <Logomark background="#E6F5F5" />
                <div className="wordmark">
                  <Wordmark />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  fontSize: 12,
                  color: "rgba(230,245,245,0.8)",
                  fontFamily: "'JetBrains Mono', monospace",
                  flexWrap: "wrap",
                }}
              >
                <span>&#9656; w-form &asymp; double valley / source</span>
                <span>&#9656; dot = the origin point</span>
                <span>&#9656; enclosed = c, protected</span>
              </div>
            </div>

            <div className="brand-card">
              <div className="sub-label">Badge, embeddable on brand sites</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                <div className="verified-badge">
                  <svg
                    className="tick"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M20 7 9 18l-5-5" />
                  </svg>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase" }}>
                      Verified on
                    </span>
                    <strong>
                      <Wordmark />
                    </strong>
                  </div>
                </div>
                <div className="verified-badge">
                  <svg
                    className="tick"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase" }}>
                      Find us on
                    </span>
                    <strong>
                      <Wordmark />
                    </strong>
                  </div>
                </div>
              </div>
              <div className="fn">
                Embed as an <code>&lt;iframe&gt;</code> or an <code>&lt;a&gt;</code>. Both include a
                citation link back to the brand profile.
              </div>
            </div>
          </div>

          <div className="logo-row">
            <div className="logo-chip">
              <Logomark background="#0D7377" stroke="#fff" size={40} />
              <div className="cap">mark / primary</div>
            </div>
            <div className="logo-chip dark">
              <Logomark background="#fff" stroke="#1A1A2E" size={40} />
              <div className="cap">mark / mono-light</div>
            </div>
            <div className="logo-chip sand">
              <Logomark showBackground={false} stroke="#1A1A2E" size={40} />
              <div className="cap">mark / flat-mono</div>
            </div>
            <div className="logo-chip teal">
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#fff",
                  letterSpacing: "-0.025em",
                }}
              >
                <Wordmark />
              </div>
              <div className="cap">wordmark / reversed</div>
            </div>
          </div>
        </section>

        {/* ============ 02 COLOR ============ */}
        <section className="section" id="color">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">02</span>
              <h2 className="h2">Color</h2>
            </div>
            <p className="hd-desc">
              Teal as trust anchor; warm sand as the page temperature. Trust tiers use a calibrated gray &rarr;
              blue &rarr; green spectrum that maps to verification depth. Never to emotion.
            </p>
          </div>

          <div className="sub-label">Core palette</div>
          <div className="palette">
            {[
              { hex: "#0D7377", name: "Deep Teal", use: "Primary: CTAs, active links, logo, selected states." },
              { hex: "#E6F5F5", name: "Teal Light", use: "Selected chips, hover bg, subtle highlights." },
              { hex: "#F5F0E8", name: "Warm Sand", use: "Page background, away from Amazon-white." },
              { hex: "#FFFFFF", name: "Pure White", use: "Card surfaces, modals, inputs." },
              { hex: "#1A1A2E", name: "Charcoal", use: "Headings, body copy, primary text." },
              { hex: "#64748B", name: "Slate", use: "Metadata, secondary text, descriptions." },
              { hex: "#F1F5F9", name: "Cloud", use: "Dividers, inactive UI, card borders." },
              { hex: "#ECE4D4", name: "Sand Deep", use: "Accent dividers on sand, subtle chips." },
            ].map((s) => (
              <div key={s.hex} className="swatch">
                <div
                  className="chip"
                  style={{
                    background: s.hex,
                    ...(s.hex === "#FFFFFF" ? { borderBottom: "1px solid #E2E8F0" } : {}),
                  }}
                />
                <div className="meta">
                  <div className="name">{s.name}</div>
                  <div className="hex">{s.hex}</div>
                  <div className="use">{s.use}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sub-label" style={{ marginTop: 40 }}>
            Trust tier, a calibrated spectrum
          </div>
          <div className="trust-grid">
            <div className="trust-swatch">
              <div className="tier-ico t1">
                <Tier1Icon size={22} />
              </div>
              <div className="copy">
                <div className="tag">TIER 1 &middot; #94A3B8</div>
                <div className="title">Self-Reported</div>
                <div className="desc">
                  Submitted by the brand. No third-party check. Treat with healthy skepticism.
                </div>
              </div>
            </div>
            <div className="trust-swatch">
              <div className="tier-ico t2">
                <Tier2Icon size={22} />
              </div>
              <div className="copy">
                <div className="tag">TIER 2 &middot; #3B82F6</div>
                <div className="title">Community Verified</div>
                <div className="desc">
                  A contributor researched this claim and cited sources. Open to review.
                </div>
              </div>
            </div>
            <div className="trust-swatch">
              <div className="tier-ico t3">
                <Tier3Icon size={22} />
              </div>
              <div className="copy">
                <div className="tag">TIER 3 &middot; #22C55E</div>
                <div className="title">Independently Audited</div>
                <div className="desc">
                  Confirmed via third-party certification or public filings. Highest trust.
                </div>
              </div>
            </div>
          </div>

          <div className="sub-label" style={{ marginTop: 40 }}>
            Utility
          </div>
          <div className="palette" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { hex: "#F59E0B", name: "Warning", use: "Conflict-of-interest flags, trust caveats." },
              { hex: "#EF4444", name: "Error", use: "Form errors, out-of-stock, destructive." },
              { hex: "#22C55E", name: "Success", use: "Confirmation, approved edits. Matches Tier 3." },
            ].map((s) => (
              <div key={s.hex} className="swatch">
                <div className="chip" style={{ background: s.hex }} />
                <div className="meta">
                  <div className="name">{s.name}</div>
                  <div className="hex">{s.hex}</div>
                  <div className="use">{s.use}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ 03 TYPE ============ */}
        <section className="section" id="type">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">03</span>
              <h2 className="h2">Typography</h2>
            </div>
            <p className="hd-desc">
              Satoshi for structure; DM Serif Display for emphasis; DM Sans for reading; JetBrains Mono for data.
              A pairing that reads as both modern and institutional.
            </p>
          </div>

          <div className="font-pair-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            <div className="font-card head">
              <div className="role">Display / Heading</div>
              <div className="fname">Satoshi</div>
              <div className="glyphs">Aa Bb Cc &middot; 123</div>
              <div className="weights">
                <span>400 Regular</span>
                <span>500 Medium</span>
                <span>700 Bold</span>
                <span>900 Black</span>
              </div>
            </div>
            <div className="font-card">
              <div className="role">Accent &middot; Emphasis</div>
              <div
                className="fname"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                DM Serif Display
              </div>
              <div
                className="glyphs"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                Aa Bb Cc &middot; 123
              </div>
              <div className="weights">
                <span>400 Regular</span>
                <span>400 Italic</span>
              </div>
            </div>
            <div className="font-card body">
              <div className="role">Body / UI</div>
              <div className="fname">DM Sans</div>
              <div className="glyphs">Aa Bb Cc &middot; 123</div>
              <div className="weights">
                <span>400 Regular</span>
                <span>500 Medium</span>
                <span>600 Semibold</span>
                <span>700 Bold</span>
              </div>
            </div>
            <div className="font-card mono">
              <div className="role">Mono &middot; contributor tools</div>
              <div className="fname">JetBrains Mono</div>
              <div className="glyphs">0O aA &middot; 0xf3a</div>
              <div className="weights">
                <span>400 Regular</span>
                <span>500 Medium</span>
              </div>
            </div>
          </div>

          <div className="sub-label" style={{ marginTop: 32 }}>
            DM Serif Display in use. Pair with Satoshi for editorial emphasis
          </div>
          <div className="comp-card" style={{ padding: "36px 40px" }}>
            <div
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: 44,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
                marginBottom: 24,
              }}
            >
              Find great products from brands{" "}
              <span className="ws-serif" style={{ color: "var(--color-teal)" }}>
                you can trust.
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
                borderTop: "1px solid var(--color-cloud)",
                paddingTop: 24,
              }}
            >
              <div>
                <div className="fn" style={{ marginBottom: 8 }}>
                  PULL-QUOTE &middot; 400 italic
                </div>
                <div
                  className="ws-serif"
                  style={{ fontSize: 24, lineHeight: 1.3, color: "var(--color-ink)" }}
                >
                  &ldquo;A commons, not a storefront.&rdquo;
                </div>
              </div>
              <div>
                <div className="fn" style={{ marginBottom: 8 }}>
                  SECTION EYEBROW &middot; italic inline
                </div>
                <div
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 600,
                    fontSize: 22,
                    lineHeight: 1.35,
                    color: "var(--color-ink)",
                  }}
                >
                  The{" "}
                  <span className="ws-serif" style={{ color: "var(--color-teal)" }}>
                    why
                  </span>{" "}
                  behind every brand.
                </div>
              </div>
              <div>
                <div className="fn" style={{ marginBottom: 8 }}>
                  MANIFESTO LINE &middot; 18px italic
                </div>
                <div
                  className="ws-serif"
                  style={{ fontSize: 19, lineHeight: 1.5, color: "var(--color-slate)" }}
                >
                  We show data, not judgment, and we say so out loud.
                </div>
              </div>
            </div>
            <div className="fn" style={{ marginTop: 20 }}>
              {"// use italic sparingly: headlines, pull-quotes, one emphasized word per passage. never for body, UI labels, or data."}
            </div>
          </div>

          <div className="type-grid">
            <div className="type-row">
              <div className="spec">
                <strong>Display</strong>
                64 / 64 / Black
                <br />
                tracking -3.5%
              </div>
              <div className="font-tag">Satoshi 900</div>
              <div className="sample t-display">Source the good stuff.</div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>H1</strong>
                40 / 44 / Bold
                <br />
                tracking -2%
              </div>
              <div className="font-tag">Satoshi 700</div>
              <div className="sample t-h1">Wireless earbuds from 38 brands</div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>H2</strong>
                32 / 38 / Semibold
                <br />
                tracking -1.5%
              </div>
              <div className="font-tag">Satoshi 600</div>
              <div className="sample t-h2">About this brand</div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>H3</strong>
                24 / 31 / Semibold
              </div>
              <div className="font-tag">Satoshi 600</div>
              <div className="sample t-h3">Ownership &amp; structure</div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>Emphasis</strong>
                inline / italic
                <br />
                tracking -1%
              </div>
              <div className="font-tag">DM Serif 400i</div>
              <div
                className="sample"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 28,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                }}
              >
                brands <span style={{ color: "var(--color-teal)" }}>you can trust</span>
              </div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>Body</strong>
                16 / 25 / Regular
              </div>
              <div className="font-tag">DM Sans 400</div>
              <div className="sample t-body">
                WellSourced is a public tool for finding products from independent brands you can actually
                trust. We don&apos;t take a cut.
              </div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>Small</strong>
                14 / 21 / Regular
              </div>
              <div className="font-tag">DM Sans 400</div>
              <div className="sample t-small">HQ Portland, OR &middot; Founded 2019 &middot; 12 employees</div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>Price</strong>
                20 / 24 / Semibold
              </div>
              <div className="font-tag">DM Sans 600</div>
              <div className="sample t-price">$89.00</div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>Badge label</strong>
                13 / 15 / Medium
                <br />
                uppercase &middot; tracking 8%
              </div>
              <div className="font-tag">DM Sans 500</div>
              <div className="sample t-badge">Community Verified</div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>Button</strong>
                15 / 15 / Medium
              </div>
              <div className="font-tag">DM Sans 500</div>
              <div className="sample t-button">Buy Direct &rarr;</div>
            </div>
            <div className="type-row">
              <div className="spec">
                <strong>Mono</strong>
                14 / 22 / Regular
              </div>
              <div className="font-tag">JetBrains 400</div>
              <div className="sample t-mono">edit#a3f82c &middot; verified 2026-01-18 &middot; 3 sources</div>
            </div>
          </div>
        </section>

        {/* ============ 04 SPACE & RADIUS ============ */}
        <section className="section" id="space">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">04</span>
              <h2 className="h2">Space, Radius &amp; Elevation</h2>
            </div>
            <p className="hd-desc">
              4px base unit. Radii stay friendly but restrained. No pill-everything. Elevation is quiet;
              hover states earn attention.
            </p>
          </div>

          <div className="sys-grid-3">
            <div className="sys-card">
              <h4>Spacing scale &middot; 4px base</h4>
              {[4, 8, 12, 16, 24, 32, 48, 64, 96].map((n) => (
                <div key={n} className="space-row">
                  <span className="label">{n}</span>
                  <div className="bar" style={{ width: n }} />
                </div>
              ))}
            </div>
            <div className="sys-card">
              <h4>Radius scale</h4>
              <div className="radius-row">
                <div className="radius-sample r-sm">8 &middot; inputs, badges</div>
                <div className="radius-sample r-md">12 &middot; cards, buttons</div>
                <div className="radius-sample r-lg">16 &middot; modals, hero</div>
                <div className="radius-sample r-full">&infin; &middot; avatars, pills</div>
              </div>
            </div>
            <div className="sys-card">
              <h4>Elevation</h4>
              <div className="shadow-row">
                <div className="shadow-sample s1">shadow-card &middot; rest</div>
                <div className="shadow-sample s2">shadow-hover &middot; lift</div>
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: "var(--color-slate)", lineHeight: 1.6 }}>
                Cards use either a 1px border <em>or</em> shadow-card. Never both. Hover promotes to
                shadow-hover with a -2px lift.
              </div>
            </div>
          </div>

          <div className="sys-card" style={{ marginTop: 20 }}>
            <h4>Layout grid &middot; 12 col &middot; 1280 max &middot; 24 gutter</h4>
            <div className="grid-cols">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: 24,
                marginTop: 16,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "var(--color-slate)",
                flexWrap: "wrap",
              }}
            >
              <span>
                <strong style={{ color: "var(--color-ink)" }}>Desktop</strong> &ge;1024 &middot; 12 col &middot;
                4 product cards/row
              </span>
              <span>
                <strong style={{ color: "var(--color-ink)" }}>Tablet</strong> 768&ndash;1023 &middot; 8 col
                &middot; 3 cards/row
              </span>
              <span>
                <strong style={{ color: "var(--color-ink)" }}>Mobile</strong> &lt;768 &middot; 1 col &middot; 2
                cards/row
              </span>
            </div>
          </div>
        </section>

        {/* ============ 05 ICONS ============ */}
        <section className="section" id="icon">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">05</span>
              <h2 className="h2">Iconography</h2>
            </div>
            <p className="hd-desc">
              Line icons, 1.75px stroke, rounded caps. Lucide as the base set. Custom marks only where semantics
              demand it: trust tiers, ownership types, the Buy Direct arrow.
            </p>
          </div>

          <div className="icon-grid">
            <IconCell name="search">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </IconCell>
            <IconCell name="browse">
              <rect x="4" y="4" width="7" height="7" rx="1.5" />
              <rect x="13" y="4" width="7" height="7" rx="1.5" />
              <rect x="4" y="13" width="7" height="7" rx="1.5" />
              <rect x="13" y="13" width="7" height="7" rx="1.5" />
            </IconCell>
            <IconCell name="filter">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </IconCell>
            <IconCell name="sort">
              <path d="M3 7h18M3 12h18M3 17h18" />
            </IconCell>
            <IconCell name="tier-1" color="var(--color-t1)">
              <circle cx="12" cy="12" r="9" />
            </IconCell>
            <IconCell name="tier-2" color="var(--color-t2)">
              <path d="M12 3 4 6v6c0 4.5 3.3 8.5 8 9 4.7-.5 8-4.5 8-9V6l-8-3z" />
              <path d="m9 12 2 2 4-4" />
            </IconCell>
            <IconCell name="tier-3" color="var(--color-t3)">
              <path d="M12 3 4 6v6c0 4.5 3.3 8.5 8 9 4.7-.5 8-4.5 8-9V6l-8-3z" />
              <path d="m12 8 1.6 3.2L17 12l-2.5 2.3.6 3.4L12 16l-3.1 1.7.6-3.4L7 12l3.4-.8L12 8z" />
            </IconCell>
            <IconCell name="buy-direct" color="var(--color-teal)">
              <path d="M7 17 17 7" />
              <path d="M9 7h8v8" />
            </IconCell>
            <IconCell name="indie">
              <circle cx="12" cy="8" r="3" />
              <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" />
            </IconCell>
            <IconCell name="worker-owned">
              <circle cx="9" cy="9" r="2.5" />
              <circle cx="15" cy="9" r="2.5" />
              <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5M14 19c0-2.5 2-4.5 4.5-4.5S23 16.5 23 19" />
            </IconCell>
            <IconCell name="co-op">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18M3 12h18" />
            </IconCell>
            <IconCell name="b-corp">
              <path d="M6 6h9a4 4 0 0 1 0 8H6zM6 14h11a4 4 0 0 1 0 8H6z" />
            </IconCell>
            <IconCell name="certified">
              <path d="m4 14 6 6L20 8" />
              <path d="m4 8 4 4" />
            </IconCell>
            <IconCell name="suggest-edit">
              <path d="M14 4 4 14v6h6L20 10z" />
              <path d="m14 4 6 6" />
            </IconCell>
            <IconCell name="source-cite">
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </IconCell>
            <IconCell name="recent">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4l3 2" />
            </IconCell>
          </div>
        </section>

        {/* ============ 06 COMPONENTS ============ */}
        <section className="section" id="comp">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">06</span>
              <h2 className="h2">Components</h2>
            </div>
            <p className="hd-desc">
              Ten components, each with required states. Built in this order because this is the order
              they&rsquo;ll be used in anger: nav, search, chips, then product cards.
            </p>
          </div>

          {/* Navigation Bar */}
          <div className="comp-card" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>6.1 Navigation Bar</h3>
              <span className="meta">sticky &middot; 64px &middot; collapses on mobile</span>
            </div>
            <div className="nav">
              <div className="mark-lock">
                <Logomark background="#0D7377" bgRadius={10} stroke="#fff" size={28} />
                <div className="wm">
                  <Wordmark />
                </div>
              </div>
              <div className="divider" />
              <div className="search sm" style={{ maxWidth: 360 }}>
                <span className="ic">
                  <SearchIcon />
                </span>
                <input type="text" placeholder="Search products, brands…" />
                <span className="kbd">&#8984;K</span>
              </div>
              <div className="spacer" />
              <div className="links">
                <a className="link" href="#">
                  Browse Brands
                </a>
                <a className="link" href="#">
                  Submit a Brand
                </a>
                <a className="link" href="#">
                  About
                </a>
                <div className="divider" />
                <a className="link" href="#" style={{ color: "var(--color-slate)" }}>
                  Contribute
                </a>
                <button type="button" className="btn btn-secondary" style={{ height: 36, padding: "0 14px" }}>
                  Sign In
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="comp-card" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>6.2 Buttons</h3>
              <span className="meta">44px &middot; 12px radius &middot; 150ms ease-out</span>
            </div>
            <div className="states-row">
              <span className="state-label">Primary</span>
              <button type="button" className="btn btn-primary">
                Buy Direct
                <svg
                  className="arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </button>
              <button type="button" className="btn btn-primary is-active">
                Active / pressed
              </button>
              <button type="button" className="btn btn-loading">
                Submitting <span className="spinner" />
              </button>
              <button type="button" className="btn btn-disabled" disabled>
                Disabled
              </button>
            </div>
            <div className="states-row">
              <span className="state-label">Secondary</span>
              <button type="button" className="btn btn-secondary">
                Visit Store
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ background: "var(--color-teal-light)" }}
              >
                Hovered
              </button>
              <button type="button" className="btn btn-secondary">
                <EditIcon />
                Suggest an Edit
              </button>
            </div>
            <div className="states-row">
              <span className="state-label">Ghost</span>
              <button type="button" className="btn btn-ghost">
                View sources
              </button>
              <button type="button" className="btn btn-ghost">
                Show 12 more &rarr;
              </button>
              <button type="button" className="btn btn-ghost" style={{ color: "var(--color-slate)" }}>
                Cancel
              </button>
            </div>
            <div className="states-row" style={{ marginBottom: 0 }}>
              <span className="state-label">Destructive</span>
              <button type="button" className="btn btn-destructive">
                Remove claim
              </button>
              <span className="fn">Used in contributor tools only. Never in shopper-facing flows.</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="comp-card" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>6.3 Search Bar</h3>
              <span className="meta">landing &middot; 56px &middot; results &middot; 40px</span>
            </div>
            <div className="sub-label">Landing, default</div>
            <div className="search lg" style={{ marginBottom: 16 }}>
              <span className="ic">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search for products, brands, or try ‘birthday gift under $50’"
              />
              <span className="kbd">Enter &crarr;</span>
            </div>
            <div className="sub-label">Landing, focused with active query</div>
            <div className="search lg is-focus" style={{ marginBottom: 16 }}>
              <span className="ic" style={{ color: "var(--color-teal)" }}>
                <SearchIcon />
              </span>
              <input type="text" defaultValue="wireless earbuds" />
              <button type="button" className="clear" aria-label="Clear">
                <ClearIcon />
              </button>
            </div>
            <div className="sub-label">Results, compact in header</div>
            <div className="search sm">
              <span className="ic">
                <SearchIcon />
              </span>
              <input type="text" defaultValue="organic dog treats" />
              <button type="button" className="clear" aria-label="Clear">
                <ClearIcon />
              </button>
            </div>
          </div>

          {/* Filter chips */}
          <div className="comp-card" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>6.4 Filter Chips</h3>
              <span className="meta">34px &middot; full radius &middot; horizontal scroll on mobile</span>
            </div>
            <div className="sub-label">Inactive</div>
            <div className="chip-row" style={{ marginBottom: 20 }}>
              {["Category", "Price Range", "Ownership", "Certifications", "Min. Trust Tier"].map((label) => (
                <button key={label} type="button" className="chip">
                  {label} <CaretDown />
                </button>
              ))}
            </div>
            <div className="sub-label">Active + sort</div>
            <div className="chip-row">
              {["Under $100", "Worker-owned", "Tier 2+"].map((label) => (
                <button key={label} type="button" className="chip is-active">
                  {label}{" "}
                  <span className="x">
                    <ClearIcon />
                  </span>
                </button>
              ))}
              <button type="button" className="btn btn-ghost" style={{ height: 34 }}>
                Clear all
              </button>
              <div style={{ flex: 1 }} />
              <button type="button" className="chip sort">
                Sort: Relevance <CaretDown />
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="comp-card" id="trust" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>6.5 Trust Tier Badges</h3>
              <span className="meta">inline with brand &middot; tooltip on hover or focus</span>
            </div>
            <div className="states-row">
              <span className="state-label">Badges</span>
              <span className="tb t1">
                <Tier1Icon />
                Self-Reported
              </span>
              <span className="tb t2">
                <Tier2Icon />
                Community Verified
              </span>
              <span className="tb t3">
                <Tier3Icon />
                Independently Audited
              </span>
            </div>
            <hr className="div" />
            <div className="sub-label">Tooltip, on hover/focus</div>
            <div
              style={{
                padding: "80px 40px 20px",
                position: "relative",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div className="tooltip-demo">
                <span className="tb t2">
                  <Tier2Icon />
                  Community Verified
                </span>
                <div className="tooltip" role="tooltip">
                  <strong>Community-verified</strong>
                  A contributor researched this claim and cited 3 sources. Last reviewed Jan 18, 2026.
                  <a href="#">View sources &rarr;</a>
                </div>
              </div>
            </div>
          </div>

          {/* Product card */}
          <div className="comp-card" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>6.6 Product Card</h3>
              <span className="meta">default &middot; hover &middot; loading &middot; 4 per row on desktop</span>
            </div>
            <div className="product-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {/* Default */}
              <div className="product">
                <div className="img">
                  <div className="ph-art" />
                  <div className="placeholder" style={{ position: "relative", zIndex: 2 }}>
                    product shot &middot; 1:1
                  </div>
                  <button type="button" className="bookmark" aria-label="Save">
                    <BookmarkIcon />
                  </button>
                </div>
                <div className="body-p">
                  <div className="name">Nomad Low-Latency Earbuds</div>
                  <div className="price-row">
                    <span className="price">$89.00</span>
                  </div>
                  <div className="mid">
                    <span className="brand">
                      <a href="#">Signal &amp; Drift</a>
                    </span>
                    <span className="tb t2">
                      <Tier2Icon />
                      Verified
                    </span>
                  </div>
                </div>
                <div className="foot">
                  <a className="btn-buy" href="#">
                    Buy Direct <BuyDirectIcon />
                  </a>
                  <span className="meta">state &middot; default</span>
                </div>
              </div>
              {/* Hover */}
              <div className="product is-hover">
                <div className="img">
                  <div className="ph-art" />
                  <div className="placeholder" style={{ position: "relative", zIndex: 2 }}>
                    product shot &middot; 1:1
                  </div>
                  <button
                    type="button"
                    className="bookmark"
                    aria-label="Save"
                    style={{ color: "var(--color-teal)" }}
                  >
                    <BookmarkIcon filled />
                  </button>
                </div>
                <div className="body-p">
                  <div className="name">Kestrel All-Day Runner</div>
                  <div className="price-row">
                    <span className="price">$128.00</span>
                  </div>
                  <div className="mid">
                    <span className="brand">
                      <a href="#">Orrery Goods</a>
                    </span>
                    <span className="tb t3">
                      <Tier3Icon />
                      Audited
                    </span>
                  </div>
                </div>
                <div className="foot">
                  <a className="btn-buy" href="#" style={{ color: "var(--color-teal-700)" }}>
                    Buy Direct
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transform: "translateX(2px)" }}
                      aria-hidden
                    >
                      <path d="M7 17 17 7" />
                      <path d="M9 7h8v8" />
                    </svg>
                  </a>
                  <span className="meta">state &middot; hover</span>
                </div>
              </div>
              {/* Loading skeleton */}
              <div className="product loading">
                <div className="img" />
                <div className="body-p">
                  <div className="sk sk-line" style={{ width: "80%" }} />
                  <div className="sk sk-line" style={{ width: "30%", height: 18 }} />
                  <div className="mid">
                    <div className="sk sk-line" style={{ width: "40%" }} />
                    <div className="sk sk-line" style={{ width: 70, height: 20, borderRadius: 10 }} />
                  </div>
                </div>
                <div className="foot">
                  <div className="sk sk-line" style={{ width: 90, height: 14 }} />
                  <span className="meta">state &middot; loading</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brand profile header */}
          <div className="comp-card" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>6.7 Brand Profile Header</h3>
              <span className="meta">/brand/[slug] &middot; trust data summary per field</span>
            </div>
            <div className="bp">
              <div className="logo-slot">sd</div>
              <div className="h-col">
                <div className="title-row">
                  <h1>Signal &amp; Drift</h1>
                  <span className="ownership">
                    <WorkerOwnedIcon /> Worker-Owned
                  </span>
                </div>
                <p className="tagline">
                  Audio gear built for long walks and long attention. Designed and assembled in Portland, OR;
                  repairable by default.
                </p>
                <div className="stat-row">
                  <div className="stat">
                    <div className="lbl">Price Range</div>
                    <div className="val">$49 &ndash; $289</div>
                  </div>
                  <div className="stat">
                    <div className="lbl">HQ</div>
                    <div className="val">Portland, OR &middot; USA</div>
                  </div>
                  <div className="stat">
                    <div className="lbl">Categories</div>
                    <div className="val">Audio &middot; Electronics</div>
                  </div>
                  <div className="stat">
                    <div className="lbl">Founded</div>
                    <div className="val">2019</div>
                  </div>
                </div>
                <div className="trust-summary">
                  <div className="trust-row">
                    <span className="field">Ownership structure</span>
                    <span className="tb t3">
                      <Tier3Icon />
                      Audited
                    </span>
                  </div>
                  <div className="trust-row">
                    <span className="field">Certifications (B Corp, Fair Trade)</span>
                    <span className="tb t3">
                      <Tier3Icon />
                      Audited
                    </span>
                  </div>
                  <div className="trust-row">
                    <span className="field">Worker conditions</span>
                    <span className="tb t2">
                      <Tier2Icon />
                      Verified
                    </span>
                  </div>
                  <div className="trust-row">
                    <span className="field">Manufacturing locations</span>
                    <span className="tb t1">
                      <Tier1Icon />
                      Self-Reported
                    </span>
                  </div>
                </div>
              </div>
              <div className="cta-col">
                <button type="button" className="btn btn-primary">
                  Visit Store <BuyDirectIcon />
                </button>
                <button type="button" className="btn btn-ghost">
                  <EditIcon />
                  Suggest an Edit
                </button>
                <div className="fn" style={{ textAlign: "right" }}>
                  last updated 2026-01-18
                </div>
              </div>
            </div>
          </div>

          {/* Category cards */}
          <div className="comp-card" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>6.8 Category Cards</h3>
              <span className="meta">landing, browse entry point</span>
            </div>
            <div className="cat-grid">
              <CategoryCard name="Kitchen" count="342 products">
                <path d="M5 8h14l-1 12H6z" />
                <path d="M9 8V5a3 3 0 0 1 6 0v3" />
              </CategoryCard>
              <CategoryCard name="Clothing" count="618 products">
                <path d="M5 6h3l1-2h6l1 2h3v4l-3 1v9H8v-9l-3-1z" />
              </CategoryCard>
              <CategoryCard name="Beauty" count="204 products">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
              </CategoryCard>
              <CategoryCard name="Home" count="489 products">
                <path d="m3 11 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M10 22V14h4v8" />
              </CategoryCard>
              <CategoryCard name="Pet" count="173 products">
                <circle cx="6" cy="8" r="2" />
                <circle cx="18" cy="8" r="2" />
                <circle cx="12" cy="6" r="2" />
                <path d="M12 10c-3 0-6 2-6 5s2 4 3 4h6c1 0 3-1 3-4s-3-5-6-5z" />
              </CategoryCard>
              <CategoryCard name="Outdoors" count="256 products">
                <path d="m3 20 6-10 5 6 3-4 4 8z" />
                <circle cx="8" cy="7" r="2" />
              </CategoryCard>
              <CategoryCard name="Electronics" count="148 products">
                <rect x="3" y="5" width="18" height="12" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </CategoryCard>
              <CategoryCard name="Kids" count="212 products">
                <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
                <circle cx="12" cy="9" r="4" />
              </CategoryCard>
              <CategoryCard name="Food & Drink" count="391 products">
                <path d="M8 4h8v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
                <path d="M12 12v8M8 20h8" />
              </CategoryCard>
              <CategoryCard name="Office" count="97 products">
                <rect x="4" y="6" width="16" height="12" rx="1" />
                <path d="M9 10h6M9 14h4" />
              </CategoryCard>
            </div>
          </div>
        </section>

        {/* ============ 07 FORMS ============ */}
        <section className="section" id="form">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">07</span>
              <h2 className="h2">Form Elements</h2>
            </div>
            <p className="hd-desc">
              Clean, restrained. Teal focus glow signals a live field. Errors help, never shame: helper text
              should tell you what to do next.
            </p>
          </div>

          <div className="comp-card">
            <div className="form-grid">
              <div className="field">
                <label htmlFor="bn">Brand name</label>
                <input
                  id="bn"
                  className="input"
                  placeholder="e.g. Signal & Drift"
                  defaultValue="Signal & Drift"
                />
                <span className="help">The public brand name as customers know it.</span>
              </div>
              <div className="field">
                <label htmlFor="sd">Shopify storefront domain</label>
                <input id="sd" className="input" placeholder="yourbrand.myshopify.com" />
                <span className="help">We&apos;ll use this to fetch your product catalog.</span>
              </div>
              <div className="field">
                <label htmlFor="os">Ownership structure</label>
                <select id="os" className="select" defaultValue="Worker-owned">
                  <option>Worker-owned</option>
                  <option>Independent / founder-owned</option>
                  <option>Cooperative</option>
                  <option>B Corp certified</option>
                  <option>Employee stock ownership plan (ESOP)</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="tok">Storefront API token</label>
                <input id="tok" className="input is-error" defaultValue="shpat_0000…" />
                <span className="err-msg">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                  Token looks invalid. It should start with <code>shpat_</code> and be 38 chars.
                </span>
              </div>
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="desc">Short description</label>
                <textarea
                  id="desc"
                  className="textarea"
                  placeholder="One or two sentences. What do you make, and what makes it worth finding?"
                  defaultValue="Audio gear built for long walks and long attention. Designed and assembled in Portland, OR."
                />
                <span className="help">Plain language. No marketing superlatives. 240 char max.</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
              <button type="button" className="btn btn-ghost">
                Save draft
              </button>
              <button type="button" className="btn btn-primary">
                Submit for review
              </button>
            </div>
          </div>
        </section>

        {/* ============ 08 MOTION ============ */}
        <section className="section" id="motion">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">08</span>
              <h2 className="h2">Motion</h2>
            </div>
            <p className="hd-desc">
              Motion is structural, never decorative. We move things to confirm an action, surface a state, or
              hand off focus. Nothing swoops, nothing bounces. A shopper should never wait on an
              animation to complete.
            </p>
          </div>

          {/* Principles */}
          <div className="comp" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>8.1 Principles</h3>
              <span className="meta">four rules, in order of priority</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <MotionPrinciple num="01" name="HONEST" title="Motion reflects real state.">
                A spinner means we&apos;re actually fetching. A pulse means data is live. We never animate to
                imply speed we don&apos;t have.
              </MotionPrinciple>
              <MotionPrinciple num="02" name="FAST" title="Under 250ms, almost always.">
                Shoppers click. Long animations feel like lag. If it can&apos;t be 250ms, it probably
                shouldn&apos;t animate.
              </MotionPrinciple>
              <MotionPrinciple num="03" name="QUIET" title="No bounce, no overshoot.">
                We use <code>cubic-bezier(.2,.7,.3,1)</code> for everything. No spring, no elastic. This
                is research infrastructure, not a game.
              </MotionPrinciple>
              <MotionPrinciple num="04" name="RESPECTFUL" title="Respects reduced-motion.">
                Every transition is gated by <code>prefers-reduced-motion</code>. No exceptions.
              </MotionPrinciple>
            </div>
          </div>

          {/* Duration scale */}
          <div className="comp" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>8.2 Duration scale</h3>
              <span className="meta">five timings: use these, don&apos;t invent new ones</span>
            </div>
            <div className="comp-card" style={{ padding: "28px 32px" }}>
              <MotionScale />
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: "1px solid var(--color-cloud)",
                }}
                className="fn"
              >
                {"// anything above 320ms is reserved for skeleton loaders and data-streaming states"}
              </div>
            </div>
          </div>

          {/* Easing curves */}
          <div className="comp" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>8.3 Easing</h3>
              <span className="meta">one curve, two edge cases</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <EasingCard
                d="M 0 120 C 24 36, 36 0, 120 0"
                stroke="#0D7377"
                name={
                  <>
                    Standard,{" "}
                    <em
                      style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "var(--color-teal)",
                      }}
                    >
                      default for everything
                    </em>
                  </>
                }
                code="cubic-bezier(.2, .7, .3, 1)"
                use="Confident entrance, quiet settle. Use for hover, fade, lift, slide. 99% of motion."
              />
              <EasingCard
                d="M 0 120 C 48 120, 96 0, 120 0"
                stroke="#64748B"
                name="Symmetrical"
                code="cubic-bezier(.4, 0, .2, 1)"
                use="Content shifts that need to feel neutral: accordion open, skeleton pulse. No directional bias."
              />
              <EasingCard
                d="M 0 120 C 72 120, 48 0, 120 0"
                stroke="#64748B"
                name="Exit"
                code="cubic-bezier(.4, 0, 1, 1)"
                use="For things leaving the screen: modal close, toast dismiss. Faster start, no lingering."
              />
            </div>
            <div className="fn" style={{ marginTop: 16 }}>
              {"// NEVER use spring, elastic, or back-out. Bouncy motion reads as toy-like. We are a commons."}
            </div>
          </div>

          {/* Patterns */}
          <div className="comp" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>8.4 Patterns</h3>
              <span className="meta">interact with each: hover, click, wait</span>
            </div>
            <div className="motion-grid">
              {/* Hover lift */}
              <div className="m-demo">
                <div className="m-stage">
                  <div className="m-card hover-lift">
                    <div className="m-thumb" />
                    <div className="m-name">Acoustic Model 02</div>
                    <div className="m-price">$189</div>
                  </div>
                </div>
                <div className="m-caption">
                  <div className="m-title">Hover lift</div>
                  <div className="m-desc">Card rises 2px, shadow deepens. Signals &ldquo;clickable.&rdquo;</div>
                  <div className="m-spec">
                    <span>transform &middot; box-shadow</span>
                    <span className="tok">200ms standard</span>
                  </div>
                </div>
              </div>

              {/* Arrow nudge */}
              <div className="m-demo">
                <div className="m-stage">
                  <button type="button" className="m-btn arrow-nudge">
                    <span>Buy Direct</span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden
                    >
                      <path d="M4 8h8M9 4l4 4-4 4" />
                    </svg>
                  </button>
                </div>
                <div className="m-caption">
                  <div className="m-title">Arrow nudge</div>
                  <div className="m-desc">Arrow slides 2px right on hover. Direction-of-travel cue.</div>
                  <div className="m-spec">
                    <span>translateX(2px)</span>
                    <span className="tok">150ms micro</span>
                  </div>
                </div>
              </div>

              {/* Chip toggle */}
              <div className="m-demo">
                <div className="m-stage" style={{ flexWrap: "wrap", gap: 8, padding: "28px 20px" }}>
                  <MotionChip>Indie-owned</MotionChip>
                  <MotionChip defaultActive>Under $50</MotionChip>
                  <MotionChip>Tier 2+</MotionChip>
                </div>
                <div className="m-caption">
                  <div className="m-title">Filter chip toggle</div>
                  <div className="m-desc">Background, border, and text color fade together. No pop.</div>
                  <div className="m-spec">
                    <span>background &middot; border &middot; color</span>
                    <span className="tok">150ms micro</span>
                  </div>
                </div>
              </div>

              {/* Skeleton pulse */}
              <div className="m-demo">
                <div className="m-stage" style={{ flexDirection: "column", gap: 10, padding: 24 }}>
                  <div className="m-skel" style={{ height: 90, width: "100%", borderRadius: 8 }} />
                  <div className="m-skel" style={{ height: 12, width: "80%", borderRadius: 4 }} />
                  <div className="m-skel" style={{ height: 12, width: "55%", borderRadius: 4 }} />
                </div>
                <div className="m-caption">
                  <div className="m-title">Skeleton pulse</div>
                  <div className="m-desc">
                    Background fades between two neutrals. Honest loading. Only shown when we&apos;re
                    actually fetching.
                  </div>
                  <div className="m-spec">
                    <span>background opacity</span>
                    <span className="tok">1400ms symmetric</span>
                  </div>
                </div>
              </div>

              {/* Trust tooltip */}
              <div className="m-demo">
                <div className="m-stage">
                  <div className="m-tooltip-wrap">
                    <div className="m-tier-pill">
                      <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden
                      >
                        <path d="M7 1l5 2v4c0 3-2.2 5.3-5 6-2.8-.7-5-3-5-6V3l5-2z" />
                        <path d="M4.5 7l2 2 3-3.5" />
                      </svg>
                      <span>Community Verified</span>
                    </div>
                    <div className="m-tooltip">
                      A contributor researched this claim and cited sources. Hover to open
                    </div>
                  </div>
                </div>
                <div className="m-caption">
                  <div className="m-title">Tooltip popover</div>
                  <div className="m-desc">Fades in + translates down 4px. Closes on mouseleave.</div>
                  <div className="m-spec">
                    <span>opacity &middot; translateY</span>
                    <span className="tok">240ms medium</span>
                  </div>
                </div>
              </div>

              {/* Staggered results */}
              <div className="m-demo">
                <MotionStagger />
                <div className="m-caption">
                  <div className="m-title">Staggered results entrance</div>
                  <div className="m-desc">
                    Results fade up with a 40ms stagger. Max 8 items animate. The rest appear instantly.
                  </div>
                  <div className="m-spec">
                    <span>opacity &middot; translateY(6px)</span>
                    <span className="tok">200ms standard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Don't */}
          <div className="comp">
            <div className="comp-hd">
              <h3>8.5 Don&apos;t</h3>
              <span className="meta">anti-patterns</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <DontCard title="Parallax on scroll">
                Implies marketing. We&apos;re a product search engine, not a landing page.
              </DontCard>
              <DontCard title="Number count-ups">
                &ldquo;1,247 brands&rdquo; appearing slowly reads as fake. Just show the number.
              </DontCard>
              <DontCard title="Bouncy springs">
                Undermines the institutional tone. Leave overshoot to consumer apps.
              </DontCard>
              <DontCard title="Decorative loops">
                Animated backgrounds, floating shapes, gradient pulses. All out. Motion means something
                happened.
              </DontCard>
            </div>
          </div>
        </section>

        {/* ============ 09 IMAGERY ============ */}
        <section className="section" id="imagery">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">09</span>
              <h2 className="h2">Imagery</h2>
            </div>
            <p className="hd-desc">
              Imagery must earn its place. Product shots do the job, brand photography provides context, and
              everything else (stock illustrations of handshakes, planet icons, smiling families)
              is out. If an image doesn&apos;t tell the user something they can&apos;t read, delete
              it.
            </p>
          </div>

          {/* Principles */}
          <div className="comp" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>9.1 Principles</h3>
              <span className="meta">four rules: every image is evaluated against these</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <MotionPrinciple num="01" name="USEFUL" title="Shows the product.">
                The shopper is scanning. Product-on-background wins every time over lifestyle context.
              </MotionPrinciple>
              <MotionPrinciple num="02" name="SOURCED" title="From the brand itself.">
                Fetched from the brand&apos;s Shopify. Never stock photos, never AI-generated. Real or nothing.
              </MotionPrinciple>
              <MotionPrinciple num="03" name="CREDITED" title="Attribution visible.">
                Every non-product photo names the photographer or source. No anonymous imagery on a transparency
                platform.
              </MotionPrinciple>
              <MotionPrinciple num="04" name="HUMAN, NOT HAPPY" title="Documentary, not marketing.">
                When we show makers or facilities, show work. Hands, workshops, process. No cheerful founder
                portraits.
              </MotionPrinciple>
            </div>
          </div>

          {/* Image categories */}
          <div className="comp" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>9.2 Image categories</h3>
              <span className="meta">five types: each has its own treatment</span>
            </div>
            <div className="img-cat-grid">
              <ImageCategory
                phClass="ph ph-product"
                label="PRODUCT SHOT · 1:1 · 1200px"
                name="01 · Product"
                use="Used in: search cards, brand profile galleries, category browse."
                rules={[
                  ["good", "Square crop, product centered, 15% padding min"],
                  ["good", "Plain background or consistent brand treatment"],
                  ["bad", "No overlay text, no “SALE” stickers, no lifestyle clutter"],
                ]}
              />
              <ImageCategory
                phClass="ph ph-maker"
                label="MAKER PORTRAIT · 4:5 · documentary"
                name="02 · Maker & workshop"
                use="Used in: brand profile header, ownership sections, contributor evidence."
                rules={[
                  ["good", "Working portraits: hands, tools, process"],
                  ["good", "Natural light, minimal color grading"],
                  ["bad", "No staged smiles, no corporate headshots"],
                ]}
              />
              <ImageCategory
                phClass="ph ph-doc"
                label="DOCUMENT SCAN · 16:10 · cropped"
                name="03 · Document & evidence"
                use="Used in: trust tier sources, audit trail, verification receipts."
                rules={[
                  ["good", "Real scans: B Corp certificates, SEC filings, cooperative bylaws"],
                  ["good", "8px corners, subtle shadow, always with source URL"],
                  ["bad", "No mocked-up documents, no stock “paperwork” photos"],
                ]}
              />
              <ImageCategory
                phClass="ph ph-place"
                label="PLACE · 16:9 · workshop / origin"
                name="04 · Place of origin"
                use="Used in: HQ location cards, manufacturing context, transparency sections."
                rules={[
                  ["good", "Wide establishing shots: the actual factory, farm, or studio"],
                  ["good", "Include geographic context (map pin, region label)"],
                  ["bad", "No generic city skylines, no stock “factory” photos"],
                ]}
              />
              <div className="img-cat">
                <div className="img-demo">
                  <div className="ph-card" style={{ padding: 20 }}>
                    <div className="logomark-preview">
                      <div className="lm">
                        <svg
                          viewBox="0 0 40 40"
                          fill="none"
                          stroke="#1A1A2E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M8 14l4 12 4-8 4 8 4-12" />
                          <circle cx="30" cy="14" r="2" />
                        </svg>
                      </div>
                      <div className="lm">
                        <svg viewBox="0 0 40 40" fill="#1A1A2E" aria-hidden>
                          <rect x="8" y="8" width="24" height="24" rx="4" />
                          <path d="M20 14l-4 12M24 14l-4 12" stroke="#F5F0E8" strokeWidth="1.5" />
                        </svg>
                      </div>
                      <div className="lm">
                        <svg
                          viewBox="0 0 40 40"
                          fill="none"
                          stroke="#1A1A2E"
                          strokeWidth="1.8"
                          aria-hidden
                        >
                          <circle cx="20" cy="20" r="12" />
                          <path d="M20 8v24M8 20h24" />
                        </svg>
                      </div>
                    </div>
                    <span className="ph-label ph-label-below">BRAND LOGOMARK &middot; 1:1 &middot; SVG preferred</span>
                  </div>
                </div>
                <div className="img-cat-body">
                  <div className="img-cat-name">05 &middot; Brand logomark</div>
                  <div className="img-cat-use">
                    Used in: product cards, brand profile headers, search autocomplete.
                  </div>
                  <ul className="img-rules">
                    <li>
                      <span className="good">&#10003;</span> SVG where possible, PNG with transparent background
                      as fallback
                    </li>
                    <li>
                      <span className="good">&#10003;</span> Sits on white. Never on warm sand, never on
                      teal
                    </li>
                    <li>
                      <span className="bad">&#10007;</span> No cropping wordmarks, no recoloring brand assets
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment specs */}
          <div className="comp" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>9.3 Treatment</h3>
              <span className="meta">ratios, corners, color handling</span>
            </div>
            <div className="comp-card" style={{ padding: "28px 32px" }}>
              <div className="treat-grid">
                <div className="treat-row">
                  <div className="treat-label">Aspect ratios</div>
                  <div className="treat-items">
                    <TreatRatio w={60} h={60} label="1:1" sub="Product, logo" />
                    <TreatRatio w={48} h={60} label="4:5" sub="Maker portrait" />
                    <TreatRatio w={68} h={50} label="16:10" sub="Document, hero" />
                    <TreatRatio w={72} h={40} label="16:9" sub="Place, video" />
                  </div>
                </div>

                <div className="treat-row">
                  <div className="treat-label">Corner radius</div>
                  <div className="treat-items">
                    <TreatCorner radius="8px" label="8px" sub="Evidence, docs" />
                    <TreatCorner radius="12px" label="12px" sub="Product cards (default)" />
                    <TreatCorner radius="16px" label="16px" sub="Hero, full-bleed" />
                    <TreatCorner radius="9999px" label="Full" sub="Contributor avatars only" />
                  </div>
                </div>

                <div className="treat-row">
                  <div className="treat-label">Color handling</div>
                  <div className="treat-items">
                    <div className="treat-item">
                      <div className="cb cb-1" />
                      <div className="ratio-meta">
                        <strong>Natural</strong>
                        <span>Default, shoot as-is</span>
                      </div>
                    </div>
                    <div className="treat-item">
                      <div className="cb cb-2" />
                      <div className="ratio-meta">
                        <strong>Warm tint</strong>
                        <span>Brand photography only</span>
                      </div>
                    </div>
                    <div className="treat-item">
                      <div className="cb cb-3" />
                      <div className="ratio-meta">
                        <strong>Duotone</strong>
                        <span>Never, implies styling</span>
                      </div>
                    </div>
                    <div className="treat-item">
                      <div className="cb cb-4" />
                      <div className="ratio-meta">
                        <strong>B&amp;W</strong>
                        <span>Historical context only</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="treat-row">
                  <div className="treat-label">File &amp; loading</div>
                  <div className="treat-items treat-specs">
                    <div className="spec">
                      <span className="k">Format</span>
                      <span className="v">WebP + AVIF; JPG fallback</span>
                    </div>
                    <div className="spec">
                      <span className="k">Max file size</span>
                      <span className="v">200KB product &middot; 400KB hero</span>
                    </div>
                    <div className="spec">
                      <span className="k">Resolution</span>
                      <span className="v">2&times; for retina; max 2400px</span>
                    </div>
                    <div className="spec">
                      <span className="k">Loading</span>
                      <span className="v">
                        loading=&quot;lazy&quot; below fold
                      </span>
                    </div>
                    <div className="spec">
                      <span className="k">Alt text</span>
                      <span className="v">Required. Describes product, not brand.</span>
                    </div>
                    <div className="spec">
                      <span className="k">Placeholder</span>
                      <span className="v">Warm sand skeleton with subtle pulse</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Do / Don't gallery */}
          <div className="comp" style={{ marginBottom: 24 }}>
            <div className="comp-hd">
              <h3>9.4 Do &amp; Don&apos;t</h3>
              <span className="meta">the calibration check</span>
            </div>
            <div className="dodont-grid">
              <DoDont kind="do" phClass="ph ph-do-1" label="Product-on-white · edges breathing">
                Clean, centered, product speaks for itself. Shopper&apos;s eye lands on the object.
              </DoDont>
              <DoDont
                kind="dont"
                phClass="ph ph-dont-1"
                label="Sale stickers · lifestyle clutter"
                badgeChild={<div className="fake-sale">35% OFF</div>}
              >
                Overlays imply a marketplace. We link out. Pricing lives on the brand&apos;s store.
              </DoDont>
              <DoDont kind="do" phClass="ph ph-do-2" label="Hands at work · natural light">
                Process over person. What they make is more interesting than how they smile.
              </DoDont>
              <DoDont kind="dont" phClass="ph ph-dont-2" label="Stock founder portrait · crossed arms">
                Pose photography reads as PR. We are not the brand&apos;s agency.
              </DoDont>
              <DoDont kind="do" phClass="ph ph-do-3" label="Scanned B Corp certificate · with URL">
                Real evidence. Source visible. Contributor name attached.
              </DoDont>
              <DoDont
                kind="dont"
                phClass="ph ph-dont-3"
                label="Generic leaves, handshakes, globes"
                badgeChild={<div className="fake-leaf">&#127807;</div>}
              >
                Sustainability clip art is the greenwashing tell. The data earns trust, not the icon.
              </DoDont>
            </div>
          </div>

          {/* Placeholders */}
          <div className="comp">
            <div className="comp-hd">
              <h3>9.5 Missing imagery</h3>
              <span className="meta">placeholder, not a default image</span>
            </div>
            <div className="comp-card" style={{ padding: "28px 32px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.3fr",
                  gap: 32,
                  alignItems: "center",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                  <div className="ph-card" style={{ aspectRatio: "1 / 1" }}>
                    <div className="ph ph-placeholder">
                      <div className="ph-placeholder-icon">
                        <svg
                          viewBox="0 0 32 32"
                          fill="none"
                          stroke="#94A3B8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          aria-hidden
                        >
                          <rect x="5" y="7" width="22" height="18" rx="2" />
                          <circle cx="11" cy="13" r="1.8" />
                          <path d="M5 21l6-6 5 5 4-3 7 7" />
                        </svg>
                      </div>
                      <span className="ph-label ph-label-below">No product image yet</span>
                    </div>
                  </div>
                  <div className="ph-card" style={{ aspectRatio: "1 / 1" }}>
                    <div className="ph ph-placeholder">
                      <div className="ph-placeholder-icon">
                        <svg
                          viewBox="0 0 32 32"
                          fill="none"
                          stroke="#94A3B8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          aria-hidden
                        >
                          <circle cx="16" cy="13" r="5" />
                          <path d="M6 26c2-5 6-7 10-7s8 2 10 7" />
                        </svg>
                      </div>
                      <span className="ph-label ph-label-below">No maker photo yet</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 600,
                      fontSize: 18,
                      lineHeight: 1.3,
                      color: "var(--color-ink)",
                      marginBottom: 10,
                    }}
                  >
                    When an image is missing, say so.
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--color-slate)",
                      marginBottom: 16,
                    }}
                  >
                    A warm-sand tile with a monospace label is better than a broken image, a stock fallback, or
                    an AI-generated guess. It&apos;s also an honest invitation. Contributors can see
                    what&apos;s missing and submit it.
                  </div>
                  <div className="fn">
                    {"// if it can’t be real, it can wait. placeholders are a feature, not a failure."}
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <button type="button" className="btn btn-ghost" style={{ padding: 0, height: "auto" }}>
                      Contribute imagery &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 10 EMPTY STATE ============ */}
        <section className="section" id="empty">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">10</span>
              <h2 className="h2">Empty &amp; Error States</h2>
            </div>
            <p className="hd-desc">
              Never apologize. Just hand the user the next useful action. Illustration is an open magnifying
              glass, not a sad face.
            </p>
          </div>

          <div className="empty">
            <div className="glyph">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="21" cy="21" r="13" />
                <path d="M30.5 30.5 40 40" />
                <path d="M15 21h12" stroke="#0D7377" strokeWidth="2" />
              </svg>
            </div>
            <h3>No results for &ldquo;purple widgets&rdquo;</h3>
            <p>
              Try a broader search, or browse by category. Every brand here is indexed. If you can&apos;t
              find it, help us add it.
            </p>
            <div className="chip-row">
              {["Kitchen", "Home", "Outdoors", "Office"].map((l) => (
                <button key={l} type="button" className="chip">
                  {l}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button type="button" className="btn btn-secondary">
                Browse all brands
              </button>
              <button type="button" className="btn btn-ghost">
                Submit a brand &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* ============ 11 SAMPLE COMPOSITION ============ */}
        <section className="section" id="sample">
          <div className="section-head">
            <div className="hd-title">
              <span className="hd-num">11</span>
              <h2 className="h2">Sample Composition</h2>
            </div>
            <p className="hd-desc">
              A partial search results view: nav, sticky search, active filter chips, three product cards
              at their real size. The system validating itself.
            </p>
          </div>

          <div className="canvas">
            <div className="page-frame-label">
              <span className="dot" />
              wellsourced.io / search?q=wireless+earbuds
            </div>

            {/* Nav */}
            <div className="nav" style={{ marginBottom: 20 }}>
              <div className="mark-lock">
                <Logomark background="#0D7377" bgRadius={10} stroke="#fff" size={28} />
                <div className="wm">
                  <Wordmark />
                </div>
              </div>
              <div className="divider" />
              <div className="search sm" style={{ maxWidth: 400 }}>
                <span className="ic">
                  <SearchIcon />
                </span>
                <input type="text" defaultValue="wireless earbuds" />
                <button type="button" className="clear" aria-label="Clear">
                  <ClearIcon />
                </button>
              </div>
              <div className="spacer" />
              <div className="links">
                <a className="link" href="#">
                  Browse Brands
                </a>
                <a className="link" href="#">
                  Submit a Brand
                </a>
                <a className="link" href="#">
                  About
                </a>
                <div className="divider" />
                <button type="button" className="btn btn-secondary" style={{ height: 36, padding: "0 14px" }}>
                  Sign In
                </button>
              </div>
            </div>

            <div className="rs-head">
              <h2>Wireless earbuds</h2>
              <div className="query">
                Showing <strong>38 products</strong> from <strong>14 brands</strong>
              </div>
            </div>

            <div className="chip-row" style={{ marginBottom: 20 }}>
              {["Under $150", "Worker-owned", "Tier 2+"].map((l) => (
                <button key={l} type="button" className="chip is-active">
                  {l}{" "}
                  <span className="x">
                    <ClearIcon />
                  </span>
                </button>
              ))}
              <button type="button" className="chip">
                + Certifications <CaretDown />
              </button>
              <div style={{ flex: 1 }} />
              <button type="button" className="chip sort">
                Sort: Relevance <CaretDown />
              </button>
            </div>

            <div className="product-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              <SampleProduct
                placeholder="earbuds · matte black"
                phArtStyle="repeating-linear-gradient(45deg, #EFE7D6 0 8px, #E9DFC8 8px 16px)"
                name="Nomad LL Earbuds"
                price="$89.00"
                brand="Signal & Drift"
                tier={3}
                tierLabel="Audited"
              />
              <SampleProduct
                hover
                placeholder="earbuds · moss"
                phArtStyle="repeating-linear-gradient(135deg, #E5EEDA 0 8px, #D6E3C4 8px 16px)"
                name="Kestrel Open-Ear Pro"
                price="$148.00"
                brand="Orrery Goods"
                tier={2}
                tierLabel="Verified"
              />
              <SampleProduct
                placeholder="earbuds · fog gray"
                phArtStyle="repeating-linear-gradient(90deg, #E6E8F0 0 8px, #D4D8E4 8px 16px)"
                name="Fieldnote Bud · Gen 2"
                price="$72.00"
                brand="Northlane Co-op"
                tier={2}
                tierLabel="Verified"
              />
              <div className="product loading">
                <div className="img" />
                <div className="body-p">
                  <div className="sk sk-line" style={{ width: "80%" }} />
                  <div className="sk sk-line" style={{ width: "30%", height: 18 }} />
                  <div className="mid">
                    <div className="sk sk-line" style={{ width: "40%" }} />
                    <div className="sk sk-line" style={{ width: 70, height: 20, borderRadius: 10 }} />
                  </div>
                </div>
                <div className="foot">
                  <div className="sk sk-line" style={{ width: 90, height: 14 }} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
              <button type="button" className="btn btn-secondary">
                Load 34 more &rarr;
              </button>
            </div>
          </div>

          <div className="fn" style={{ marginTop: 16 }}>
            {"// system check: nav height consistent · chips active-color matches teal · cards maintain 1:1 image · trust badges readable at 12px · Buy Direct arrow nudges right on hover"}
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid var(--color-cloud-2)",
            display: "flex",
            justifyContent: "space-between",
            color: "var(--color-slate)",
            fontSize: 13,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            WellSourced &middot; Design System v1.0 &middot;{" "}
            <span className="mono">built 2026-02-14</span>
          </div>
          <div>
            <a
              href="/design/foundations/color"
              style={{ color: "var(--color-slate)", borderBottom: "1px solid transparent" }}
            >
              Deep-dive into tokens, foundations &amp; components &rarr;
            </a>
          </div>
          <div>Not a startup. Not a marketplace. A commons.</div>
        </footer>
      </div>
    </div>
  );
}

/* ---------- small helpers / sub-components ---------- */

function IconCell({
  name,
  color,
  children,
}: {
  name: string;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="icon-cell" style={color ? { color } : undefined}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
      <span className="name">{name}</span>
    </div>
  );
}

function CategoryCard({
  name,
  count,
  children,
}: {
  name: string;
  count: string;
  children: React.ReactNode;
}) {
  return (
    <div className="cat">
      <div className="cat-ico">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {children}
        </svg>
      </div>
      <div className="cat-name">{name}</div>
      <div className="cat-count">{count}</div>
    </div>
  );
}

function MotionPrinciple({
  num,
  name,
  title,
  children,
}: {
  num: string;
  name: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="comp-card" style={{ padding: 20 }}>
      <div className="fn" style={{ color: "var(--color-teal)", marginBottom: 8 }}>
        {num} &middot; {name}
      </div>
      <div
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 600,
          fontSize: 17,
          lineHeight: 1.3,
          color: "var(--color-ink)",
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--color-slate)" }}>{children}</div>
    </div>
  );
}

function EasingCard({
  d,
  stroke,
  name,
  code,
  use,
}: {
  d: string;
  stroke: string;
  name: React.ReactNode;
  code: string;
  use: string;
}) {
  return (
    <div className="comp-card ease-card">
      <svg className="ease-svg" viewBox="0 0 120 120" preserveAspectRatio="none" aria-hidden>
        <line x1="0" y1="120" x2="120" y2="120" stroke="#E5EAEF" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="120" stroke="#E5EAEF" strokeWidth="1" />
        <path d={d} stroke={stroke} strokeWidth="2" fill="none" />
      </svg>
      <div className="ease-body">
        <div className="ease-name">{name}</div>
        <div className="ease-code">{code}</div>
        <div className="ease-use">{use}</div>
      </div>
    </div>
  );
}

function DontCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="dont-card">
      <div className="dont-x">&#10007;</div>
      <div className="dont-title">{title}</div>
      <div className="dont-desc">{children}</div>
    </div>
  );
}

function ImageCategory({
  phClass,
  label,
  name,
  use,
  rules,
}: {
  phClass: string;
  label: string;
  name: string;
  use: string;
  rules: Array<["good" | "bad", string]>;
}) {
  return (
    <div className="img-cat">
      <div className="img-demo">
        <div className="ph-card">
          <div className={phClass}>
            <span className="ph-label">{label}</span>
          </div>
        </div>
      </div>
      <div className="img-cat-body">
        <div className="img-cat-name">{name}</div>
        <div className="img-cat-use">{use}</div>
        <ul className="img-rules">
          {rules.map(([kind, text], i) => (
            <li key={i}>
              <span className={kind}>{kind === "good" ? "✓" : "✗"}</span> {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TreatRatio({ w, h, label, sub }: { w: number; h: number; label: string; sub: string }) {
  return (
    <div className="treat-item">
      <div className="ratio-box" style={{ width: w, height: h }} />
      <div className="ratio-meta">
        <strong>{label}</strong>
        <span>{sub}</span>
      </div>
    </div>
  );
}

function TreatCorner({ radius, label, sub }: { radius: string; label: string; sub: string }) {
  return (
    <div className="treat-item">
      <div className="corner-box" style={{ borderRadius: radius }} />
      <div className="ratio-meta">
        <strong>{label}</strong>
        <span>{sub}</span>
      </div>
    </div>
  );
}

function DoDont({
  kind,
  phClass,
  label,
  badgeChild,
  children,
}: {
  kind: "do" | "dont";
  phClass: string;
  label: string;
  badgeChild?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`dodont ${kind}`}>
      <div className={`dodont-tag${kind === "dont" ? " bad" : ""}`}>
        {kind === "do" ? "DO" : "DON’T"}
      </div>
      <div className="ph-card">
        <div className={phClass}>
          {badgeChild}
          <span className="ph-label">{label}</span>
        </div>
      </div>
      <div className="dodont-cap">{children}</div>
    </div>
  );
}

function SampleProduct({
  name,
  price,
  brand,
  tier,
  tierLabel,
  placeholder,
  phArtStyle,
  hover = false,
}: {
  name: string;
  price: string;
  brand: string;
  tier: 1 | 2 | 3;
  tierLabel: string;
  placeholder: string;
  phArtStyle: string;
  hover?: boolean;
}) {
  const TierIcon = tier === 1 ? Tier1Icon : tier === 2 ? Tier2Icon : Tier3Icon;
  return (
    <div className={`product${hover ? " is-hover" : ""}`}>
      <div className="img">
        <div className="ph-art" style={{ background: phArtStyle }} />
        <div className="placeholder" style={{ position: "relative", zIndex: 2 }}>
          {placeholder}
        </div>
        <button type="button" className="bookmark" aria-label="Save">
          <BookmarkIcon />
        </button>
      </div>
      <div className="body-p">
        <div className="name">{name}</div>
        <div className="price-row">
          <span className="price">{price}</span>
        </div>
        <div className="mid">
          <span className="brand">
            <a href="#">{brand}</a>
          </span>
          <span className={`tb t${tier}`}>
            <TierIcon />
            {tierLabel}
          </span>
        </div>
      </div>
      <div className="foot">
        <a className="btn-buy" href="#" style={hover ? { color: "var(--color-teal-700)" } : undefined}>
          Buy Direct{" "}
          {hover ? (
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: "translateX(2px)" }}
              aria-hidden
            >
              <path d="M7 17 17 7" />
              <path d="M9 7h8v8" />
            </svg>
          ) : (
            <BuyDirectIcon />
          )}
        </a>
      </div>
    </div>
  );
}
