import { Page, Locator } from "@playwright/test";

class CarsPage {
  readonly carsForSaleIcon: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.carsForSaleIcon = page.locator(".sc-c2e05b1b-0 a:nth-child(2)");
    this.page = page;
  }
}
export default CarsPage;
