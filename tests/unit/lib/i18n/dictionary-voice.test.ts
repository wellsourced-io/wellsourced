/**
 * Voice-rule guard per FR-023 and FR-024. The dictionary MUST NOT lead any
 * surface string with the banned tokens that violate the project's voice:
 *
 *   - "Shop" (use "Find")
 *   - "Sellers" / "Stores" (use "Brands")
 *   - "Add to cart" / "Buy now" (use "Buy direct")
 *   - "Ethics score" (use "Trust data")
 *   - "Report an error" (use "Suggest an edit")
 *
 * And no editorial route label may LEAD with the moralizing tokens that
 * lose James (the primary conversion persona):
 *
 *   - "ethical", "conscious", "sustainable", "guilt-free",
 *     "Amazon alternative", "curated"
 *
 * This test reads the en.json dictionary directly and walks every string
 * value. A failure means the dictionary copy has drifted from the spec.
 */
import { describe, expect, it } from "vitest";
import dictionary from "@/lib/i18n/messages/en.json";

const BANNED_PHRASES = [
  /\bShop\b/i,
  /\bSellers\b/i,
  /\bStores\b/i,
  /\bAdd to cart\b/i,
  /\bBuy now\b/i,
  /\bEthics score\b/i,
  /\bReport an error\b/i,
];

const BANNED_LEAD_TOKENS = [
  "ethical",
  "conscious",
  "sustainable",
  "guilt-free",
  "amazon alternative",
  "curated",
];

function collectStrings(value: unknown, path: string[] = []): Array<{ path: string; value: string }> {
  const out: Array<{ path: string; value: string }> = [];
  if (typeof value === "string") {
    out.push({ path: path.join("."), value });
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      out.push(...collectStrings(v, [...path, k]));
    }
  }
  return out;
}

describe("dictionary voice rules (FR-023 / FR-024)", () => {
  const strings = collectStrings(dictionary);

  it("contains a non-trivial number of strings (sanity)", () => {
    expect(strings.length).toBeGreaterThan(20);
  });

  it("contains none of the banned phrases anywhere", () => {
    const offenders = strings.filter(({ value }) =>
      BANNED_PHRASES.some((re) => re.test(value)),
    );
    expect(offenders, JSON.stringify(offenders, null, 2)).toEqual([]);
  });

  it("does not lead any string with the moralizing tokens that lose James", () => {
    const offenders = strings.filter(({ value }) => {
      const lead = value.trim().toLowerCase();
      return BANNED_LEAD_TOKENS.some((token) => lead.startsWith(token));
    });
    expect(offenders, JSON.stringify(offenders, null, 2)).toEqual([]);
  });
});
