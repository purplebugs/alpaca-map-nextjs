import { assert, describe, test } from "vitest";
import { generateImageParams } from "@/functions/generateImageParams";

describe("generateImageParams()", () => {
  const path = "/assets/alpaca_images";
  const defaultSource = "default_alpaca.jpeg";
  const defaultWidth = 1024;
  const defaultHeight = 1024;

  test("generate image path based on input: color is null", async () => {
    // ACT
    const actual = generateImageParams();

    // ASSERT
    const expected = {
      path: path,
      source: `${path}/${defaultSource}`,
      width: defaultWidth,
      height: defaultHeight,
    };

    assert.deepEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color I_DO_NOT_EXIST", async () => {
    // ARRANGE
    const color = "I_DO_NOT_EXIST";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = `${path}/default_alpaca.jpeg`;

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color COLOR_WHITE", async () => {
    // ARRANGE
    const color = "COLOR_WHITE";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = `${path}/white_alpaca.jpeg`;

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color COLOR_TRUE_BLACK", async () => {
    // ARRANGE
    const color = "COLOR_TRUE_BLACK";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = `${path}/true_black_alpaca.jpeg`;

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color COLOR_MEDIUM_FAWN", async () => {
    // ARRANGE
    const color = "COLOR_MEDIUM_FAWN";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = `${path}/medium_fawn_alpaca.jpeg`;

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color COLOR_MEDIUM_BROWN", async () => {
    // ARRANGE
    const color = "COLOR_MEDIUM_BROWN";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = `${path}/medium_brown_alpaca.jpeg`;

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color COLOR_LIGHT_FAWN", async () => {
    // ARRANGE
    const color = "COLOR_LIGHT_FAWN";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = `${path}/light_fawn_alpaca.jpeg`;

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color COLOR_BEIGE", async () => {
    // ARRANGE
    const color = "COLOR_BEIGE";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = `${path}/beige_alpaca.jpeg`;

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color COLOR_DARK_BROWN", async () => {
    // ARRANGE
    const color = "COLOR_DARK_BROWN";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = `${path}/dark_brown_alpaca.jpeg`;

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color COLOR_LIGHT_BROWN", async () => {
    // ARRANGE
    const color = "COLOR_LIGHT_BROWN";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = "/assets/alpaca_images/light_brown_alpaca.jpeg";

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });

  test("generate image path based on input: color COLOR_BAY_BLACK", async () => {
    // ARRANGE
    const color = "COLOR_BAY_BLACK";

    // ACT
    const actual = generateImageParams(color).source;

    // ASSERT

    const expected = "/assets/alpaca_images/bay_black_alpaca.jpeg";

    assert.strictEqual(
      actual,
      expected,
      `Actual: ${actual} should be: ${expected}`
    );
  });
});
