import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { CATEGORIES } from "@/lib/data/categories";

interface CategoriesPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
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
          Browse
        </p>
        <h1 className="mt-3 font-display text-[2rem] md:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.01em] text-fg">
          Browse by category
        </h1>
        <p className="mt-4 text-[16px] leading-[1.55] text-muted">
          Discover brands and products grouped by what they make. Each
          category links to a faceted view you can refine and share.
        </p>
      </header>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/${locale}/c/${cat.slug}`}
              className="group flex h-full flex-col rounded-[16px] border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-[200ms] [transition-timing-function:var(--ease-standard)] hover:-translate-y-px hover:border-cloud-2 hover:shadow-[var(--shadow-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]"
            >
              <h2 className="font-display text-[1.25rem] font-semibold leading-[1.2] text-fg">
                {cat.name}
              </h2>
              <p className="mt-2 flex-1 text-[14px] leading-[1.5] text-muted">
                {cat.blurb}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-teal-fg">
                Browse
                <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
