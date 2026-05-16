import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { Lockup } from "@/components/ui/Logo";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { cn } from "@/lib/cn";

type Tier = "t1" | "t2" | "t3";

const FEATURED_BRANDS: Array<{
  slug: string;
  name: string;
  category: string;
  hq: string;
  ownership: string;
  tier: Tier;
}> = [
  {
    slug: "hardpan-workshop",
    name: "Hardpan Workshop",
    category: "Workwear, denim, field shirts",
    hq: "Denver, CO",
    ownership: "Family-owned",
    tier: "t3",
  },
  {
    slug: "field-and-forge",
    name: "Field & Forge",
    category: "Kitchen tools, knives, boards",
    hq: "Sheffield, UK",
    ownership: "Worker-owned",
    tier: "t3",
  },
  {
    slug: "north-cove-knits",
    name: "North Cove Knits",
    category: "Knitwear, wool sweaters",
    hq: "Donegal, IE",
    ownership: "Cooperative",
    tier: "t2",
  },
  {
    slug: "verdant-press",
    name: "Verdant Press",
    category: "Stationery, letterpress, bookbinding",
    hq: "Portland, OR",
    ownership: "B Corp",
    tier: "t2",
  },
  {
    slug: "ironpine-fire",
    name: "Ironpine Fire",
    category: "Cast iron, outdoor cookware",
    hq: "Pittsburgh, PA",
    ownership: "Independent",
    tier: "t1",
  },
  {
    slug: "low-water-co",
    name: "Low Water Co.",
    category: "Linens, table & bath",
    hq: "Provence, FR",
    ownership: "Family-owned",
    tier: "t2",
  },
];

const STATS = [
  { label: "Brands cataloged", value: "247" },
  { label: "Independently audited", value: "89" },
  { label: "Categories", value: "12" },
  { label: "Data, open", value: "MIT" },
];

