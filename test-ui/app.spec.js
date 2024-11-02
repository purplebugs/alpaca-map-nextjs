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
    await expect(
      page.getByRole("link", { name: "Find Alpacas on Map" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Search" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "About" }).first()
    ).toBeVisible();

    // ACT + ASSERT
    await page.getByRole("link", { name: "Search" }).first().click();
    await expect(page).toHaveURL(/\/search$/);

    await page.getByRole("link", { name: "About" }).first().click();
    await expect(page).toHaveURL(/\/about$/);

    await page
      .getByRole("link", { name: "Find Alpacas on Map" })
      .first()
      .click();
    await expect(page).toHaveURL(/\/$/); // URL should end with "/" since it is the home page
  });
});

test.describe("Alpaca page", () => {
  test("Headings are visible", async ({ page }) => {
    // ARRANGE
    await page.goto(`/alpaca/2773`);

    // ASSERT
    await expect(
      page.getByRole("heading", { name: "Alpaca Detail" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Lives at" })).toBeVisible();
  });

  test("Farm overview text is visible, webpage link is correct", async ({
    page,
  }) => {
    // TODO remove this, redundant since shared component in farm page?
    // ARRANGE
    await page.goto(`/alpaca/2773`);

    // ASSERT
    await expect(page.getByTestId("farm-name")).toContainText("Alpakkahagen");
    await expect(page.getByTestId("farm-public-private")).toContainText(
      "Public Farm"
    );

    await page.getByTestId("farm-name-link").click();
    await expect(page).toHaveURL(/\/farm\/61$/);
  });

  test("Graphic box exists with image source", async ({ page }) => {
    // ARRANGE
    await page.goto(`/alpaca/2773`);

    // ASSERT
    await expect(page.getByTestId("profile-graphic")).toBeVisible();
    await expect(page.getByTestId("profile-graphic-src")).toHaveAttribute(
      "src",
      /bay_black_alpaca.jpeg/
    );
    await expect(page.getByTestId("profile-graphic-src")).toHaveAttribute(
      "alt",
      "Alpaca TRYGVE, graphic generated by AI"
    );
  });

  test("Alpaca detail text is visible", async ({ page }) => {
    // ARRANGE
    await page.goto(`/alpaca/2773`);

    // ASSERT
    await expect(page.getByTestId("alpaca-detail-active")).toHaveAttribute(
      "id",
      "alpaca-id-2773"
    );

    await expect(page.getByTestId("alpaca-detail-active")).toContainText(
      "🦙Registered NameALPAKKAHAGEN SØRUMS TRYGVE🦙Short NameTRYGVEGenderSEX_MALEDOB15 July 2018BreedBREED_HUACAYAStatusSTATUS_ACTIVETag Id1012Tag ColourTAGCOLOR_ORIGINColour 1Bay blackColour SolidWhite"
    );
  });
});

test.describe("Farm page", () => {
  test("Headings are visible", async ({ page }) => {
    // ARRANGE
    await page.goto(`/farm/61`);

    // ASSERT
    await expect(
      page.getByRole("heading", { name: "Alpaca Overview" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Farm Overview" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Alpacas" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Alpacas - Dead" })
    ).toBeVisible();
  });

  test("Farm overview text is visible, webpage link is correct", async ({
    page,
  }) => {
    // ARRANGE
    await page.goto(`/farm/61`);

    // ASSERT
    await expect(page.getByTestId("farm-public-private")).toContainText(
      "Public Farm"
    );
    await expect(page.getByTestId("farm-address-webpage")).toContainText(
      "www.alpakkahagen.no"
    );
    await expect(page.getByTestId("farm-address-city")).toContainText("Sørum");
    await expect(page.getByTestId("farm-address-street")).toContainText(
      "Bingenveien 35, 1923 Sørum, Norway"
    );
    await expect(page.getByTestId("farm-address-email")).toContainText(
      "post@alpakkahagen.no"
    );

    const linkWebPage = page.getByRole("link", { name: "www.alpakkahagen.no" });
    await expect(linkWebPage).toHaveAttribute(
      "href",
      "http://www.alpakkahagen.no"
    );
    await expect(linkWebPage).toHaveAttribute("target", "_blank");
    await expect(linkWebPage).toHaveAttribute("rel", "noreferrer");

    const linkDirections = page.getByRole("link", { name: "Directions" });
    await expect(linkDirections).toHaveAttribute(
      "href",
      "https://www.google.com/maps/dir/?api=1&origin=&destination=Bingenveien%2035,%201923%20S%C3%B8rum,%20Norway"
    );
    await expect(linkDirections).toHaveAttribute("target", "_blank");
    await expect(linkDirections).toHaveAttribute("rel", "noreferrer");
  });

  test("Alpaca overview text is visible", async ({ page }) => {
    // ARRANGE
    await page.goto(`/farm/61`);

    // ASSERT
    await expect(page.getByTestId("alpaca-count")).toContainText("77");
    await expect(page.getByTestId("alpaca-gender")).toContainText(
      "FEMALE - 39"
    );
    await expect(page.getByTestId("alpaca-gender")).toContainText("MALE - 38");
    await expect(page.getByTestId("alpaca-colour")).toContainText(
      "COLOR_WHITE - 33COLOR_MEDIUM_FAWN - 15COLOR_LIGHT_FAWN - 11COLOR_BEIGE - 9COLOR_MEDIUM_BROWN - 3COLOR_DARK_FAWN - 2COLOR_LIGHT_BROWN - 2COLOR_BAY_BLACK - 1COLOR_DARK_BROWN - 1"
    );
  });

  test("Alpaca detail text is visible", async ({ page }) => {
    // ARRANGE
    await page.goto(`/farm/61`);

    // ASSERT
    const alpacaDetailActive = page.getByTestId("alpaca-detail-active");
    await expect(alpacaDetailActive).toHaveCount(77);

    const alpacaDetailDead = page.getByTestId("alpaca-detail-dead");
    await expect(alpacaDetailDead).toHaveCount(6);

    await expect(
      page.getByTestId("alpaca-detail-active").first()
    ).toHaveAttribute("id", "alpaca-id-508");

    await expect(
      page.getByTestId("alpaca-detail-active").first()
    ).toContainText(
      "🦙Registered NameAMBERSUN SIGNE🦙Short NameAMBERSUN SIGNEGenderSEX_FEMALEDOB03 September 2011BreedBREED_HUACAYAStatusSTATUS_ACTIVETag Id9002Colour 1WhiteColour SolidWhite"
    );
  });
});

test.describe("Search page", () => {
  test("Page elements", async ({ page }) => {
    // ARRANGE
    await page.goto(`/search`);

    // ASSERT
    expect(page.getByTestId("search-list-results-heading")).toBeVisible;
    await expect(
      page.getByRole("heading", { name: "Find alpaca, farm, area" })
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: `Find alpaca, farm, area` })
    ).toBeVisible();
    await expect(page.getByPlaceholder("Luna")).toBeVisible();

    // await expect(input).toHaveClass("pill half"); TODO put back when re do CSS ??
  });

  test(`TYPE "trygv" returns alpacas only, CLICK alpaca found shows alpaca page`, async ({
    page,
  }) => {
    // ARRANGE
    await page.goto(`/search`);

    // ACT
    await page
      .getByRole("textbox", { name: `Find alpaca, farm, area` })
      .fill("trygv");

    // ASSERT
    expect(page.getByTestId("search-list-results-heading")).toContainText(
      "0Areas0Farms2🦙Alpacas"
    );
    const listResults = page.getByTestId("list-results-animals");
    await expect(listResults).toContainText(/ALPAKKAHAGEN SØRUMS TRYGVE/);
    await expect(listResults).toContainText(/LUNDEGÅRDS TRYGVE/);

    // ACT + ASSERT
    await page
      .getByTestId("list-results-animals-animal-id-2773-short-name")
      .click();
    // Expects the URL to contain string
    await expect(page).toHaveURL(/\/alpaca\/2773$/);
  });

  test(`TYPE "lund" returns areas, farms, alpacas`, async ({ page }) => {
    // ARRANGE
    await page.goto(`/search`);

    // ACT
    await page
      .getByRole("textbox", { name: "Find alpaca, farm, area" })
      .fill("lund");

    // ASSERT
    expect(page.getByTestId("search-list-results-heading")).toContainText(
      "1Areas5Farms6🦙Alpacas"
    );
    await expect(page.getByTestId("list-results-locations")).toContainText(
      /Kamperhaug/
    );
    await expect(
      page.getByTestId("list-results-locations-farm-id-209")
    ).toHaveAttribute("href", /farm\/209/);

    await expect(page.getByTestId("list-results-companies")).toContainText(
      /Margit Lund/
    );
    await expect(
      page.getByTestId("list-results-companies-farm-id-197")
    ).toHaveAttribute("href", /farm\/197/);

    await expect(page.getByTestId("list-results-animals")).toContainText(
      /Short Name: LUNA/
    );
    await expect(
      page.getByTestId("list-results-animals-animal-id-2277-short-name")
    ).toHaveAttribute("href", /alpaca\/2277/);
    await expect(
      page.getByTestId("list-results-animals-animal-id-2277-registered-name")
    ).toHaveAttribute("href", /alpaca\/2277/);
  });

  test(`TYPE "gård" shows pagination sections`, async ({ page }) => {
    // ARRANGE
    await page.goto(`/search`);

    // ACT
    await page
      .getByRole("textbox", { name: "Find alpaca, farm, area" })
      .fill("gård");

    // ASSERT
    await expect(page.getByTestId("pagination-farmPageNumber")).toBeVisible();
    await expect(page.getByTestId("pagination-alpacaPageNumber")).toBeVisible();
  });

  test(`TYPE "gård" - CLICK farm link 4 - updates URL - click alpaca link 2 - updates URL - click farm link 3 - updates URL - TYPE "gåd" - updates URL`, async ({
    page,
  }) => {
    // ARRANGE
    await page.goto(`/search`);

    // ACT
    await page
      .getByRole("textbox", { name: "Find alpaca, farm, area" })
      .fill("gård");
    await page
      .getByTestId("pagination-farmPageNumber")
      .locator(page.getByRole("link", { name: 2 }))
      .click();

    // ASSERT
    await expect(page).toHaveURL(/\/?query=g%C3%A5rd&farmPageNumber=2$/);

    // ACT
    await page
      .getByTestId("pagination-alpacaPageNumber")
      .locator(page.getByRole("link", { name: 4 }))
      .click();

    // ASSERT
    await expect(page).toHaveURL(
      /\/?query=g%C3%A5rd&farmPageNumber=2&alpacaPageNumber=4$/
    );

    // ACT
    await page
      .getByTestId("pagination-farmPageNumber")
      .locator(page.getByRole("link", { name: 3 }))
      .click();

    // ASSERT
    await expect(page).toHaveURL(
      /\/?query=g%C3%A5rd&farmPageNumber=3&alpacaPageNumber=4$/
    );

    // ACT
    await page
      .getByRole("textbox", { name: "Find alpaca, farm, area" })
      .fill("går");

    // ASSERT
    await expect(page).toHaveURL(/\/?query=g%C3%A5r$/);
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
    await expect(
      page.getByRole("heading", { name: 'The "Silicon Alpaca Valley" pitch' })
    ).toBeVisible();

    await expect(
      page.getByText("Alpaca.Life - Making the world an alpaca place")
    ).toBeVisible();
  });
});
