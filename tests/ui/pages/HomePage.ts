import { Page, Locator } from "@playwright/test";

class HomePage {
  readonly autosIcon: Locator;
  readonly page: Page;
  readonly path: string = "/en";

  constructor(page: Page) {
    this.autosIcon = page.locator("#homeMainCatsCont a:nth-child(4)");
    this.page = page;
  }
}
export default HomePage;
