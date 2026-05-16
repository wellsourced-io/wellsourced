/**
 * matchLocale — RFC 4647 "Lookup" style Accept-Language matching.
 *
 * At MVP we only ship `en`, so every input must resolve to `en` (either via
 * positive match or fallback). The algorithm must still handle q-value
 * sorting and malformed input correctly so adding a second locale is safe.
 */

import { describe, it, expect } from "vitest";
import { matchLocale } from "@/lib/i18n/matchLocale";

describe("matchLocale", () => {
  it.each<[string | null, string]>([
    [null, "en"],
    ["", "en"],
    ["en", "en"],
    ["en-US", "en"],
    ["de-DE,en;q=0.9", "en"],
    ["fr-FR", "en"],
    ["🤷", "en"],
    ["fr;q=0.1,en;q=0.9", "en"],
  ])("matchLocale(%j) → %j", (input, expected) => {
    expect(matchLocale(input)).toBe(expected);
  });
});
