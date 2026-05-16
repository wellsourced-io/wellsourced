import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { Breadcrumb } from "@/components/nav/Breadcrumb";
import { getBreadcrumbTrail } from "@/lib/routes/breadcrumbs";
import { CATEGORIES, findCategory } from "@/lib/data/categories";

interface CategoryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CATEGORIES.map((c) => ({ locale, slug: c.slug })),
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale: paramLocale, slug } = await params;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  const category = findCategory(slug);
  if (!category) notFound();
  const dictionary = await getDictionary(locale);

  const trail = getBreadcrumbTrail(`/${locale}/c/${slug}`, dictionary);

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12 md:py-16">
      <Breadcrumb trail={trail} />

      <header className="mt-4 max-w-[60ch]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Category
        </p>
        <h1 className="mt-3 font-display text-[2rem] md:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.01em] text-fg">
          {category.name}
        </h1>
        <p className="mt-4 text-[16px] leading-[1.55] text-muted">
          {category.blurb}
        </p>
      </header>

      <div className="mt-8">
        <Link
          href={`/${locale}/search?category=${slug}`}
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 text-[13px] font-medium text-fg transition-colors hover:border-teal hover:text-teal-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          Search this category
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <section className="mt-12 rounded-[16px] border border-dashed border-border bg-surface px-6 py-14 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Listings
        </p>
        <p className="mt-4 mx-auto max-w-[44ch] text-[15px] leading-[1.6] text-muted">
          Brand and product listings for {category.name.toLowerCase()} land
          with the category-data integration. The route is wired and shareable
          today — the chrome holds the shape.
        </p>
      </section>
    </section>
  );
}
