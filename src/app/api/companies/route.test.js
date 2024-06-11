import { assert, beforeAll, describe, test } from "vitest";
import { GET } from "@/api/companies/route.js";
import { NextRequest } from "next/server";

describe("GET /api/companies", () => {
  let response;
  let data;

  beforeAll(async () => {
    response = await GET(NextRequest);
    data = await response.json();
  });

  test("HTTP 200", async () => {
    const actual = response.status;
    const expected = 200;

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
  });

  test("At least 2 items", async () => {
    const actual = data.total;
    const expected = 2;

    assert.isAtLeast(actual, expected, `Number of items returned: ${actual} - should return at least ${expected}`);
  });
});
