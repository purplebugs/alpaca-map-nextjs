import { describe, test, assert } from "vitest";
import { GET } from "./route.js";
import { NextRequest } from "next/server";

describe("GET /api/company/[id]", () => {
  test("GET /api/company/61 - HTTP 200", async () => {
    const response = await GET(NextRequest, { params: { id: "61" } });

    const actual = response.status;
    const expected = 200;

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
  });

  test("GET /api/company/61 should return farm with id=61", async () => {
    const response = await GET(NextRequest, { params: { id: "61" } });
    const data = await response.json();

    const actual = data[0].id;
    const expected = 61;

    assert.equal(actual, expected, `Farm id returned: ${actual} - should be ${expected}`);
  });

  test("GET /api/company/61 should contain correct number of alpacas in list", async () => {
    const response = await GET(NextRequest, { params: { id: "61" } });
    const data = await response.json();

    const actual = data[0].alpacas.all.length;
    const expected = 1;

    assert.isAbove(actual, expected, `Farm returned: ${actual} alpacas - should have more than ${expected}`);
  });

  test("GET /api/company/61 should contain aggregations", async () => {
    const response = await GET(NextRequest, { params: { id: "61" } });
    const data = await response.json();

    const actual_color1 = data[0].aggregations.alpacas.color1.buckets.length;
    const expected_color1 = 9;

    const actual_color2 = data[0].aggregations.alpacas.color2.buckets.length;
    const expected_color2 = 3;

    const actual_color3 = data[0].aggregations.alpacas.color3.buckets.length;
    const expected_color3 = 0;

    const actual_colorSolid = data[0].aggregations.alpacas.colorSolid.buckets.length;
    const expected_colorSolid = 1;

    const actual_gender = data[0].aggregations.alpacas.gender.buckets.length;
    const expected_gender = 2;

    assert.equal(
      actual_color1,
      expected_color1,
      `Farm returned color1 aggs: ${actual_color1} - should be ${expected_color1}`
    );
    assert.equal(
      actual_color2,
      expected_color2,
      `Farm returned color2 aggs: ${actual_color2} - should be ${expected_color2}`
    );
    assert.equal(
      actual_color3,
      expected_color3,
      `Farm returned color3 aggs: ${actual_color3} - should be ${expected_color3}`
    );
    assert.equal(
      actual_colorSolid,
      expected_colorSolid,
      `Farm returned colorSolid aggs: ${actual_colorSolid} - should be ${expected_colorSolid}`
    );
    assert.equal(
      actual_gender,
      expected_gender,
      `Farm returned gender aggs: ${actual_gender} - should be ${expected_gender}`
    );
  });

  test("GET /api/company/id-is-not-a-number - HTTP 400 invalid", async () => {
    const response = await GET(NextRequest, { params: { id: "id-is-not-a-number" } });
    const actual = response.status;
    const expected = 400;
    const message = "🙄 Id is not a number";
    const data = await response.json();

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
    assert.equal(data.message, message, `data: ${data.message} should be: ${message}`);
  });

  test("GET /api/company/1234567890 - 404 Not found", async () => {
    const response = await GET(NextRequest, { params: { id: "1234567890" } });
    const actual = response.status;
    const expected = 404;
    const message = "😅 Not found X";
    const data = await response.json();

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
    assert.equal(data.message, message, `data: ${data.message} should be: ${message}`);
  });
});
