import { Suspense } from "react";
import { Search } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

/**
 * Search results landing. Owned by the IA spec only insofar as the route
 * MUST exist so AppShell can apply sticky header + compact search per
 * FR-007/FR-009. The actual results rendering belongs to the upcoming
 * search feature; this page is the placeholder destination.
 */
export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const { locale: paramLocale } = await params;
  const { q } = await searchParams;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  await getDictionary(locale);

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="h-7 w-48 animate-pulse rounded bg-cloud" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-48 animate-pulse rounded-[16px] bg-cloud" />
            <div className="h-48 animate-pulse rounded-[16px] bg-cloud" />
            <div className="h-48 animate-pulse rounded-[16px] bg-cloud" />
          </div>
        </div>
      }
    >
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        {q ? (
          <>
            <header>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Search
              </p>
              <h1 className="mt-2 font-display text-[1.75rem] font-semibold leading-[1.2] text-fg">
                Results for &ldquo;{q}&rdquo;
              </h1>
            </header>
            <div className="mt-12 rounded-[16px] border border-dashed border-border bg-surface px-6 py-14 text-center">
              <Search
                className="mx-auto h-7 w-7 text-muted"
                aria-hidden
                strokeWidth={1.5}
              />
              <p className="mt-4 max-w-[44ch] mx-auto text-[15px] leading-[1.6] text-muted">
                Search results rendering is coming with the search feature
                rollout. The chrome and URL contract are working today.
              </p>
            </div>
          </>
        ) : (
          <header>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Search
            </p>
            <h1 className="mt-2 font-display text-[1.75rem] font-semibold leading-[1.2] text-fg">
              Type to find brands and products.
            </h1>
            <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.6] text-muted">
              Use the compact search in the header above, or jump back to the
              home page to start from the hero.
            </p>
          </header>
        )}
      </section>
    </Suspense>
  );
}
