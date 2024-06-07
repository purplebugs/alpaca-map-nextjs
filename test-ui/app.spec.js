import { test, expect } from "@playwright/test";

test.describe("General elements", () => {
  test("title: has text", async ({ page }) => {
    await page.goto(`/`);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Alpaca Map/);
  });

  test("navigation", async ({ page }) => {
    //ARRANGE
    await page.goto(`/`);

    // ASSERT
    await expect(page.getByRole("link", { name: "Find Alpacas on Map" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Search" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "About" }).first()).toBeVisible();

    // ACT + ASSERT
    await page.getByRole("link", { name: "Search" }).first().click();
    await expect(page).toHaveURL(/\/search$/);

    await page.getByRole("link", { name: "About" }).first().click();
    await expect(page).toHaveURL(/\/about$/);

    await page.getByRole("link", { name: "Find Alpacas on Map" }).first().click();
    await expect(page).toHaveURL(/\/$/); // URL should end with "/" since it is the home page
  });
});

test.describe("About page", () => {
  test("Headings are visible", async ({ page }) => {
    // ARRANGE
    await page.goto(`/about`);

    // ASSERT
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Why" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Donate" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Credits" })).toBeVisible();
    await expect(page.getByRole("heading", { name: 'The "Silicon Alpaca Valley" pitch' })).toBeVisible();

    await expect(page.getByText("Alpaca.Life - Making the world an alpaca place")).toBeVisible();
  });
});
