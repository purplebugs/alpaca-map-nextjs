import { describe, test, assert } from "vitest";
import { POST } from "@/api/locations/search/route.js";
import { NextRequest } from "next/server";

describe("POST /api/locations/search", () => {
  test(`POST /api/locations/search { query: "lund" } - HTTP 200`, async () => {
    const formData = new FormData();
    formData.set("query", "lund");

    const request = new Request("http://www.only-here-for-form-data.com/", {
      method: "POST",
      body: formData,
    });

    const response = await POST(request);

    const actual = response.status;
    const expected = 200;

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
  });

  // TODO use beforeAll then add second test
  test.skip(`POST /api/locations/search { query: "lund" } should return at least 1 item`, async () => {
    const formData = new FormData();
    formData.append("query", "lund");

    const response = await POST(formData);

    const data = await response.json();

    const actual = data.length;
    const expected = 1;

    assert.isAtLeast(actual, expected, `Farm returned: ${actual} - should return at least ${expected}`);
  });
});