const HOW_IT_WORKS = [
  {
    num: "01",
    Icon: Search,
    title: "Find what you need.",
    body: "Search by product, category, or material. Plain language works. No jargon required.",
  },
  {
    num: "02",
    Icon: ShieldCheck,
    title: "See who checked.",
    body: "Every claim is tagged self-reported, community, or audited. Sources are linked. You decide what counts.",
  },
  {
    num: "03",
    Icon: ArrowUpRight,
    title: "Buy direct from the brand.",
    body: "We're never in the transaction path. Every purchase happens on the brand's own store, on the brand's terms.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* ============ HEADER ============ */}
      <header className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6">
        <Link href="/" aria-label="WellSourced, home" className="shrink-0">
          <Lockup size="sm" />
        </Link>
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          <HeaderLink href="/brands">Directory</HeaderLink>
          <HeaderLink href="/categories">Categories</HeaderLink>
          <HeaderLink href="/about">About</HeaderLink>
          <HeaderLink href="/design">Design</HeaderLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/submit">
              Add a brand
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </Button>
        </div>
      </header>

      {/* ============ 01 HERO ============ */}
      <section className="mx-auto max-w-[1280px] px-6 pt-10 md:pt-20 pb-14 md:pb-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Left column: pitch + search */}
          <div className="md:col-span-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
              A commons, not a storefront
            </div>
            <h1
              className="font-[var(--font-display)] font-bold tracking-[-0.025em] text-fg"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)", lineHeight: 1.04 }}
            >
              Find what&rsquo;s
              <br />
              actually <span className="text-teal-fg">made well.</span>
            </h1>
            <p className="mt-7 max-w-[60ch] text-[17px] md:text-[19px] leading-[1.55] text-muted">
              A directory of brands whose origin, materials, and makers are verifiable.
              We don&rsquo;t sell anything. We just show you who made it, and whether anyone
              checked.
            </p>

            <div className="mt-9 max-w-[640px]">
              <SearchBar shortcut="⌘K" aria-label="Search the directory" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px]">
              <Link
                href="/brands"
                className="inline-flex items-center gap-1.5 font-medium text-fg transition-[color] duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-teal-fg"
              >
                Browse the directory
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <span className="h-1 w-1 rounded-full bg-cloud-2" aria-hidden />
              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 text-muted transition-[color] duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-fg"
              >
                Browse by category
              </Link>
              <span className="h-1 w-1 rounded-full bg-cloud-2" aria-hidden />
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-muted transition-[color] duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-fg"
              >
                How we work
              </Link>
            </div>
          </div>

          {/* Right column: spec card with sample queries (asymmetric counterweight) */}
          <aside className="md:col-span-4 md:pt-2">
            <div className="border-l-0 md:border-l md:border-border md:pl-8">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted font-[var(--font-mono)]">
                Try searching
              </div>
              <ul className="mt-4 space-y-2.5 text-[14.5px] leading-snug">
                {[
                  "organic cotton field shirts",
                  "cast-iron skillet, USA-made",
                  "wool sweaters, worker-owned",
                  "letterpress notebooks",
                  "kitchen knives, audited supply chain",
                ].map((q) => (
                  <li key={q}>
                    <Link
                      href={`/search?q=${encodeURIComponent(q)}`}
                      className="group inline-flex items-baseline gap-2 text-fg transition-[color] duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-teal-fg"
                    >
                      <span
                        className="font-[var(--font-mono)] text-[12px] text-muted group-hover:text-teal-fg"
                        aria-hidden
                      >
                        →
                      </span>
                      <span className="border-b border-transparent group-hover:border-current">
                        {q}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Footnote stat strip, quiet, NOT a hero-metric template */}
        <dl className="mt-16 md:mt-20 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-border pt-5 font-[var(--font-mono)] text-[11.5px] uppercase tracking-[0.12em] text-muted">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <dd className="text-fg text-[12.5px] font-medium tabular-nums">{s.value}</dd>
              <dt>{s.label}</dt>
              {i < STATS.length - 1 ? (
                <span className="ml-6 hidden h-3 w-px bg-cloud-2 sm:inline-block" aria-hidden />
              ) : null}
            </div>
          ))}
        </dl>
      </section>

      {/* ============ 02 HOW IT WORKS ============ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <header className="md:col-span-4">
              <div className="font-[var(--font-mono)] text-[11.5px] uppercase tracking-[0.18em] text-teal-fg">
                How it works
              </div>
              <h2
                className="mt-3 font-[var(--font-display)] font-semibold tracking-[-0.01em] text-fg"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", lineHeight: 1.15 }}
              >
                Three steps. None of them involves us holding your money.
              </h2>
              <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.6] text-muted">
                WellSourced is never in the transaction path. We&rsquo;re a directory and a
                verification layer. The store is the brand&rsquo;s.
              </p>
            </header>
            <ol className="md:col-span-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {HOW_IT_WORKS.map(({ num, Icon, title, body }) => (
                <li key={num} className="relative">
                  <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-muted">
                    Step {num}
                  </div>
                  <Icon className="mt-4 h-6 w-6 text-teal-fg" aria-hidden strokeWidth={1.75} />
                  <h3 className="mt-4 text-[18px] font-semibold leading-snug text-fg">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-muted">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ 03 FEATURED DIRECTORY ============ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
          <header className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-[var(--font-mono)] text-[11.5px] uppercase tracking-[0.18em] text-teal-fg">
                In the directory
              </div>
              <h2
                className="mt-3 font-[var(--font-display)] font-semibold tracking-[-0.01em] text-fg"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", lineHeight: 1.15 }}
              >
                A few of the brands we&rsquo;ve cataloged.
              </h2>
              <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.6] text-muted">
                Each card shows who made it, where, and how the data was verified. Click in for
                sources, certifications, and the brand&rsquo;s own store.
              </p>
            </div>
            <Link
              href="/brands"
              className="group inline-flex items-center gap-1.5 self-end text-[14px] font-medium text-fg transition-[color] duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-teal-fg"
            >
              See all 247
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </header>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_BRANDS.map((b) => (
              <li key={b.slug}>
                <BrandCard brand={b} />
              </li>
            ))}
          </ul>

          <div className="mt-12 flex items-center gap-3 border-t border-border pt-6 font-[var(--font-mono)] text-[11.5px] uppercase tracking-[0.12em] text-muted">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-t1-bg)]" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-t1-fg)]" aria-hidden />
            </span>
            Tier 1 self-reported
            <span className="mx-3 h-3 w-px bg-cloud-2" aria-hidden />
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-t2-bg)]" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-t2-fg)]" aria-hidden />
            </span>
            Tier 2 community
            <span className="mx-3 h-3 w-px bg-cloud-2" aria-hidden />
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-t3-bg)]" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-t3-fg)]" aria-hidden />
            </span>
            Tier 3 audited
          </div>
        </div>
      </section>

      {/* ============ 04 EDITORIAL PULL ============ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:py-28">
          <div className="max-w-[56ch]">
            <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-muted">
              From the manifesto
            </div>
            <blockquote
              className="mt-5 font-[var(--font-serif)] italic text-fg"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", lineHeight: 1.35 }}
            >
              We show data, not judgment. Sources are linked. Tiers are visible. Trust is something
              you decide; we just refuse to hide what we know.
            </blockquote>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-fg transition-[color] duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-teal-fg"
            >
              Read why this exists
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 05 TWIN RAILS ============ */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-px bg-border md:grid-cols-2">
          <Rail
            kicker="For brand operators"
            title="Run a brand worth listing?"
            body="Submit your product line, source documentation, and ownership structure. Free to list. Free to leave. We never take a cut."
            ctaLabel="List your brand"
            ctaHref="/submit"
            Icon={Sprout}
          />
          <Rail
            kicker="For everyone else"
            title="Help build the commons."
            body="WellSourced is volunteer-built and donation-funded. Contribute brand data, suggest edits, or fund a category audit. The directory belongs to the people who use it."
            ctaLabel="Get involved"
            ctaHref="/contribute"
            Icon={ShieldCheck}
          />
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-14">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-12 md:gap-8">
            <div className="col-span-2 md:col-span-4">
              <Lockup size="md" />
              <p className="mt-5 max-w-[36ch] text-[14px] leading-[1.6] text-muted">
                A directory of what&rsquo;s actually made well. Public infrastructure, not a brand.
              </p>
              <Link
                href="/donate"
                className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-fg transition-[color] duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-teal-fg"
              >
                Fund the commons
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
            <FooterColumn
              label="Find"
              links={[
                { href: "/brands", label: "Directory" },
                { href: "/categories", label: "Categories" },
                { href: "/search", label: "Search" },
              ]}
            />
            <FooterColumn
              label="Build"
              links={[
                { href: "/submit", label: "List a brand" },
                { href: "/contribute", label: "Contribute data" },
                { href: "/design", label: "Design system" },
              ]}
            />
            <FooterColumn
              label="Care"
              links={[
                { href: "/about", label: "About" },
                { href: "/manifesto", label: "Manifesto" },
                { href: "/donate", label: "Donate" },
              ]}
            />
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-muted">
            <span>&copy; {new Date().getFullYear()} WellSourced. Public infrastructure.</span>
            <span>v1.0, Feb 2026 release</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Landing-only subcomponents. Kept inline because they are not reused. */

function HeaderLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-9 items-center rounded-full px-3 text-[13.5px] font-medium text-muted",
        "transition-[color] duration-[150ms] [transition-timing-function:var(--ease-standard)]",
        "hover:text-fg",
      )}
    >
      {children}
    </Link>
  );
}

