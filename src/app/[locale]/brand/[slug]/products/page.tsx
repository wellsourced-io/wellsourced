import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { Breadcrumb } from "@/components/nav/Breadcrumb";
import { BrandProfileSubNav } from "@/components/nav/BrandProfileSubNav";
import { getBreadcrumbTrail } from "@/lib/routes/breadcrumbs";
import {
  EXAMPLE_BRANDS,
  humanizeBrand,
} from "@/lib/brands/exampleBrands";

interface BrandProductsProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    EXAMPLE_BRANDS.map((b) => ({ locale, slug: b.slug })),
  );
}

export default async function BrandProductsPage({ params }: BrandProductsProps) {
  const { locale: paramLocale, slug } = await params;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  const dictionary = await getDictionary(locale);

  const name = humanizeBrand(slug);
  const trail = getBreadcrumbTrail(
    `/${locale}/brand/${slug}/products`,
    dictionary,
    { brand: name },
  );

  return (
    <article className="mx-auto max-w-[1280px] px-6 py-12 md:py-16">
      <Breadcrumb trail={trail} />

      <header className="mt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Brand · Products
        </p>
        <h1 className="mt-3 font-display text-[2rem] md:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.01em] text-fg">
          Products from {name}
        </h1>
      </header>

      <div className="mt-8">
        <BrandProfileSubNav
          locale={locale}
          slug={slug}
          brandName={name}
          active="products"
        />
      </div>

      <section className="mt-12 rounded-[16px] border border-dashed border-border bg-surface px-6 py-14 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Catalog
        </p>
        <p className="mt-4 mx-auto max-w-[44ch] text-[15px] leading-[1.6] text-muted">
          Full product catalog rendering — pulled live from this brand&apos;s
          Shopify store — lands with the Shopify-sync feature. Each product
          card&apos;s &ldquo;Buy direct&rdquo; CTA opens the brand&apos;s store in a
          new tab; WellSourced is never in the transaction path.
        </p>
      </section>
    </article>
  );
}
