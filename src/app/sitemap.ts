import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { routeMap } from "@/lib/routes/routeMap";
import { EXAMPLE_BRANDS } from "@/lib/brands/exampleBrands";
import { CATEGORIES } from "@/lib/data/categories";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wellsourced.io";

/**
 * sitemap.xml — every statically generated route × every locale, plus the
 * dynamic instances enumerated by `generateStaticParams`. The chrome SSG
 * routes (FR-003) all appear here so search engines can crawl them.
 *
 * Hreflang alternates are emitted via FR-030 in each page's metadata; this
 * sitemap focuses on URL discovery.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Static routes from the route map (skip dynamic [slug] templates and
  // authenticated pages).
  const staticPaths = routeMap
    .filter(
      (p) =>
        p.renderMode === "static" && !p.path.includes("["),
    )
    .map((p) => p.path);

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: localeUrl(locale, path),
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "/" ? 1.0 : 0.7,
      });
    }
  }

  // Dynamic brand pages
  for (const locale of locales) {
    for (const brand of EXAMPLE_BRANDS) {
      entries.push({
        url: localeUrl(locale, `/brand/${brand.slug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
      entries.push({
        url: localeUrl(locale, `/brand/${brand.slug}/products`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  // Dynamic category pages
  for (const locale of locales) {
    for (const cat of CATEGORIES) {
      entries.push({
        url: localeUrl(locale, `/c/${cat.slug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}

function localeUrl(locale: string, path: string): string {
  const segment = path === "/" ? "" : path;
  // Homepage of default locale gets the bare site URL; other locales get
  // their prefix even at the root.
  if (path === "/" && locale === defaultLocale) {
    return `${SITE_URL}/${locale}`;
  }
  return `${SITE_URL}/${locale}${segment}`;
}
