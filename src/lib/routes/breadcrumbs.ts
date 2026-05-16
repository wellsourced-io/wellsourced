/**
 * breadcrumbs.ts
 *
 * Derives the "back-link" breadcrumb trail for a given pathname per
 * spec 001-ia-navigation §FR-017 and data-model.md §5.
 *
 * Per FR-017, the breadcrumb pattern is "← Parent" (back-link), not a
 * chain of separators. Arrays of length 1 are the common case; length > 1
 * is reserved for `/admin/*` sub-pages.
 *
 * Only routes nested below a parent get a trail. All other routes
 * (homepage, top-level destinations, brand profile root, etc.) return [].
 *
 * Pure function: no React, no Next.js, no I/O.
 */

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type Breadcrumb = {
  /** Visible label — either from the dictionary or a dynamic value (brand name). */
  label: string;
  /** Absolute href INCLUDING the locale prefix, e.g. "/en/brand/patagonia". */
  href: string;
};

/**
 * Dictionary shape consumed by `getBreadcrumbTrail`. We intentionally accept
 * only the slice of the full Dictionary we need, so callers can pass a
 * narrowed object in tests without constructing the whole tree.
 */
export type BreadcrumbDictionary = {
  routes: Record<string, { label: string }>;
  breadcrumb: { backTo: string };
};

/**
 * Optional dynamic label overrides keyed by a well-known token.
 *
 *   `brand` — overrides the brand-profile crumb label
 *             (e.g., "Patagonia" rather than the slug).
 */
export type DynamicLabels = {
  brand?: string;
};

// -----------------------------------------------------------------------------
// Internal helpers
// -----------------------------------------------------------------------------

/**
 * Split a pathname into [locale, ...segments].
 *
 *   "/en/brand/patagonia/products" -> ["en", "brand", "patagonia", "products"]
 *   "/en"                          -> ["en"]
 *   "/en/"                         -> ["en"]
 *   "/"                            -> [""]
 *
 * The locale is always the first non-empty segment. Callers MUST pass a
 * locale-prefixed path — the public API in this project always does.
 */
function splitPath(pathname: string): string[] {
  const cleaned = pathname.replace(/[?#].*$/, "");
  const trimmed = cleaned.replace(/^\/+|\/+$/g, "");
  if (trimmed === "") return [""];
  return trimmed.split("/");
}

/**
 * Humanize an `/admin/*` sub-segment for display in the breadcrumb trail
 * when the dictionary has no specific label for it.
 *
 *   "edits"            -> "Edits"
 *   "review-queue"     -> "Review queue"
 */
function humanizeSegment(segment: string): string {
  if (!segment) return "";
  const withSpaces = segment.replace(/-/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Compute the breadcrumb trail for a given (locale-prefixed) pathname.
 *
 * Derivation rules (data-model.md §5):
 *
 *   /[locale]/                          → []
 *   /[locale]/search                    → []
 *   /[locale]/brands                    → []
 *   /[locale]/brand/[slug]              → []   (top-level destination)
 *   /[locale]/brand/[slug]/products     → [{ label: dynamicLabels.brand ?? slug,
 *                                            href:  /[locale]/brand/[slug] }]
 *   /[locale]/categories                → []
 *   /[locale]/c/[slug]                  → [{ label: dictionary.routes.categories.label,
 *                                            href:  /[locale]/categories }]
 *   /[locale]/admin                     → []
 *   /[locale]/admin/<sub>/...           → [{ label: dictionary.routes.admin.label,
 *                                            href:  /[locale]/admin },
 *                                          ...further crumbs ...]
 *   <everything else>                   → []
 *
 * The function preserves the locale prefix in returned hrefs so chrome can
 * link directly without re-prefixing.
 */
export function getBreadcrumbTrail(
  pathname: string,
  dictionary: BreadcrumbDictionary,
  dynamicLabels?: DynamicLabels,
): Breadcrumb[] {
  const segments = splitPath(pathname);

  // A valid IA path must have a locale + at least one route segment.
  if (segments.length < 2 || segments[0] === "") return [];

  const locale = segments[0];
  const route = segments.slice(1);

  // ---- /[locale]/brand/[slug]/products -------------------------------------
  // Parent = the brand profile itself.
  if (
    route.length === 3 &&
    route[0] === "brand" &&
    route[2] === "products"
  ) {
    const slug = route[1];
    const label = dynamicLabels?.brand ?? slug;
    return [
      {
        label,
        href: `/${locale}/brand/${slug}`,
      },
    ];
  }

  // ---- /[locale]/c/[slug] --------------------------------------------------
  // Parent = the categories index. Per spec, the referrer-based suppression
  // is out of scope here — we always emit the crumb when the route matches.
  if (route.length === 2 && route[0] === "c") {
    const categoriesLabel =
      dictionary.routes.categories?.label ?? "Categories";
    return [
      {
        label: categoriesLabel,
        href: `/${locale}/categories`,
      },
    ];
  }

  // ---- /[locale]/admin/<sub>/... ------------------------------------------
  // Always anchor on the admin workspace; append crumbs for each intermediate
  // segment (excluding the final one, which represents the current page).
  if (route.length >= 2 && route[0] === "admin") {
    const adminLabel = dictionary.routes.admin?.label ?? "Workspace";
    const trail: Breadcrumb[] = [
      {
        label: adminLabel,
        href: `/${locale}/admin`,
      },
    ];

    // Intermediate segments: everything between `admin` and the final segment.
    // For /admin/edits/123 → intermediate = ['edits'].
    const intermediate = route.slice(1, route.length - 1);
    let cumulative = `/${locale}/admin`;
    for (const segment of intermediate) {
      cumulative += `/${segment}`;
      const dictKey = `admin-${segment}`;
      const label =
        dictionary.routes[dictKey]?.label ?? humanizeSegment(segment);
      trail.push({ label, href: cumulative });
    }

    return trail;
  }

  // All other paths get no breadcrumb trail.
  return [];
}
