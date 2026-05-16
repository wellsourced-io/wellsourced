import { headers } from "next/headers";
import { NotFoundView } from "@/components/NotFoundView";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

/**
 * Root 404. Next.js App Router renders this for any URL that doesn't
 * match a route — including locale-prefixed paths like `/en/anything`
 * when nothing inside `[locale]` claims them. The previous version of
 * this file redirected to `/en/not-found` to inherit `[locale]` chrome,
 * but `/en/not-found` itself doesn't match any route either, so the
 * redirect looped (`ERR_TOO_MANY_REDIRECTS`). Render directly instead.
 *
 * Root not-found is wrapped only by `app/layout.tsx`, so it gets fonts,
 * design tokens, and the theme script, but not the AppShell. The
 * NotFoundView's own next-action links (search + 3 pills + suggest)
 * carry the navigation load.
 */
export default async function RootNotFound() {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  return (
    <main className="min-h-screen bg-bg">
      <NotFoundView locale={defaultLocale as Locale} pathname={pathname} />
    </main>
  );
}
