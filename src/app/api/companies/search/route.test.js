import { assert, beforeAll, describe, test } from "vitest";
import { POST } from "@/api/companies/search/route.js";

describe(`POST /api/companies/search { query: "lund" }`, () => {
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

  test(`HTTP 200`, async () => {
    const actual = response.status;
    const expected = 200;

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
  });

  test(`At least 1 item`, async () => {
    const actual = data.total;
    const expected = 1;

    assert.isAtLeast(actual, expected, `Number of items returned: ${actual} - should return at least ${expected}`);
  });

  test(`Value of param: from`, async () => {
    const actual = data.from;
    const expected = 0;

    assert.equal(actual, expected, `Param: ${actual} - should return ${expected}`);
  });

  test(`Value of param: size`, async () => {
    const actual = data.size;
    const expected = 100;

    assert.equal(actual, expected, `Param: ${actual} - should return ${expected}`);
  });

  test(`Value of id`, async () => {
    const actual = data.items[0].id;
    const expected = 197;

    assert.equal(actual, expected, `Item ${actual} - should return ${expected}`);
  });

  test(`Value of name`, async () => {
    const actual = data.items[0].name;
    const expected = `Margit <em>Lund</em>-Mikkelson`;

    assert.equal(actual, expected, `Item ${actual} - should return ${expected}`);
  });
});
