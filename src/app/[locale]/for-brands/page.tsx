import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  HandCoins,
  GitBranch,
  ExternalLink,
} from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

interface ForBrandsPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const VALUE_PROPS = [
  {
    Icon: ArrowUpRight,
    title: "Direct traffic, no marketplace fees.",
    body: "Every product link goes straight to your Shopify store. WellSourced never touches the transaction or takes a cut.",
  },
  {
    Icon: ShieldCheck,
    title: "Verifiable trust data.",
    body: "Ownership, certifications, country of manufacture, and worker conditions surface on your profile — community-verified, source-cited.",
  },
  {
    Icon: HandCoins,
    title: "No subscription, no commission.",
    body: "Funded by donations and grants. There's no listing fee today and no plan to add one.",
  },
  {
    Icon: GitBranch,
    title: "Open and inspectable.",
    body: "Brand metadata lives in a public Git repo. You can audit, fork, or take your data and leave at any time.",
  },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Submit your brand.", body: "Tell us your brand name, URL, and Shopify domain. Anyone can submit — no account required." },
  { num: "02", title: "The community verifies.", body: "Contributors cross-check your claims against public sources and certification directories. Each field is tagged with its trust tier." },
  { num: "03", title: "You appear in search.", body: "Your products show up in keyword and natural-language search. Each result links directly to your store." },
];

const WHAT_WE_NEED = [
  "Brand name and a short description",
  "Primary URL (your storefront)",
  "Shopify domain (if applicable — improves product indexing)",
  "Ownership type (independent, worker-owned, co-op, B Corp, etc.)",
  "Country of HQ and country of manufacture",
  "Active certifications (B Corp, Fair Trade, Climate Neutral, etc.)",
  "Public sources for any claim you'd like surfaced",
];

export default async function ForBrandsPage({ params }: ForBrandsPageProps) {
  const { locale: paramLocale } = await params;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  await getDictionary(locale);

  return (
    <article className="text-fg">
      {/* HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pt-12 md:pt-20 pb-12 md:pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          For brands
        </p>
        <h1 className="mt-3 max-w-[20ch] font-display font-bold tracking-[-0.01em] text-fg" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", lineHeight: 1.05 }}>
          List your brand on WellSourced.
        </h1>
        <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.55] text-muted">
          A discovery layer for independent brands that want direct-to-consumer
          traffic without paying marketplace tax. We don&apos;t sell anything;
          we just help people find what you make and link them straight to
          your store.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/submit`}
            className="inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-medium text-on-teal transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            List your brand
            <ArrowUpRight className="ml-2 h-3.5 w-3.5" aria-hidden />
          </Link>
          <a
            href="https://github.com/wellsourced-io/brand-data"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full border border-border px-5 text-[14px] font-medium text-fg transition-colors hover:border-teal hover:text-teal-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Read the data schema on GitHub
            <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </section>

      {/* WHY LIST */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1280px] gap-px bg-border md:grid-cols-2">
          {VALUE_PROPS.map((vp) => (
            <div key={vp.title} className="bg-surface px-6 py-10 md:px-10 md:py-14">
              <vp.Icon className="h-7 w-7 text-teal-fg" aria-hidden strokeWidth={1.5} />
              <h2 className="mt-5 font-display text-[1.375rem] font-semibold leading-[1.2] text-fg">
                {vp.title}
              </h2>
              <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.6] text-muted">
                {vp.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            How it works
          </p>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-[1.2] text-fg">
            Three steps. No subscription. No commission.
          </h2>
        </header>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.num}>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {step.num}
              </div>
              <h3 className="mt-4 font-display text-[1.25rem] font-semibold leading-[1.2] text-fg">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.6] text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* WHAT WE'LL NEED */}
      <section className="border-t border-border bg-bg">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <header>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              What we&rsquo;ll need
            </p>
            <h2 className="mt-3 font-display text-[1.5rem] font-semibold leading-[1.2] text-fg">
              Have these ready before you submit.
            </h2>
          </header>
          <ul className="mt-6 max-w-[60ch] space-y-2 text-[15px] leading-[1.6] text-fg">
            {WHAT_WE_NEED.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-6 py-16 text-center">
          <h2 className="mx-auto max-w-[20ch] font-display text-[1.75rem] font-semibold leading-[1.2] text-fg">
            Ready when you are.
          </h2>
          <p className="mx-auto mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-muted">
            Submission takes under 10 minutes. A contributor reviews your
            entry within a few days.
          </p>
          <div className="mt-7">
            <Link
              href={`/${locale}/submit`}
              className="inline-flex h-12 items-center rounded-full bg-teal px-6 text-[15px] font-medium text-on-teal transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              List your brand
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
