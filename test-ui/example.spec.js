import { test, expect } from "@playwright/test";

test.describe("General elements", () => {
  test("title: has text", async ({ page }) => {
    await page.goto(`/`);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Alpaca Map/);
  });

  test("navigation link", async ({ page }) => {
    await page.goto(`/`);

    // Click the link
    await page.getByRole("link", { name: "Find alpacas on map" }).first().click();

    // Expects the URL to contain string
    await expect(page).toHaveURL(/\/$/); // URL should end with "/" since it is the home page
  });
});
