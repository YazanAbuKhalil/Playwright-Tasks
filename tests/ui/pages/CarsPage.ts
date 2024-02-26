import { Page, Locator } from "@playwright/test";

class CarsPage {
  readonly page: Page;
  readonly carsForSaleIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.carsForSaleIcon = page.locator(".sc-c2e05b1b-0 a:nth-child(2)");
  }
}
export default CarsPage;
