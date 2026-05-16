import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getSession, isEstablishedTier } from "@/lib/auth/session";

interface AdminPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Workspace home placeholder.
 *
 * The real queue/dispute UIs land with the contributor-flow feature. This
 * page exists today so the chrome contract (FR-015) is testable: the
 * consumer header is preserved, the sidebar is rendered, and tier-based
 * gating works.
 */
export default async function AdminPage({ params }: AdminPageProps) {
  const { locale: paramLocale } = await params;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;
  // Layout has already redirected if signed-out; here we can trust the session.
  const session = await getSession();
  const tier = session?.tier ?? "new";
  const showQueues = isEstablishedTier(tier);

  return (
    <section>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {locale.toUpperCase()} · {tier}
      </p>
      <h1 className="mt-3 font-display text-[1.75rem] font-semibold leading-[1.2] text-fg">
        Workspace
      </h1>
      <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.6] text-muted">
        Welcome back. This is where your contributions live alongside the
        public chrome — nothing about the site changes when you sign in.
      </p>

      {showQueues ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <QueueStat label="Submissions awaiting review" value="0" />
          <QueueStat label="Disputes open" value="0" />
        </div>
      ) : (
        <div className="mt-10 rounded-[16px] border border-dashed border-border bg-surface px-6 py-8">
          <h2 className="font-display text-[1.125rem] font-semibold text-fg">
            Earning trust
          </h2>
          <p className="mt-2 max-w-[52ch] text-[14.5px] leading-[1.55] text-muted">
            After a track record of accepted edits, you&rsquo;ll see the
            submissions queue and other reviewer tools here. For now, your
            suggestions are the contribution.
          </p>
        </div>
      )}
    </section>
  );
}

function QueueStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-border bg-surface px-6 py-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      <div className="mt-3 font-display text-[2.25rem] font-semibold leading-none text-fg">
        {value}
      </div>
    </div>
  );
}
