import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";
import { matchLocale } from "@/lib/i18n/matchLocale";

/**
 * Locale routing + auth gate middleware per FR-029 and FR-022.
 *
 * Strategy (research.md R2):
 *   - Paths bearing a known locale prefix pass through unchanged, with one
 *     exception: `/[locale]/admin(/.*)?` requires a `ws-session` cookie
 *     (FR-022). Missing session → 307 redirect to
 *     `/[locale]/contribute?next=<original-path-with-query>`.
 *   - Paths missing a locale prefix → 308 permanent redirect to the
 *     best-match locale (currently always 'en' at MVP).
 *   - Query string and hash are preserved.
 *   - The matcher config below excludes /api/*, /_next/*, /design/*, and
 *     static assets so they bypass middleware.
 *
 * Sets `x-pathname` header so Server Components can read the current path
 * via `next/headers`.
 */

const PUBLIC_FILE = /\.(.*)$/;

function hasLocalePrefix(pathname: string): boolean {
  const [, first] = pathname.split("/");
  return (locales as readonly string[]).includes(first ?? "");
}

function bestMatch(request: NextRequest): Locale {
  return matchLocale(request.headers.get("accept-language"));
}

/**
 * Returns the locale segment when `pathname` is `/[locale]/admin` or
 * `/[locale]/admin/<anything>`. Returns null otherwise. Pure helper —
 * doesn't read cookies.
 */
function matchAdminPath(pathname: string): Locale | null {
  const [, first, second] = pathname.split("/");
  if (!first || !(locales as readonly string[]).includes(first)) return null;
  if (second !== "admin") return null;
  return first as Locale;
}

export function middleware(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl;

  // Pass-through: locale-prefixed paths are canonical.
  if (hasLocalePrefix(pathname)) {
    // Auth gate (FR-022): /[locale]/admin/* requires a ws-session cookie.
    const adminLocale = matchAdminPath(pathname);
    if (adminLocale && !request.cookies.get("ws-session")) {
      const url = request.nextUrl.clone();
      url.pathname = `/${adminLocale}/contribute`;
      url.search = `?next=${encodeURIComponent(pathname + search + hash)}`;
      url.hash = "";
      return NextResponse.redirect(url, 307);
    }

    const res = NextResponse.next();
    res.headers.set("x-pathname", pathname);
    return res;
  }

  // Redirect un-prefixed paths to best-match locale.
  const locale = bestMatch(request);
  const target = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  const url = request.nextUrl.clone();
  url.pathname = target;
  url.search = search;
  url.hash = hash;
  return NextResponse.redirect(url, 308);
}

/**
 * Match every path EXCEPT:
 *   - /api/*           (route handlers, including /api/events)
 *   - /_next/*         (Next.js internals + static assets)
 *   - /design/*        (self-contained design site per FR-016)
 *   - paths with file extensions (e.g. /favicon.ico, /sitemap.xml, /robots.txt)
 */
export const config = {
  matcher: [
    "/((?!api|_next|design|.*\\..*).*)",
  ],
};

// Re-export so consumers know which paths are handled (informational; not used by Next.js).
export { PUBLIC_FILE };
