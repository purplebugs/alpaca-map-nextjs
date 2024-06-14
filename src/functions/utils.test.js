import { assert, test } from "vitest";
import { fileReader, replaceHighlight } from "@/functions/utils";

test("fileReader() throws error when not correct file format", async () => {
  let response = null;
  try {
    // TODO do not hardcode path
    response = fileReader(`alpaca.png`, "./public/");
  } catch (error) {
    return error;
  }
  console.log("THERE!");
  const actual = response.message;
  console.log(actual);
  const expected = "🧨 fileReader: Could not read from file";

  assert.equal(actual, expected, `Response status: ${actual} should be: ${expected}`);
});

test("replaceHighlight() should merge override source with highlighted fields", async () => {
  const obj = {
    _source: {
      id: 151,
      location: {
        google: {
          administrative_area_level_1: "Trøndelag",
          administrative_area_level_2: "Heim",
        },
      },
      something: {
        test: {
          foo: "heim",
        },
      },
      name: "Coolest Farm Ever!",
    },
    highlight: {
      "location.google.administrative_area_level_2": ["<em>Heim</em>"],
      "something.test.foo": ["<em>Heim</em>"],
    },
    matched_queries: ["administrative_area_level_2"],
  };

  // ACT
  const actual = await replaceHighlight(obj._source, obj.highlight);

  // ASSERT

  const expected = {
    id: 151,
    location: {
      google: {
        administrative_area_level_1: "Trøndelag",
        administrative_area_level_2: ["<em>Heim</em>"],
      },
    },
    something: {
      test: {
        foo: ["<em>Heim</em>"],
      },
    },
    name: "Coolest Farm Ever!",
  };
  assert.deepEqual(actual, expected, `Response: ${actual} should be: ${expected}`);
});
