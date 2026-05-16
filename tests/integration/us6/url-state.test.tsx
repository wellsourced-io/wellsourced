/**
 * US6 — URL state shareability (FR-018 / SC-005).
 *
 * Component-level verification that filter state round-trips through the
 * URL: the ActiveFilters component reads chips from `useSearchParams()`,
 * and clicking remove pushes a new URL without the removed value. Full
 * browser back/forward behavior is a Next.js + browser concern, exercised
 * end-to-end in Playwright (future Phase 9 task).
 */
import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const { pushMock, sendEventMock, searchParamsState } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  sendEventMock: vi.fn(),
  searchParamsState: { value: new URLSearchParams() },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => searchParamsState.value,
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

import { ActiveFilters } from "@/components/nav/ActiveFilters";

describe("US6 — ActiveFilters: URL state round-trip", () => {
  beforeEach(() => {
    pushMock.mockReset();
    sendEventMock.mockReset();
    searchParamsState.value = new URLSearchParams();
  });

  it("renders nothing when no multi-value filters are active", () => {
    const { container } = render(<ActiveFilters pathname="/en/search" />);
    expect(container.querySelector("ul")).toBeNull();
  });

  it("renders one chip per active multi-value filter", () => {
    searchParamsState.value = new URLSearchParams(
      "category=clothing&category=footwear&ownership=worker owned",
    );
    render(<ActiveFilters pathname="/en/search" />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(
      screen.getByRole("button", { name: /remove filter category: clothing/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /remove filter category: footwear/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /remove filter ownership: worker owned/i,
      }),
    ).toBeInTheDocument();
  });

  it("clicking remove pushes a URL with just that value gone", () => {
    searchParamsState.value = new URLSearchParams(
      "category=clothing&category=footwear",
    );
    render(<ActiveFilters pathname="/en/search" />);
    fireEvent.click(
      screen.getByRole("button", { name: /remove filter category: clothing/i }),
    );
    expect(pushMock).toHaveBeenCalledOnce();
    const target = pushMock.mock.calls[0]![0] as string;
    // footwear remains; clothing is gone
    expect(target).toMatch(/category=footwear/);
    expect(target).not.toMatch(/category=clothing/);
  });

  it("emits a filter_remove beacon with the chip identity (never the URL query)", () => {
    searchParamsState.value = new URLSearchParams(
      "ownership=worker owned&q=will-be-ignored",
    );
    render(<ActiveFilters pathname="/en/search" />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /remove filter ownership: worker owned/i,
      }),
    );
    expect(sendEventMock).toHaveBeenCalledOnce();
    const event = sendEventMock.mock.calls[0]![0] as {
      name: string;
      meta: { filter_name: string; filter_count: number };
    };
    expect(event.name).toBe("filter_remove");
    expect(event.meta.filter_name).toBe("ownership:worker owned");
    // q text must never leak into the beacon
    expect(JSON.stringify(event)).not.toContain("will-be-ignored");
  });

  it("preserves the q query parameter when removing a multi-value filter", () => {
    searchParamsState.value = new URLSearchParams(
      "q=shirts&category=clothing&category=footwear",
    );
    render(<ActiveFilters pathname="/en/search" />);
    fireEvent.click(
      screen.getByRole("button", { name: /remove filter category: clothing/i }),
    );
    const target = pushMock.mock.calls[0]![0] as string;
    expect(target).toMatch(/q=shirts/);
  });

  it("uses scroll:false on push to avoid jumping to top when removing a chip", () => {
    searchParamsState.value = new URLSearchParams("category=clothing");
    render(<ActiveFilters pathname="/en/search" />);
    fireEvent.click(
      screen.getByRole("button", { name: /remove filter category: clothing/i }),
    );
    const options = pushMock.mock.calls[0]![1] as { scroll?: boolean };
    expect(options.scroll).toBe(false);
  });
});
