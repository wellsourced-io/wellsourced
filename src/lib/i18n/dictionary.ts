/**
 * Dictionary types and loader.
 *
 * `Dictionary` is the typed contract for all i18n message files. Each
 * locale's JSON in `./messages/<locale>.json` must satisfy this shape;
 * TypeScript's `resolveJsonModule` import is widened back to this type by
 * the loader so consumers get exhaustive key checking.
 *
 * `getDictionary(locale)` dynamically imports the locale's JSON and caches
 * it per-locale for the lifetime of the module (effectively per server
 * worker / per request lifecycle in Next.js). Repeated calls during a
 * single render return the same object without re-importing.
 */

import type { Locale } from "./config";

/**
 * The set of route ids that must exist in `Dictionary.routes`. Mirrors the
 * route map seed in `specs/001-ia-navigation/data-model.md` §1 — keep in
 * sync with `src/lib/routes/routeMap.ts` once that module lands.
 */
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

export interface RouteCopy {
  label: string;
  description?: string;
}

export interface Dictionary {
  nav: {
    find: string;
    brands: string;
    categories: string;
    about: string;
  };
  footer: {
    discover: string;
    contribute: string;
    about: string;
    operators: string;
    system: string;
    tagline: string;
  };
  routes: Record<RouteId, RouteCopy>;
  drawer: {
    open: string;
    close: string;
    searchPlaceholder: string;
  };
  theme: {
    label: string;
    system: string;
    light: string;
    dark: string;
  };
  account: {
    signIn: string;
    myContributions: string;
    workspace: string;
    settings: string;
    signOut: string;
    avatarLabel: string;
  };
  breadcrumb: {
    /** Pattern `"← {0}"` — caller substitutes the parent label. */
    backTo: string;
  };
  errors: {
    notFound: {
      title: string;
      lede: string;
      ctaSearch: string;
      ctaBrowse: string;
    };
    serverError: {
      title: string;
      lede: string;
    };
  };
  localeName: string;
}

/**
 * Process-wide cache of loaded dictionaries. A Map keyed by Locale so the
 * dynamic import for each locale happens at most once per worker.
 */
const cache = new Map<Locale, Dictionary>();

/**
 * Load the dictionary for `locale`. Uses dynamic import so each locale's
 * JSON is its own chunk and unused locales never reach the runtime.
 *
 * The dynamic import returns a module namespace whose `default` export is
 * typed by TypeScript as a wide JSON value; we cast through `unknown` to
 * `Dictionary` because the contract is enforced separately by tests
 * (`dictionary-voice.test.ts`, `routeMap.test.ts`).
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const cached = cache.get(locale);
  if (cached !== undefined) return cached;

  const mod = (await import(`./messages/${locale}.json`)) as {
    default: unknown;
  };

  const dict = mod.default as Dictionary;
  cache.set(locale, dict);
  return dict;
}
