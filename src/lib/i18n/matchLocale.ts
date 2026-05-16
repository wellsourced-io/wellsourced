/**
 * Accept-Language → best-match locale resolution.
 *
 * Implements an RFC 4647 §3.4 ("Lookup") style match against the app's
 * configured `locales`:
 *
 *   1. Parse the Accept-Language header into `(tag, q)` pairs.
 *   2. Sort by q-value descending; missing q defaults to 1.0; invalid q is
 *      treated as 0 (per RFC 7231 §5.3.1).
 *   3. For each tag in q-order, prefix-match against `locales` on the
 *      primary subtag (case-insensitive). The first hit wins.
 *   4. If nothing matches, return `defaultLocale`.
 *
 * Pure function. No I/O. Edge-runtime safe.
 *
 * At MVP — with only `en` configured — the return value is effectively
 * always `en`, but the algorithm is correct for future locales.
 */

import { defaultLocale, locales, type Locale } from "./config";

interface ParsedTag {
  tag: string;
  q: number;
  order: number;
}

/**
 * Parse a single Accept-Language token like `"en-US;q=0.8"` into a
 * `(tag, q)` pair. Returns `null` if the token is malformed or has q=0.
 */
function parseToken(token: string, order: number): ParsedTag | null {
  const trimmed = token.trim();
  if (trimmed === "") return null;

  const parts = trimmed.split(";");
  const rawTag = parts[0]?.trim();
  if (rawTag === undefined || rawTag === "") return null;

  // The wildcard `*` is the lowest-priority fallback; we treat it as a
  // signal to fall through to defaultLocale (so we just drop it here).
  if (rawTag === "*") return null;

  let q = 1;
  for (let i = 1; i < parts.length; i++) {
    const param = parts[i]?.trim();
    if (param === undefined) continue;
    if (param.startsWith("q=") || param.startsWith("Q=")) {
      const raw = param.slice(2);
      const parsed = Number.parseFloat(raw);
      // RFC 7231: q values are between 0 and 1; anything else is invalid.
      if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) {
        q = parsed;
      } else {
        q = 0;
      }
    }
  }

  if (q <= 0) return null;

  return { tag: rawTag.toLowerCase(), q, order };
}

/**
 * Return the primary subtag (the segment before the first `-`).
 * E.g. `"en-us"` → `"en"`, `"zh-hant-tw"` → `"zh"`.
 */
function primarySubtag(tag: string): string {
  const dash = tag.indexOf("-");
  return dash === -1 ? tag : tag.slice(0, dash);
}

export function matchLocale(acceptLanguage: string | null): Locale {
  if (acceptLanguage === null || acceptLanguage === "") return defaultLocale;

  const parsed: ParsedTag[] = [];
  const tokens = acceptLanguage.split(",");
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === undefined) continue;
    const p = parseToken(token, i);
    if (p !== null) parsed.push(p);
  }

  if (parsed.length === 0) return defaultLocale;

  // Stable sort by q desc, falling back to original order asc to preserve
  // the client's stated preference among equal-q entries.
  parsed.sort((a, b) => {
    if (b.q !== a.q) return b.q - a.q;
    return a.order - b.order;
  });

  const lowerLocales = locales.map((l) => l.toLowerCase());

  for (const candidate of parsed) {
    const candidatePrimary = primarySubtag(candidate.tag);
    for (let i = 0; i < lowerLocales.length; i++) {
      const localePrimary = primarySubtag(lowerLocales[i]!);
      if (candidatePrimary === localePrimary) {
        // Return the canonical-cased locale from `locales`.
        return locales[i]!;
      }
    }
  }

  return defaultLocale;
}
