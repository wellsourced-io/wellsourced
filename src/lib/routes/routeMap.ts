/**
 * routeMap.ts
 *
 * Single source of truth for WellSourced information architecture.
 * Read by header, footer, breadcrumbs, sitemap, and the build-time
 * navigation-graph check (SC-003).
 *
 * Per spec 001-ia-navigation §FR-001 and data-model.md §1:
 * - `path` does NOT include the locale prefix (locale is applied at
 *   render time / by middleware).
 * - 15 routes in total, matching FR-001 verbatim.
 * - Header cluster (`headerNav: true`) MUST contain exactly 4 entries:
 *   Find, Brands, Categories, About (FR-005).
 *
 * Pure, framework-free module: no React, no Next.js, no I/O.
 */

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type SectionId =
  | "discover"
  | "profile"
  | "operator"
  | "contribute"
  | "about"
  | "system";

export type FooterGroup =
  | "discover"
  | "contribute"
  | "about"
  | "operators"
  | "system";

export type RenderMode = "static" | "ssr" | "authenticated";

export type Persona =
  | "james"
  | "maya"
  | "priya"
  | "elena"
  | "contributor"
  | "all";

export type RouteId =
  | "home"
  | "search"
  | "brands"
  | "brand"
  | "brand-products"
  | "categories"
  | "category"
  | "submit"
  | "for-brands"
  | "contribute"
  | "admin"
  | "about"
  | "manifesto"
  | "donate"
  | "design";

export type Page = {
  id: RouteId;
  path: string;
  section: SectionId;
  headerNav: boolean;
  footerGroup: FooterGroup | null;
  renderMode: RenderMode;
  primaryPersona: Persona;
  stickyHeader: boolean;
  headerSurface: "sand" | "white";
  requiresAuth: boolean;
  requiresEstablishedContributor: boolean;
};

// -----------------------------------------------------------------------------
// Seed data — matches data-model.md §1 "Initial seed" verbatim.
// -----------------------------------------------------------------------------

