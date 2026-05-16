import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

interface SuggestPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ brand?: string; field?: string }>;
}

/**
 * Suggest-an-edit landing (FR-022 round-trip target).
 *
 * The auth gate in middleware ensures unauthenticated visitors are
 * redirected to `/[locale]/contribute?next=<this-path-with-query>` and
 * (eventually) returned here with the query string intact. The actual
 * form fields land with the contributor-flow feature; this page exists to
 * verify the intent-preservation contract end-to-end.
 */
export default async function SuggestEditPage({
  params,
  searchParams,
}: SuggestPageProps) {
  const { locale: paramLocale } = await params;
  const { brand, field } = await searchParams;
  const locale = (
    (locales as readonly string[]).includes(paramLocale)
      ? paramLocale
      : defaultLocale
  ) as Locale;

  const hasContext = Boolean(brand);

  return (
    <section>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {locale.toUpperCase()} · Suggest an edit
      </p>
      <h1 className="mt-3 font-display text-[1.75rem] font-semibold leading-[1.2] text-fg">
        Suggest an edit
      </h1>

      {hasContext ? (
        <p
          data-testid="suggest-context"
          className="mt-3 max-w-[58ch] text-[15px] leading-[1.6] text-muted"
        >
          Editing brand{" "}
          <span className="font-mono text-fg">{brand}</span>
          {field ? (
            <>
              , field <span className="font-mono text-fg">{field}</span>
            </>
          ) : null}
          .
        </p>
      ) : (
        <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.6] text-muted">
          Pick a brand and field from a profile page, then come back here to
          submit a correction.
        </p>
      )}

      <form
        action="#"
        method="post"
        className="mt-8 max-w-[640px] rounded-[16px] border border-border bg-surface p-6"
      >
        <input type="hidden" name="brand" value={brand ?? ""} />
        <input type="hidden" name="field" value={field ?? ""} />
        <label
          htmlFor="suggest-rationale"
          className="block text-[13px] font-medium text-fg"
        >
          What should change, and what&rsquo;s your source?
        </label>
        <textarea
          id="suggest-rationale"
          name="rationale"
          rows={6}
          placeholder="Describe the change. Paste a link to the primary source."
          className="mt-2 w-full resize-y rounded-[8px] border border-border bg-bg px-3 py-2 text-[14px] leading-[1.5] text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
        />
        <button
          type="submit"
          disabled
          className="mt-4 inline-flex h-10 items-center rounded-full bg-teal px-5 text-[14px] font-medium text-on-teal opacity-60"
        >
          Submit suggestion
        </button>
        <p className="mt-3 text-[12.5px] leading-[1.5] text-muted">
          Submission wiring ships with the contributor-flow feature.
        </p>
      </form>
    </section>
  );
}
