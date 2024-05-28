import { assert, beforeAll, describe, test } from "vitest";
import { GET } from "@/api/animal/[id]/route.js";
import { NextRequest } from "next/server";

describe("GET /api/animal/[id]", () => {
  let response;
  let data;

  beforeAll(async () => {
    response = await GET(NextRequest, { params: { id: "2773" } });
    data = await response.json();
  });

  test("HTTP 200", async () => {
    const actual = response.status;
    const expected = 200;

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
  });

  test("Value of data[0].alpacaId", async () => {
    const actual = data[0].alpacaId;
    const expected = 2773;

    assert.strictEqual(actual, expected, `Animal id returned: ${actual} - should be ${expected}`);
  });
});

describe("GET /api/animal/[id]", () => {
  test("GET /api/animal/id-is-not-a-number - HTTP 400 invalid", async () => {
    const response = await GET(NextRequest, { params: { id: "id-is-not-a-number" } });
    const actual = response.status;
    const expected = 400;
    const message = "🙄 Id is not a number";
    const data = await response.json();

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
    assert.equal(data.message, message, `data: ${data.message} should be: ${message}`);
  });

  test("GET /api/animal/1234567890 - 404 Not found", async () => {
    const response = await GET(NextRequest, { params: { id: "1234567890" } });
    const actual = response.status;
    const expected = 404;
    const message = "😅 Not found";
    const data = await response.json();

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
    assert.equal(data.message, message, `data: ${data.message} should be: ${message}`);
  });
});
