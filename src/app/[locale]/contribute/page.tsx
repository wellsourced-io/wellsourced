import Link from "next/link";
import { ArrowUpRight, GitBranch, ShieldCheck, Sprout } from "lucide-react";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

interface ContributePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
}

const TIERS = [
  {
    num: "01",
    Icon: Sprout,
    tier: "New",
    body:
      "Anyone can suggest a brand or flag a stale claim. Submissions enter a queue for established contributors to review.",
  },
  {
    num: "02",
    Icon: GitBranch,
    tier: "Established",
    body:
      "After a track record of accepted edits, contributors can directly verify data, cite sources, and approve incoming submissions.",
  },
  {
    num: "03",
    Icon: ShieldCheck,
    tier: "Moderator",
    body:
      "Trusted contributors resolve disputes, manage the queue, and adjudicate edge cases. Decisions and their rationale are public.",
  },
];

const ACTIVITIES = [
  "Suggest brands worth listing.",
  "Verify ownership, materials, and country of origin against primary sources.",
  "Cite the source behind every claim — no claim ships without a link.",
  "Review incoming submissions and flagged edits.",
  "Resolve disputes in public, with the audit trail intact.",
];

/**
 * Public contributor onboarding page.
 *
 * Per FR-022, this is also the OAuth landing target — when an
 * unauthenticated visitor hits an `/admin/*` route, the middleware
 * redirects here with `?next=<original-path>` so the sign-in flow can
 * return them to where they wanted to be.
 *
 * The sign-in CTA at MVP just navigates to `/[locale]/admin`; with no
 * session cookie set the middleware will bounce them right back here,
 * which is the correct dead-end-free behavior until real OAuth lands.
 */
export default async function ContributePage({
  params,
  searchParams,
}: ContributePageProps) {
  const { locale: paramLocale } = await params;
  const { next } = await searchParams;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  await getDictionary(locale);

  // If the user arrived via the auth gate (FR-022), preserve the intended
  // destination on the sign-in CTA so the real OAuth callback can honor it.
  const signInHref = next
    ? `/${locale}/admin?next=${encodeURIComponent(next)}`
    : `/${locale}/admin`;

  return (
    <div className="text-fg">
      {/* HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pt-10 md:pt-20 pb-14 md:pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Contribute
        </p>
        <h1
          className="mt-4 max-w-[22ch] font-display font-bold tracking-[-0.01em] text-fg"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05 }}
        >
          Contribute to the <span className="text-teal-fg">commons.</span>
        </h1>
        <p className="mt-6 max-w-[60ch] text-[17px] md:text-[19px] leading-[1.55] text-muted">
          WellSourced is community-maintained. Anyone can suggest a brand or
          flag a stale claim. Established contributors verify the work. Every
          decision and every citation stays in public view.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href={signInHref}
            className="inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-medium text-on-teal transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Sign in with GitHub
            <ArrowUpRight className="ml-2 h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link
            href={`/${locale}/submit`}
            className="inline-flex h-11 items-center rounded-full border border-border px-5 text-[14px] font-medium text-fg transition-colors hover:border-teal hover:text-teal-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Suggest a brand without signing in
          </Link>
        </div>
      </section>

      {/* THREE TIERS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:py-20">
          <header className="max-w-[60ch]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              How contribution works
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-[1.2] text-fg">
              Three tiers, earned not assigned.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-muted">
              Trust accrues through accepted edits, not titles. Every tier sees
              the same data — what changes is the scope of action.
            </p>
          </header>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-3 md:overflow-hidden md:rounded-[16px]">
            {TIERS.map((tier) => (
              <div
                key={tier.num}
                className="bg-surface px-6 py-10 md:px-8 md:py-12"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {tier.num}
                </div>
                <tier.Icon
                  className="mt-4 h-6 w-6 text-teal-fg"
                  aria-hidden
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 font-display text-[1.25rem] font-semibold leading-[1.2] text-fg">
                  {tier.tier}
                </h3>
                <p className="mt-3 max-w-[40ch] text-[14.5px] leading-[1.55] text-muted">
                  {tier.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CONTRIBUTORS DO */}
      <section className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
        <header className="max-w-[60ch]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            What contributors do
          </p>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-[1.2] text-fg">
            The work, made plain.
          </h2>
        </header>
        <ul className="mt-8 space-y-3">
          {ACTIVITIES.map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 text-[15px] leading-[1.6] text-fg"
            >
              <span
                aria-hidden
                className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-teal"
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
