import { headers } from "next/headers";
import { NotFoundView } from "@/components/NotFoundView";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

/**
 * Locale-scoped 404. Fires when `notFound()` is called from any Server
 * Component inside `[locale]` (e.g. a brand page that can't resolve its
 * slug). Inherits `[locale]/layout.tsx` chrome (ThemeProvider + AppShell).
 *
 * For URLs that don't match any route at all, Next.js renders the ROOT
 * `app/not-found.tsx` instead — that file renders the same view so the
 * brand voice stays consistent across both entry points.
 *
 * Pathname comes from the `x-pathname` header that middleware sets on
 * every locale-prefixed request.
 */
export default async function NotFound() {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  return <NotFoundView locale={defaultLocale as Locale} pathname={pathname} />;
}
