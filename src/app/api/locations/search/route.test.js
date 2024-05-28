import { describe, beforeAll, test, assert } from "vitest";
import { POST } from "@/api/locations/search/route.js";

describe("POST /api/locations/search", () => {
  let response;
  let data;

  beforeAll(async () => {
    const formData = new FormData();
    formData.set("query", "lund");

    const request = new Request("http://www.only-here-for-form-data.com/", {
      method: "POST",
      body: formData,
    });

    response = await POST(request);
    data = await response.json();
  });

  test(`POST /api/locations/search { query: "lund" } - HTTP 200`, async () => {
    const actual = response.status;
    const expected = 200;

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
  });

  test(`POST /api/locations/search { query: "lund" } should return at least 1 item`, async () => {
    const actual = data.length;
    const expected = 1;

    assert.isAtLeast(actual, expected, `Farm returned: ${actual} - should return at least ${expected}`);
  });
});
