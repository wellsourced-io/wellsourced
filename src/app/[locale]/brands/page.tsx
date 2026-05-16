import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { EXAMPLE_BRANDS } from "@/lib/brands/exampleBrands";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { cn } from "@/lib/cn";

interface BrandsPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Hardcoded tiers map onto the example brands — real tier data lands with
// the brand-data integration.
const TIER_BY_SLUG: Record<string, "t1" | "t2" | "t3"> = {
  "hardpan-workshop": "t3",
  "field-and-forge": "t3",
  "north-cove-knits": "t2",
  "verdant-press": "t2",
  "ironpine-fire": "t1",
  "low-water-co": "t2",
};

export default async function BrandsDirectoryPage({ params }: BrandsPageProps) {
  const { locale: paramLocale } = await params;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  await getDictionary(locale);

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <header className="max-w-[60ch]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Directory
        </p>
        <h1 className="mt-3 font-display text-[2rem] md:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.01em] text-fg">
          Browse all brands
        </h1>
        <p className="mt-4 text-[16px] leading-[1.55] text-muted">
          Every brand the community has researched and verified. Filter, sort,
          and search across the catalog.
        </p>
      </header>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMPLE_BRANDS.map((brand) => (
          <li key={brand.slug}>
            <Link
              href={`/${locale}/brand/${brand.slug}`}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]",
                "transition-[transform,box-shadow,border-color] duration-[200ms] [transition-timing-function:var(--ease-standard)]",
                "hover:-translate-y-px hover:shadow-[var(--shadow-hover)] hover:border-cloud-2",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  {brand.hq} · {brand.ownership}
                </div>
                <TrustBadge tier={TIER_BY_SLUG[brand.slug] ?? "t1"} />
              </div>
              <h2 className="mt-3 font-display text-[1.125rem] font-semibold leading-[1.2] text-fg">
                {brand.name}
              </h2>
              <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-teal-fg">
                View profile
                <ArrowUpRight size={12} aria-hidden="true" />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 max-w-[60ch] text-[14px] leading-[1.6] text-muted">
        Filters, sorting, and full catalog rendering land with the brand-data
        integration. The route is wired and shareable today.
      </p>
    </section>
  );
}
