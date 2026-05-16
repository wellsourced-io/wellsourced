import Link from "next/link";
import { Search } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionary";
import { locales, type Locale } from "@/lib/i18n/config";

interface NotFoundViewProps {
  locale: Locale;
  pathname: string;
}

/**
 * Shared 404 body. Applies WellSourced's verification mechanic to the
 * missing page itself: the audit-log block is the structural wink.
 * Rendered both from `[locale]/not-found.tsx` (for `notFound()` calls
 * inside the locale tree) and `app/not-found.tsx` (for unmatched URLs
 * outside any matched route).
 */
export async function NotFoundView({ locale, pathname }: NotFoundViewProps) {
  const dictionary = await getDictionary(locale);
  const t = dictionary.errors.notFound;
  const displayPath = stripLocalePrefix(pathname) || "/";

  return (
    <section className="mx-auto w-full max-w-[640px] px-6 py-20 sm:py-28">
      <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">
        {t.eyebrow}
      </p>

      <h1 className="mt-5 font-display text-[clamp(2rem,1.4rem+2vw,2.625rem)] font-bold leading-[1.08] tracking-[-0.01em] text-fg">
        {t.title}
      </h1>

      <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.6] text-muted">
        {t.ledePrefix}{" "}
        <code className="rounded-[6px] bg-cloud px-1.5 py-0.5 font-mono text-[14px] text-fg">
          {displayPath}
        </code>
        . {t.ledeSuffix}
      </p>

      <pre
        aria-hidden="true"
        className="mt-10 overflow-x-auto whitespace-pre font-mono text-[13px] leading-[1.7] text-muted"
      >
        <span className="text-fg">
          {t.auditQuery.replace("{0}", displayPath)}
        </span>
        {"\n"}
        {t.auditCatalog}
        {"\n"}
        {t.auditBrandIndex}
        {"\n"}
        {t.auditContributor}
        {"\n"}
        <span className="text-fg">{t.auditNoEntry}</span>
      </pre>

      <form
        action={`/${locale}/search`}
        method="get"
        role="search"
        className="mt-10"
      >
        <label className="flex h-14 w-full items-center gap-3 rounded-full border border-border bg-surface px-5 transition-shadow duration-[200ms] [transition-timing-function:var(--ease-standard)] focus-within:border-teal focus-within:shadow-[0_0_0_4px_var(--color-teal-light)]">
          <Search size={20} className="shrink-0 text-muted" aria-hidden="true" />
          <input
            name="q"
            type="search"
            placeholder={t.searchPlaceholder}
            aria-label={t.searchAriaLabel}
            className="min-w-0 flex-1 bg-transparent text-[16px] text-fg placeholder:text-muted/80 focus:outline-none"
          />
        </label>
      </form>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-[14px]">
        <NotFoundPill href={`/${locale}/brands`}>{t.ctaBrowse}</NotFoundPill>
        <NotFoundPill href={`/${locale}/categories`}>
          {t.ctaCategories}
        </NotFoundPill>
        <NotFoundPill href={`/${locale}/submit`}>{t.ctaSubmit}</NotFoundPill>
      </div>

      <p className="mt-12 text-[14px] text-muted">
        {t.suggestPrompt}{" "}
        <Link
          href={`/${locale}/submit`}
          className="rounded-[4px] font-medium text-teal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          {t.suggestCta}
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
    </section>
  );
}

function NotFoundPill({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center rounded-full border border-border bg-surface px-4 text-fg transition-colors duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:border-teal hover:text-teal focus-visible:border-teal focus-visible:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
    >
      {children}
    </Link>
  );
}

function stripLocalePrefix(pathname: string): string {
  if (!pathname) return "";
  const segments = pathname.split("/");
  if (
    segments.length >= 2 &&
    (locales as readonly string[]).includes(segments[1] ?? "")
  ) {
    const rest = segments.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}
