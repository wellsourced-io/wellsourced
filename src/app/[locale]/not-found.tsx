import Link from "next/link";
import { Search } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

// At MVP only `en` exists; in a future PR with multiple locales, this page
// will receive `params.locale` like other [locale] routes. For now we read
// the default locale dictionary so the helpful copy renders even when the
// 404 fires outside a normal route lookup.

export default async function NotFound() {
  const dictionary = await getDictionary(defaultLocale as Locale);
  const t = dictionary.errors.notFound;
  const locale = defaultLocale;

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand-deep text-fg">
        <Search size={28} aria-hidden="true" />
      </div>
      <h1 className="mt-8 text-display font-display font-bold text-fg">
        {t.title}
      </h1>
      <p className="mx-auto mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-muted">
        {t.lede}
      </p>
      <form
        action={`/${locale}/search`}
        method="get"
        className="mx-auto mt-8 max-w-lg"
        role="search"
      >
        <label className="flex h-14 items-center gap-3 rounded-full border border-border bg-surface px-5 focus-within:border-teal focus-within:shadow-[0_0_0_4px_var(--color-teal-light)]">
          <Search size={20} className="text-muted" aria-hidden="true" />
          <input
            name="q"
            type="search"
            placeholder={dictionary.drawer.searchPlaceholder}
            aria-label="Search WellSourced"
            className="flex-1 bg-transparent text-[16px] text-fg placeholder:text-muted/80 focus:outline-none"
          />
        </label>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[14px]">
        <Link
          href={`/${locale}/brands`}
          className="rounded-full px-4 py-2 text-fg transition-colors hover:bg-cloud"
        >
          {t.ctaBrowse}
        </Link>
        <Link
          href={`/${locale}/categories`}
          className="rounded-full px-4 py-2 text-fg transition-colors hover:bg-cloud"
        >
          {dictionary.routes.categories.label}
        </Link>
      </div>
    </section>
  );
}
