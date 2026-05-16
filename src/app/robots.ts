import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wellsourced.io";

/**
 * robots.txt — allow all consumer routes, block private surfaces:
 *   - /api/*       internal API routes (instrumentation, future auth)
 *   - /admin/*     contributor workspace (auth-gated; no value to crawl)
 *
 * The chrome's locale-prefixed paths are explicitly NOT in the disallow
 * list — search engines should crawl `/en/...` and follow hreflang to any
 * additional locales added later.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*/admin/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
