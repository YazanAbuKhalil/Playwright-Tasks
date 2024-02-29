import { Page, Locator, expect } from "@playwright/test";

class CarsDetailsPage {
  readonly cityLabel: Locator;
  readonly colorLabel: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.cityLabel = page.locator("a.City");
    this.colorLabel = page.locator("a.Color");
    this.page = page;
  }

  async checkFirstCarCity(newPage: Page) {
    await expect(newPage.locator("a.City")).toHaveText("Irbid");
  }

  async checkFirstCarColor(newPage: Page) {
    await expect(newPage.locator("a.Color")).toHaveText("Black");
  }
}
export default CarsDetailsPage;
