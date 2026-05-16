/**
 * beacon — R5 / FR-036.
 *
 * The beacon is fire-and-forget: it MUST NOT throw, MUST NOT block, and
 * MUST gracefully degrade through (sendBeacon → fetch keepalive → no-op).
 * The wire payload uses `event_name` per the OpenAPI contract.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  sendEvent,
  getViewportBucket,
  getReferrerCategory,
} from "@/lib/analytics/beacon";
import type { PageViewEvent } from "@/lib/analytics/events";

const VALID_EVENT: PageViewEvent = {
  name: "page_view",
  path: "/en/search",
  viewport_bucket: "desktop",
  referrer_category: "direct",
};

type BeaconFn = (url: string, data?: BodyInit | null) => boolean;

function setSendBeacon(fn: BeaconFn | undefined): void {
  // jsdom defines `sendBeacon` (or lack thereof) on the Navigator prototype;
  // defineProperty lets us stub it per-test without replacing the whole object.
  if (fn === undefined) {
    Object.defineProperty(navigator, "sendBeacon", {
      value: undefined,
      writable: true,
      configurable: true,
    });
    return;
  }
  Object.defineProperty(navigator, "sendBeacon", {
    value: fn,
    writable: true,
    configurable: true,
  });
}

describe("sendEvent", () => {
  let originalFetch: typeof globalThis.fetch | undefined;
  let originalSendBeacon: unknown;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    originalSendBeacon = (
      navigator as Navigator & { sendBeacon?: BeaconFn }
    ).sendBeacon;
  });

  afterEach(() => {
    Object.defineProperty(navigator, "sendBeacon", {
      value: originalSendBeacon,
      writable: true,
      configurable: true,
    });
    if (originalFetch === undefined) {
      // @ts-expect-error — restore to absent
      delete globalThis.fetch;
    } else {
      globalThis.fetch = originalFetch;
    }
    vi.restoreAllMocks();
  });

  it("returns void synchronously and never throws", () => {
    setSendBeacon(vi.fn(() => true));
    expect(sendEvent(VALID_EVENT)).toBeUndefined();
  });

  it("does NOT call fetch when sendBeacon returns true", () => {
    const beacon = vi.fn(() => true);
    setSendBeacon(beacon);
    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy as unknown as typeof globalThis.fetch;

    sendEvent(VALID_EVENT);

    expect(beacon).toHaveBeenCalledOnce();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("falls back to fetch (keepalive: true) when sendBeacon returns false", () => {
    setSendBeacon(vi.fn(() => false));
    const fetchSpy = vi.fn(() => Promise.resolve(new Response()));
    globalThis.fetch = fetchSpy as unknown as typeof globalThis.fetch;

    sendEvent(VALID_EVENT);

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, init] = (fetchSpy.mock.calls[0] ?? []) as unknown as [string, RequestInit];
    expect(url).toBe("/api/events");
    expect(init.method).toBe("POST");
    expect(init.keepalive).toBe(true);
  });

  it("falls back to fetch when sendBeacon throws", () => {
    setSendBeacon(
      vi.fn(() => {
        throw new Error("payload too large");
      }),
    );
    const fetchSpy = vi.fn(() => Promise.resolve(new Response()));
    globalThis.fetch = fetchSpy as unknown as typeof globalThis.fetch;

    expect(() => sendEvent(VALID_EVENT)).not.toThrow();
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it("does not throw when sendBeacon is absent and fetch is unavailable", () => {
    setSendBeacon(undefined);
    // Simulate a hostile environment where the fetch call itself fails.
    // (Deleting globalThis.fetch isn't always honoured by jsdom, so we
    // replace it with a throwing stub instead.)
    globalThis.fetch = (() => {
      throw new Error("fetch unavailable");
    }) as unknown as typeof globalThis.fetch;
    expect(() => sendEvent(VALID_EVENT)).not.toThrow();
  });

  it("serializes wire body with event_name (not name) per the OpenAPI contract", () => {
    // Force the fetch-fallback path so the body is a synchronous string.
    setSendBeacon(vi.fn(() => false));
    const fetchSpy = vi.fn(() => Promise.resolve(new Response()));
    globalThis.fetch = fetchSpy as unknown as typeof globalThis.fetch;

    sendEvent(VALID_EVENT);

    const [, init] = (fetchSpy.mock.calls[0] ?? []) as unknown as [string, RequestInit];
    const body = init.body as string;
    const parsed = JSON.parse(body) as Record<string, unknown>;
    expect(parsed.event_name).toBe("page_view");
    expect(parsed).not.toHaveProperty("name");
  });
});

describe("getViewportBucket", () => {
  let originalWidth: number;

  beforeEach(() => {
    originalWidth = window.innerWidth;
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      value: originalWidth,
      writable: true,
      configurable: true,
    });
  });

  function withWidth(width: number): void {
    // jsdom defines `innerWidth` as a getter on the Window prototype.
    // Use defineProperty so reads return our test value.
    Object.defineProperty(window, "innerWidth", {
      value: width,
      writable: true,
      configurable: true,
    });
  }

  it("767 → mobile (boundary just below 768)", () => {
    withWidth(767);
    expect(getViewportBucket()).toBe("mobile");
  });

  it("768 → tablet (boundary at 768)", () => {
    withWidth(768);
    expect(getViewportBucket()).toBe("tablet");
  });

  it("1023 → tablet (boundary just below 1024)", () => {
    withWidth(1023);
    expect(getViewportBucket()).toBe("tablet");
  });

  it("1024 → desktop (boundary at 1024)", () => {
    withWidth(1024);
    expect(getViewportBucket()).toBe("desktop");
  });
});

describe("getReferrerCategory", () => {
  it("empty string → direct", () => {
    expect(getReferrerCategory("")).toBe("direct");
  });

  it("google.com → search_engine", () => {
    expect(
      getReferrerCategory(
        "https://google.com/search?q=x",
        "https://wellsourced.io",
      ),
    ).toBe("search_engine");
  });

  it("same origin → internal", () => {
    expect(
      getReferrerCategory(
        "https://wellsourced.io/foo",
        "https://wellsourced.io",
      ),
    ).toBe("internal");
  });

  it("different origin → external", () => {
    expect(
      getReferrerCategory("https://example.com", "https://wellsourced.io"),
    ).toBe("external");
  });

  it("malformed URL → external (does not throw)", () => {
    expect(getReferrerCategory("not-a-url", undefined)).toBe("external");
  });
});