function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="md:col-span-2">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      <ul className="mt-4 space-y-2.5 text-[14px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-fg transition-[color] duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-teal-fg"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Rail({
  kicker,
  title,
  body,
  ctaLabel,
  ctaHref,
  Icon,
}: {
  kicker: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean; strokeWidth?: number }>;
}) {
  return (
    <div className="bg-bg px-6 py-14 md:px-12 md:py-20">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-muted">
        {kicker}
      </div>
      <Icon className="mt-5 h-7 w-7 text-teal-fg" aria-hidden strokeWidth={1.5} />
      <h3
        className="mt-5 font-[var(--font-display)] font-semibold tracking-[-0.01em] text-fg"
        style={{ fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)", lineHeight: 1.2 }}
      >
        {title}
      </h3>
      <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.6] text-muted">{body}</p>
      <div className="mt-7">
        <Button asChild variant="secondary">
          <Link href={ctaHref}>
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function BrandCard({
  brand,
}: {
  brand: (typeof FEATURED_BRANDS)[number];
}) {
  return (
    <Link
      href={`/brand/${brand.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-surface shadow-[var(--shadow-card)]",
        "transition-[transform,box-shadow,border-color] duration-[200ms] [transition-timing-function:var(--ease-standard)]",
        "hover:-translate-y-px hover:shadow-[var(--shadow-hover)] hover:border-cloud-2",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]",
      )}
    >
      <div className="relative aspect-[5/3] w-full bg-placeholder">
        {/* Sand-deep placeholder with JetBrains-Mono caption, per the imagery doctrine */}
        <div className="absolute inset-0 flex items-end p-4 font-[var(--font-mono)] text-[10.5px] uppercase tracking-[0.16em] text-muted">
          <span>No product image yet</span>
        </div>
        <div className="absolute right-3 top-3">
          <TrustBadge tier={brand.tier} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="font-[var(--font-mono)] text-[10.5px] uppercase tracking-[0.14em] text-muted">
          {brand.hq} · {brand.ownership}
        </div>
        <h3 className="mt-2 font-[var(--font-display)] text-[19px] font-semibold leading-[1.2] text-fg">
          {brand.name}
        </h3>
        <p className="mt-2 text-[13.5px] leading-[1.5] text-muted">{brand.category}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="font-[var(--font-mono)] text-[10.5px] uppercase tracking-[0.16em] text-muted">
            View profile
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-muted transition-[color,transform] duration-[200ms] [transition-timing-function:var(--ease-standard)] group-hover:text-teal-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
