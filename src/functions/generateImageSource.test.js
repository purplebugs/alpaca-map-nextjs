import { assert, describe, test } from "vitest";
import { generateImageSource } from "@/functions/generateImageSource";

describe("generateImageSource()", () => {
  test("generate image path based on input: color is null", async () => {
    // ACT
    const actual = generateImageSource();

    // ASSERT

    const expected = "/alpaca_images/default_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color I_DO_NOT_EXIST", async () => {
    // ARRANGE
    const color = "I_DO_NOT_EXIST";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/default_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color COLOR_WHITE", async () => {
    // ARRANGE
    const color = "COLOR_WHITE";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/white_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color COLOR_TRUE_BLACK", async () => {
    // ARRANGE
    const color = "COLOR_TRUE_BLACK";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/true_black_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color COLOR_MEDIUM_FAWN", async () => {
    // ARRANGE
    const color = "COLOR_MEDIUM_FAWN";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/medium_fawn_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color COLOR_MEDIUM_BROWN", async () => {
    // ARRANGE
    const color = "COLOR_MEDIUM_BROWN";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/medium_brown_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color COLOR_LIGHT_FAWN", async () => {
    // ARRANGE
    const color = "COLOR_LIGHT_FAWN";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/light_fawn_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color COLOR_BEIGE", async () => {
    // ARRANGE
    const color = "COLOR_BEIGE";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/beige_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color COLOR_DARK_BROWN", async () => {
    // ARRANGE
    const color = "COLOR_DARK_BROWN";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/dark_brown_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color COLOR_LIGHT_BROWN", async () => {
    // ARRANGE
    const color = "COLOR_LIGHT_BROWN";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/dark_light_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });

  test("generate image path based on input: color COLOR_BAY_BLACK", async () => {
    // ARRANGE
    const color = "COLOR_BAY_BLACK";

    // ACT
    const actual = generateImageSource(color);

    // ASSERT

    const expected = "/alpaca_images/bay_black_alpaca.jpeg";

    assert.strictEqual(actual, expected, `Image source generated: ${actual} should be: ${expected}`);
  });
});
