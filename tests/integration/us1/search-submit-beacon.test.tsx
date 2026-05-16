/**
 * US1 — verifies that the hero search form emits a `search_submit` beacon
 * on submission, with anonymized meta (query_length only, never the query).
 *
 * Renders the HeroSearchForm in isolation with a mocked Next.js router and
 * a stubbed beacon transport.
 */
import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const { pushMock, sendEventMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  sendEventMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/lib/analytics/beacon", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/analytics/beacon")>(
      "@/lib/analytics/beacon",
    );
  return {
    ...actual,
    sendEvent: sendEventMock,
  };
});

import { HeroSearchForm } from "@/components/nav/HeroSearchForm";

describe("US1 — search_submit beacon on hero submission", () => {
  beforeEach(() => {
    pushMock.mockReset();
    sendEventMock.mockReset();
  });

  it("emits search_submit with anonymized query_length (not the query)", () => {
    render(<HeroSearchForm locale="en" placeholder="Search…" />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "organic cotton t-shirt" } });

    const form = input.closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(sendEventMock).toHaveBeenCalledOnce();
    const event = sendEventMock.mock.calls[0]![0] as {
      name: string;
      meta: { query_length: number; has_filters: boolean };
    };
    expect(event.name).toBe("search_submit");
    expect(event.meta.query_length).toBe("organic cotton t-shirt".length);
    expect(event.meta.has_filters).toBe(false);
    // Anonymization sanity check — the meta must NEVER contain raw query text.
    expect(JSON.stringify(event)).not.toContain("organic cotton");
  });

  it("navigates to /[locale]/search?q=... on submit", () => {
    render(<HeroSearchForm locale="en" placeholder="Search…" />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "shoes" } });

    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(pushMock).toHaveBeenCalledOnce();
    const target = pushMock.mock.calls[0]![0] as string;
    expect(target).toBe("/en/search?q=shoes");
  });

  it("does not emit beacon or navigate when the input is empty", () => {
    render(<HeroSearchForm locale="en" placeholder="Search…" />);

    const input = screen.getByRole("searchbox");
    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(sendEventMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
