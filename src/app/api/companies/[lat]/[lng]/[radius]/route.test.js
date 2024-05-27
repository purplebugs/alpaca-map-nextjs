import { describe, test, assert } from "vitest";
import { GET } from "@/api/companies/[lat]/[lng]/[radius]/route.js";
import { NextRequest } from "next/server";

describe("GET /api/companies/:lat/:lng/:radius", () => {
  test("GET /api/companies/:lat/:lng/:radius - HTTP 200", async () => {
    const response = await GET(NextRequest, { params: { lat: "63.292781", lng: "9.0826007", radius: "500000" } });

    const actual = response.status;
    const expected = 200;

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
  });

  // TODO GET /api/companies/:lat/:lng/:radius?public=true&private=false - HTTP 200

  // TODO GET /api/companies/:lat/:lng/:radius?public=false&private=true - HTTP 200

  test("GET /api/companies/:lat/:lng/:radius - HTTP 400 Lat is not a floating point number", async () => {
    const response = await GET(NextRequest, { params: { lat: "not-a-latitude", lng: "9.0826007", radius: "500000" } });

    console.log("response.status", response.status);

    const actual = response.status;
    const expected = 400;
    const message = "🙄 Lat is not a floating point number";
    const data = await response.json();

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
    assert.equal(data.message, message, `data: ${data.message} should be: ${message}`);
  });

  test("GET /api/companies/:lat/:lng/:radius - HTTP 400 Lng is not a floating point number", async () => {
    const response = await GET(NextRequest, { params: { lat: "63.292781", lng: "not-a-longitude", radius: "500000" } });

    console.log("response.status", response.status);

    const actual = response.status;
    const expected = 400;
    const message = "🙄 Lng is not a floating point number";
    const data = await response.json();

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
    assert.equal(data.message, message, `data: ${data.message} should be: ${message}`);
  });

  test("GET /api/companies/:lat/:lng/:radius - HTTP 400 Radius is not a number", async () => {
    const response = await GET(NextRequest, { params: { lat: "63.292781", lng: "9.0826007", radius: "not-a-radius" } });

    console.log("response.status", response.status);

    const actual = response.status;
    const expected = 400;
    const message = "🙄 Radius is not a number";
    const data = await response.json();

    assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
    assert.equal(data.message, message, `data: ${data.message} should be: ${message}`);
  });
});