export const routeMap: Page[] = [
  { id: "home",            path: "/",                        section: "discover",   headerNav: false, footerGroup: null,         renderMode: "static",        primaryPersona: "james",       stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
  { id: "search",          path: "/search",                  section: "discover",   headerNav: true,  footerGroup: "discover",   renderMode: "ssr",           primaryPersona: "james",       stickyHeader: true,  headerSurface: "white", requiresAuth: false, requiresEstablishedContributor: false },
  { id: "brands",          path: "/brands",                  section: "discover",   headerNav: true,  footerGroup: "discover",   renderMode: "static",        primaryPersona: "priya",       stickyHeader: false, headerSurface: "white", requiresAuth: false, requiresEstablishedContributor: false },
  { id: "brand",           path: "/brand/[slug]",            section: "profile",    headerNav: false, footerGroup: null,         renderMode: "static",        primaryPersona: "maya",        stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
  { id: "brand-products",  path: "/brand/[slug]/products",   section: "profile",    headerNav: false, footerGroup: null,         renderMode: "static",        primaryPersona: "maya",        stickyHeader: false, headerSurface: "white", requiresAuth: false, requiresEstablishedContributor: false },
  { id: "categories",      path: "/categories",              section: "discover",   headerNav: true,  footerGroup: "discover",   renderMode: "static",        primaryPersona: "priya",       stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
  { id: "category",        path: "/c/[slug]",                section: "discover",   headerNav: false, footerGroup: null,         renderMode: "static",        primaryPersona: "priya",       stickyHeader: true,  headerSurface: "white", requiresAuth: false, requiresEstablishedContributor: false },
  { id: "submit",          path: "/submit",                  section: "operator",   headerNav: false, footerGroup: "contribute", renderMode: "static",        primaryPersona: "elena",       stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
  { id: "for-brands",      path: "/for-brands",              section: "operator",   headerNav: false, footerGroup: "operators",  renderMode: "static",        primaryPersona: "elena",       stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
  { id: "contribute",      path: "/contribute",              section: "contribute", headerNav: false, footerGroup: "contribute", renderMode: "static",        primaryPersona: "contributor", stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
  { id: "admin",           path: "/admin",                   section: "contribute", headerNav: false, footerGroup: null,         renderMode: "authenticated", primaryPersona: "contributor", stickyHeader: false, headerSurface: "white", requiresAuth: true,  requiresEstablishedContributor: true  },
  { id: "about",           path: "/about",                   section: "about",      headerNav: true,  footerGroup: "about",      renderMode: "static",        primaryPersona: "all",         stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
  { id: "manifesto",       path: "/manifesto",               section: "about",      headerNav: false, footerGroup: "about",      renderMode: "static",        primaryPersona: "all",         stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
  { id: "donate",          path: "/donate",                  section: "about",      headerNav: false, footerGroup: "about",      renderMode: "static",        primaryPersona: "all",         stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
  { id: "design",          path: "/design",                  section: "system",     headerNav: false, footerGroup: "system",     renderMode: "static",        primaryPersona: "contributor", stickyHeader: false, headerSurface: "sand",  requiresAuth: false, requiresEstablishedContributor: false },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Strip a leading `/[locale]` segment from a pathname (if present).
 *
 * The locale segment is treated as the first non-empty path segment.
 * Anything more sophisticated (validating against the supported-locale list)
 * belongs in the i18n module — this helper keeps routes/ framework-free.
 *
 * Examples:
 *   "/en/brand/patagonia"  -> "/brand/patagonia"
 *   "/en"                  -> "/"
 *   "/en/"                 -> "/"
 *   "/brand/patagonia"     -> "/brand/patagonia"
 *   "/"                    -> "/"
 *   ""                     -> "/"
 */
function stripLocale(pathname: string): string {
  if (!pathname || pathname === "/") return "/";

  const trimmed = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const [first, ...rest] = trimmed.split("/");

  // A locale segment is short, lowercase letters only (e.g., "en", "en-us").
  // Anything else (e.g., "brand", "search") is treated as a real path segment.
  const looksLikeLocale = /^[a-z]{2}(-[a-z]{2})?$/i.test(first);
  if (!looksLikeLocale) {
    return "/" + trimmed;
  }

  if (rest.length === 0) return "/";
  return "/" + rest.join("/");
}

/**
 * Convert a route map `path` (with `[slug]` segments) into a RegExp that
 * matches concrete URLs.
 *
 *   "/brand/[slug]"          -> /^\/brand\/[^/]+$/
 *   "/brand/[slug]/products" -> /^\/brand\/[^/]+\/products$/
 *   "/"                      -> /^\/$/
 */
function pathToRegex(path: string): RegExp {
  const escaped = path
    .replace(/[.+^${}()|\\]/g, "\\$&") // escape regex metacharacters except [ ]
    .replace(/\[[^\]]+\]/g, "[^/]+"); // replace [slug] with [^/]+
  return new RegExp("^" + escaped + "$");
}

/**
 * Header-cluster active-state inference (R10).
 *
 * Strategy:
 *   1. Strip the optional leading locale segment.
 *   2. The homepage "/" maps to the `discover` section (Find).
 *   3. Otherwise, longest-prefix match against the routeMap. The matched
 *      entry's `section` is returned.
 *   4. If nothing matches, return null.
 *
 * Longest-prefix is computed by comparing the literal prefix of each
 * route map entry (with `[slug]` segments collapsed to a single token).
 * This handles overlaps correctly:
 *
 *   /brand/patagonia          → matches "/brand/[slug]" → "profile"
 *   /brand/patagonia/products → matches "/brand/[slug]/products" → "profile"
 *   /search?q=cotton          → matches "/search" → "discover"
 */
export function getActiveSection(pathname: string): SectionId | null {
  // Drop any query string / hash before matching.
  const queryIndex = pathname.search(/[?#]/);
  const cleanPath = queryIndex === -1 ? pathname : pathname.slice(0, queryIndex);

  const stripped = stripLocale(cleanPath);

  // Homepage is special-cased to the Find/Discover section.
  if (stripped === "/") {
    return "discover";
  }

  // Find every routeMap entry whose path-pattern matches the full pathname,
  // then prefer the one with the longest literal prefix (most specific).
  let bestMatch: Page | null = null;
  let bestPrefixLength = -1;

  for (const page of routeMap) {
    // We only care about routes that participate in section semantics.
    // The homepage is excluded from the loop because `/` would prefix-match
    // every path; we've handled it above.
    if (page.path === "/") continue;

    const regex = pathToRegex(page.path);
    if (!regex.test(stripped)) continue;

    // Length of the literal (non-dynamic) prefix is a proxy for specificity.
    const literalPrefix = page.path.split("[")[0];
    if (literalPrefix.length > bestPrefixLength) {
      bestPrefixLength = literalPrefix.length;
      bestMatch = page;
    }
  }

  return bestMatch ? bestMatch.section : null;
}

/**
 * The 4-link primary header cluster (FR-005).
 *
 * Invariant: this list contains EXACTLY 4 entries — Find/Search, Brands,
 * Categories, About — and is consumed by the `<NavBar>` component.
 */
export function headerNavRoutes(): Page[] {
  return routeMap.filter((page) => page.headerNav);
}

/**
 * Footer groups, keyed by FooterGroup id.
 *
 * Pages with `footerGroup: null` are excluded (they are accessible via
 * other means — e.g., contextual links or auth-gated redirects).
 */
export function footerGroups(): Record<FooterGroup, Page[]> {
  const groups: Record<FooterGroup, Page[]> = {
    discover: [],
    contribute: [],
    about: [],
    operators: [],
    system: [],
  };
  for (const page of routeMap) {
    if (page.footerGroup === null) continue;
    groups[page.footerGroup].push(page);
  }
  return groups;
}

/**
 * Look up a route map entry by a concrete (possibly locale-prefixed) pathname.
 *
 * Used by AppShell to read render policy (stickyHeader, headerSurface,
 * requiresAuth, etc.) for the current request.
 *
 * Returns null if no entry matches.
 */
export function getPageByPath(pathname: string): Page | null {
  const queryIndex = pathname.search(/[?#]/);
  const cleanPath = queryIndex === -1 ? pathname : pathname.slice(0, queryIndex);
  const stripped = stripLocale(cleanPath);

  // Exact match first (cheap, covers the homepage and all static routes).
  for (const page of routeMap) {
    if (page.path === stripped) return page;
  }

  // Then dynamic-segment matches, picking the longest literal prefix.
  let bestMatch: Page | null = null;
  let bestPrefixLength = -1;
  for (const page of routeMap) {
    if (!page.path.includes("[")) continue;
    const regex = pathToRegex(page.path);
    if (!regex.test(stripped)) continue;
    const literalPrefix = page.path.split("[")[0];
    if (literalPrefix.length > bestPrefixLength) {
      bestPrefixLength = literalPrefix.length;
      bestMatch = page;
    }
  }
  return bestMatch;
}
