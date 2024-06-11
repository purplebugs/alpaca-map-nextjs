import { assert, beforeAll, describe, test } from "vitest";
import { POST } from "@/api/animals/search/route.js";

describe(`POST /api/animals/search { query: "trygv" }`, () => {
  let response;
  let data;

  beforeAll(async () => {
    const formData = new FormData();
    formData.set("query", "trygv");

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

  test(`Value of data[0].alpacaId`, async () => {
    const actual = data.items[0].alpacaId;
    const expected = 2773;

    assert.equal(actual, expected, `Item ${actual} - should return ${expected}`);
  });

  test(`Value of  data[0].alpacaRegisteredName[0]`, async () => {
    const actual = data.items[0].alpacaRegisteredName[0];
    const expected = "ALPAKKAHAGEN SØRUMS <em>TRYGVE</em>";

    assert.equal(actual, expected, `Item ${actual} - should return ${expected}`);
  });

  test(`Value of  data[0].alpacaShortName[0]`, async () => {
    const actual = data.items[0].alpacaShortName[0];
    const expected = "<em>TRYGVE</em>";

    assert.equal(actual, expected, `Item ${actual} - should return ${expected}`);
  });
});
