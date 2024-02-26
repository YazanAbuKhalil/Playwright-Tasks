import { Page, Locator } from "@playwright/test";

class HomePage {
  readonly page: Page;
  readonly autosIcon: Locator;
  readonly path: string = "/en";

  constructor(page: Page) {
    this.page = page;
    this.autosIcon = page.locator("#homeMainCatsCont a:nth-child(4)");
  }
}
export default HomePage;
