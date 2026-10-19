import { afterEach, describe, expect, it, vi } from "vitest";

// The handler reads env at import time, so set it before importing.
process.env.HOSTAWAY_TOKEN = "test-token";
process.env.HOSTAWAY_API_BASE = "https://api.hostaway.test/v1";
const { default: handler, normalizeHostawayReview } = await import("../api/reviews");

const hostawayPage = (result: unknown[]) =>
  new Response(JSON.stringify({ status: "success", result }), { headers: { "content-type": "application/json" } });

afterEach(() => vi.unstubAllGlobals());

describe("normalizeHostawayReview", () => {
  it("maps category objects and keeps a missing overall rating as null", () => {
    const r = normalizeHostawayReview({ id: "42", categories: { cleanliness: 9, communication: "8" }, guestFirstName: "Ana" });
    expect(r).toMatchObject({
      id: 42,
      rating: null,
      guestName: "Ana",
      submittedAt: "",
      reviewCategory: [
        { category: "cleanliness", rating: 9 },
        { category: "communication", rating: 8 },
      ],
    });
  });

  it("drops reviews without a usable id", () => {
    expect(normalizeHostawayReview({ publicReview: "no id" })).toBeNull();
  });
});

describe("GET /api/reviews", () => {
  it("calls the versioned Hostaway endpoint and forwards only allowed params", async () => {
    const fetchMock = vi.fn().mockResolvedValue(hostawayPage([{ id: 1, rating: 9 }]));
    vi.stubGlobal("fetch", fetchMock);

    const res = await handler(new Request("https://app.test/api/reviews?sortOrder=desc&evil=1&limit=5"));
    const url = new URL(fetchMock.mock.calls[0][0]);

    expect(url.origin + url.pathname).toBe("https://api.hostaway.test/v1/reviews");
    expect(url.searchParams.get("sortOrder")).toBe("desc");
    expect(url.searchParams.get("limit")).toBe("5");
    expect(url.searchParams.has("evil")).toBe(false);
    expect(res.status).toBe(200);
    expect((await res.json()).result).toHaveLength(1);
  });

  it("caps pagination in all-pages mode", async () => {
    const full = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));
    const fetchMock = vi.fn().mockImplementation(async () => hostawayPage(full));
    vi.stubGlobal("fetch", fetchMock);

    await handler(new Request("https://app.test/api/reviews?all=true&maxPages=100000&pageSize=999"));

    expect(fetchMock).toHaveBeenCalledTimes(20);
    expect(new URL(fetchMock.mock.calls[0][0]).searchParams.get("limit")).toBe("100");
  });

  it("returns a real error status that is not cached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 401 })));

    const res = await handler(new Request("https://app.test/api/reviews"));

    expect(res.status).toBe(502);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toMatchObject({ status: "error", message: "Failed to load reviews from Hostaway." });
  });

  it("rejects non-GET requests with 405", async () => {
    const res = await handler(new Request("https://app.test/api/reviews", { method: "POST" }));
    expect(res.status).toBe(405);
  });
});
