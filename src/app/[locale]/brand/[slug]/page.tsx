import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { BrandProfileSubNav } from "@/components/nav/BrandProfileSubNav";
import { TrustBadge } from "@/components/ui/TrustBadge";
import {
  EXAMPLE_BRANDS,
  humanizeBrand,
} from "@/lib/brands/exampleBrands";

interface BrandProfileProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    EXAMPLE_BRANDS.map((b) => ({ locale, slug: b.slug })),
  );
}

export default async function BrandProfilePage({ params }: BrandProfileProps) {
  const { locale: paramLocale, slug } = await params;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  await getDictionary(locale);

  const name = humanizeBrand(slug);
  const brand = EXAMPLE_BRANDS.find((b) => b.slug === slug);
  const suggestEditHref = `/${locale}/admin/suggest?brand=${slug}&field=`;

  return (
    <article className="mx-auto max-w-[1280px] px-6 py-12 md:py-16">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Brand profile
          </p>
          <h1 className="mt-3 font-display text-[2rem] md:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.01em] text-fg">
            {name}
          </h1>
          {brand && (
            <p className="mt-2 text-[14px] text-muted">
              {brand.hq} · {brand.ownership}
            </p>
          )}
        </div>
        <Link
          href={suggestEditHref}
          className="inline-flex h-10 items-center gap-1.5 self-start rounded-full border border-border px-4 text-[13px] font-medium text-fg transition-colors hover:border-teal hover:text-teal-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          Suggest an edit
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </header>

      <div className="mt-8">
        <BrandProfileSubNav
          locale={locale}
          slug={slug}
          brandName={name}
          active="overview"
        />
      </div>

      <section className="mt-12 rounded-[16px] border border-border bg-surface p-8">
        <div className="flex items-center gap-3 text-muted">
          <ShieldCheck size={18} aria-hidden="true" />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
            Profile body
          </p>
        </div>
        <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.6] text-muted">
          The full brand profile body — trust-tier grid, ownership details,
          worker conditions, certifications, source citations — is owned by
          the brand-profile feature. This page proves the chrome composes,
          the sub-nav resolves, and the suggest-edit affordance is wired.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <TrustBadge tier="t3" />
          <TrustBadge tier="t2" />
          <TrustBadge tier="t1" />
        </div>
      </section>

      <section id="trust-data" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-[1.5rem] font-semibold text-fg">
          Trust data
        </h2>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.6] text-muted">
          Per-field trust tier breakdown — Tier 1 self-reported, Tier 2
          community-verified, Tier 3 independently audited — lands with the
          brand-data integration. The in-page anchor target from the sub-nav
          is wired and ready.
        </p>
      </section>
    </article>
  );
}
