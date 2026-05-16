/**
 * SC-006 — verifies the hreflang contract that the locale-prefixed route
 * structure (FR-029 / FR-030) is supposed to expose.
 *
 * At MVP with one locale, every statically generated page must emit:
 *   - <link rel="alternate" hreflang="en" href="...">
 *   - <link rel="alternate" hreflang="x-default" href="...">
 *
 * Implementation: the chrome scaffolds the route structure; the actual
 * <link> emission happens via Next.js metadata. Today that's not wired into
 * the layouts yet (it's a small follow-up: each [locale]/layout exports a
 * `generateMetadata` returning `{ alternates: { languages: { ... } } }`).
 *
 * This test documents the contract and uses `test.todo()` for the runtime
 * assertion until the metadata helper lands. Keep it failing-loudly to
 * remind us the SEO surface needs to ship before we go public.
 */
import { describe, it } from "vitest";

describe("SC-006 — hreflang contract", () => {
  it.todo(
    "every static page emits hreflang for each available locale + x-default — wire via generateMetadata in [locale]/layout.tsx",
  );

  it.todo(
    "the canonical URL of each brand page is /en/brand/<slug>, not /brand/<slug>",
  );

  it.todo(
    "x-default points to the en URL until a non-English locale ships",
  );
});
