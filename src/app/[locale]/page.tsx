import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { HeroSearchForm } from "@/components/nav/HeroSearchForm";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
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
  { slug: "hardpan-workshop", name: "Hardpan Workshop", category: "Workwear, denim, field shirts", hq: "Denver, CO", ownership: "Family-owned", tier: "t3" },
  { slug: "field-and-forge",  name: "Field & Forge",    category: "Kitchen tools, knives, boards", hq: "Sheffield, UK", ownership: "Worker-owned", tier: "t3" },
  { slug: "north-cove-knits", name: "North Cove Knits", category: "Knitwear, wool sweaters",       hq: "Donegal, IE",   ownership: "Cooperative",  tier: "t2" },
  { slug: "verdant-press",    name: "Verdant Press",    category: "Stationery, letterpress",       hq: "Portland, OR",  ownership: "B Corp",       tier: "t2" },
];

const HOW_IT_WORKS = [
  { num: "01", Icon: Search,      title: "Find what you need.",       body: "Search by product, category, or material. Plain language works." },
  { num: "02", Icon: ShieldCheck, title: "See who checked.",          body: "Every claim is tagged self-reported, community, or audited. Sources are linked." },
  { num: "03", Icon: ArrowUpRight, title: "Buy direct from the brand.", body: "We're never in the transaction path. Every purchase happens on the brand's own store." },
];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale: paramLocale } = await params;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="text-fg">
      {/* HERO — FR-007: hero search is the only search on / */}
      <section className="mx-auto max-w-[1280px] px-6 pt-10 md:pt-20 pb-14 md:pb-24">
        <h1
          className="max-w-[18ch] font-display font-bold tracking-[-0.01em] text-fg"
          style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)", lineHeight: 1.04 }}
        >
          Find what&rsquo;s
          <br />
          actually <span className="text-teal-fg">made well.</span>
        </h1>
        <p className="mt-7 max-w-[60ch] text-[17px] md:text-[19px] leading-[1.55] text-muted">
          A directory of brands whose origin, materials, and makers are
          verifiable. We don&rsquo;t sell anything. We just show you who made
          it, and whether anyone checked.
        </p>

        <div className="mt-9">
          <HeroSearchForm
            locale={locale}
            placeholder={dictionary.drawer.searchPlaceholder}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px]">
          <Link
            href={`/${locale}/brands`}
            className="inline-flex items-center gap-1.5 font-medium text-fg transition-colors duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-teal-fg"
          >
            {dictionary.routes.brands.label}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <span className="h-1 w-1 rounded-full bg-cloud-2" aria-hidden />
          <Link
            href={`/${locale}/categories`}
            className="inline-flex items-center gap-1.5 text-muted transition-colors duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-fg"
          >
            {dictionary.routes.categories.label}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1280px] gap-px bg-border md:grid-cols-3">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.num} className="bg-surface px-6 py-12 md:px-10 md:py-16">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {step.num}
              </div>
              <step.Icon
                className="mt-5 h-7 w-7 text-teal-fg"
                aria-hidden
                strokeWidth={1.5}
              />
              <h2 className="mt-5 font-display text-[1.5rem] font-semibold leading-[1.2] text-fg">
                {step.title}
              </h2>
              <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED BRANDS — preview rail */}
      <section className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Recently verified
            </div>
            <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-[1.2] text-fg">
              Brands the commons just checked.
            </h2>
          </div>
          <Link
            href={`/${locale}/brands`}
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-fg transition-colors hover:text-teal-fg"
          >
            View all brands
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </header>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/${locale}/brand/${brand.slug}`}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-surface shadow-[var(--shadow-card)]",
                "transition-[transform,box-shadow,border-color] duration-[200ms] [transition-timing-function:var(--ease-standard)]",
                "hover:-translate-y-px hover:shadow-[var(--shadow-hover)] hover:border-cloud-2",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]",
              )}
            >
              <div className="relative aspect-[5/3] w-full bg-placeholder">
                <div className="absolute inset-0 flex items-end p-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
                  <span>No product image yet</span>
                </div>
                <div className="absolute right-3 top-3">
                  <TrustBadge tier={brand.tier} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  {brand.hq} · {brand.ownership}
                </div>
                <h3 className="mt-2 font-display text-[19px] font-semibold leading-[1.2] text-fg">
                  {brand.name}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.5] text-muted">
                  {brand.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CALL TO PARTICIPATE */}
      <section className="border-t border-border bg-bg">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
          <Sprout className="h-7 w-7 text-teal-fg" aria-hidden strokeWidth={1.5} />
          <h2
            className="mt-5 max-w-[24ch] font-display font-semibold tracking-[-0.005em] text-fg"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15 }}
          >
            This is a commons. Help us keep it honest.
          </h2>
          <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.6] text-muted">
            Every brand profile is community-maintained. Spot a missing brand,
            a stale claim, or evidence we should add? Anyone can contribute.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/submit`}
              className="inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-medium text-white transition-colors hover:bg-teal-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              Suggest a brand
              <ArrowUpRight className="ml-2 h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href={`/${locale}/contribute`}
              className="inline-flex h-11 items-center rounded-full border border-border px-5 text-[14px] font-medium text-fg transition-colors hover:border-teal hover:text-teal-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              Become a contributor
              <ArrowUpRight className="ml-2 h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
