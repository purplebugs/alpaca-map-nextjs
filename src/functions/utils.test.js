import { assert, beforeAll, describe, test } from "vitest";
import { replaceHighlight } from "@/functions/utils";

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
  const actual = replaceHighlight(obj._source, obj.highlight);

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
