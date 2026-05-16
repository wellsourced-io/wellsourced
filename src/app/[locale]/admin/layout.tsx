import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getSession } from "@/lib/auth/session";
import { WorkspaceSidebar } from "@/components/nav/WorkspaceSidebar";

interface AdminLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Contributor workspace layout (FR-015 + FR-022).
 *
 * Defense-in-depth: the middleware already redirects unauthenticated
 * visitors to `/[locale]/contribute`, but layouts may run for paths that
 * bypass middleware in edge cases (e.g., dev cache replays). A second
 * check here costs nothing and keeps the gate honest.
 *
 * The consumer chrome (`AppShell`) wraps this from the parent
 * `[locale]/layout.tsx` — we do NOT replace it. The sidebar sits BELOW
 * the NavBar, beside the page content, so contributors never feel
 * trapped in a separate "app shell."
 */
export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale: paramLocale } = await params;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;

  const session = await getSession();
  if (!session) {
    // Preserve the original path so the OAuth callback can return here.
    const hdrs = await headers();
    const pathname = hdrs.get("x-pathname") ?? `/${locale}/admin`;
    redirect(`/${locale}/contribute?next=${encodeURIComponent(pathname)}`);
  }

  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? `/${locale}/admin`;

  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-0 px-6 md:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden border-r border-border md:block">
        <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <WorkspaceSidebar
            locale={locale}
            active={pathname}
            tier={session.tier}
          />
        </div>
      </aside>
      <div className="min-w-0 px-2 py-8 md:px-10 md:py-10">{children}</div>
    </div>
  );
}
