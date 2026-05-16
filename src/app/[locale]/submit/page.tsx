import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

interface SubmitPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function SubmitPage({ params }: SubmitPageProps) {
  const { locale: paramLocale } = await params;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  await getDictionary(locale);

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Suggest a brand
      </p>
      <h1 className="mt-3 font-display text-[2rem] md:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.01em] text-fg">
        Tell us about a brand worth listing.
      </h1>
      <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.55] text-muted">
        Anyone can submit — no account required. The submission form is being
        built. In the meantime, open a GitHub issue with the brand name and
        URL, and a contributor will add them to the review queue.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://github.com/wellsourced-io/brand-data/issues/new?title=New%20brand%20suggestion&body=Brand%20name%3A%20%0ABrand%20URL%3A%20%0AWhy%20they%20should%20be%20listed%3A%20"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-medium text-on-teal transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          Open a GitHub issue
          <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden />
        </a>
        <Link
          href={`/${locale}/for-brands`}
          className="inline-flex h-11 items-center rounded-full border border-border px-5 text-[14px] font-medium text-fg transition-colors hover:border-teal hover:text-teal-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          I run this brand
          <ArrowUpRight className="ml-2 h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
