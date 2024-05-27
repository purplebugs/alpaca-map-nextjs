import { describe, test, assert } from "vitest";
import { GET } from "@/api/companies/route.js";
import { NextRequest } from "next/server";

describe("GET /api/companies", () => {
  test("GET /api/companies - HTTP 200", async () => {
    const response = await GET(NextRequest);

    const actual = response.status;
    const expected = 200;

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
  });

  test("GET /api/companies should contain more than one farm", async () => {
    const response = await GET(NextRequest);
    const data = await response.json();

    const actual = data.length;
    const expected = 1;

    assert.isAbove(actual, expected, `Farm returned: ${actual} - should have more than ${expected}`);
  });
});
