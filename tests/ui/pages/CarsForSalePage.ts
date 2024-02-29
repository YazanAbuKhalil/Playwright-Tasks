import { Page, Locator, expect } from "@playwright/test";
import carsData from "../../data/carsData";

class CarsForSalePage {
  readonly carColorDropDownItems: Locator;
  readonly carMakeDropdownItems: Locator;
  readonly carMakeSearchInput: Locator;
  readonly carModelDropdownItems: Locator;
  readonly carModelSearchInput: Locator;
  readonly carsListItemsSelector: string = "#listing_posts > div a";
  readonly carsListResults: Locator;
  readonly carsResultsInfo: Locator;
  readonly centerBannerAd: Locator;
  readonly citiesDropDownList: Locator;
  readonly cityInput: Locator;
  readonly colorInput: Locator;
  readonly datesDropdownMenueItems: Locator;
  readonly filterListResult: Locator;
  readonly finalUrlFilterDate: string ="https://jo.opensooq.com/en/cars/cars-for-sale/ford/fusion/2018";
  readonly firstCarMakeAndModel: Locator;
  readonly firstCarResult: Locator;
  readonly fromDateInput: Locator;
  readonly page: Page;
  readonly premiumIcon: string = "[data-name='iconPremium']";
  readonly sideBannerAd: Locator;
  readonly toDateInput: Locator;
  readonly turboIcon: string = "[data-name='iconTurbo']";
  readonly viewMoreButton: Locator;

  constructor(page: Page) {
    this.carColorDropDownItems = page.locator(".sc-fcf18714-0 ul li");
    this.carMakeDropdownItems = page.locator(".sc-a373be11-0 ul li");
    this.carMakeSearchInput = page.locator(
      "input[placeholder='Search For Car Make']"
    );
    this.carModelDropdownItems = page.locator(".sc-a373be11-0 ul li");
    this.carModelSearchInput = page.locator(
      "input[placeholder='Search For Model']"
    );
    this.carsListResults = page.locator("#serpMainContent a");
    this.carsResultsInfo = page.locator(
      "#serpMainContent  a .postDet > :nth-child(2)"
    );
    this.centerBannerAd = page.locator("[data-google-container-id='1']");
    this.cityInput = page.locator("input[placeholder='Search For  City']");
    this.citiesDropDownList = page.locator(".sc-6e955ec3-0 ul li");
    this.colorInput = page.locator("input[placeholder='Search For Color']");
    this.datesDropdownMenueItems = page.locator(".sc-867cbe24-0 ul li");
    this.filterListResult = page.locator("#listing_posts > div");
    this.firstCarResult = page.locator("#serpMainContent a").nth(0);
    this.fromDateInput = page.locator("input[placeholder='From']").nth(0);
    this.page = page;
    this.sideBannerAd = page.locator("[data-google-container-id='2']");
    this.toDateInput = page.locator("input[placeholder='To']").nth(0);
    this.viewMoreButton = page.locator("#viewMoreButton");
  }
  /**
   * Selects a car make from the dropdown list
   * @param {string} makeInput The car make input value to be filled.
   * @returns {Promise<void>} A Promise that resolves once the car make is selected.
   */
  async selectCarMake(makeInput: string) {
    await this.carMakeSearchInput.fill(makeInput);
    await this.carMakeDropdownItems.first().click();
  }
  /**
   * Select a car model from the dropdown list
   * @param {string} modelInput
   * @returns {Promise<void>} A Promise that resolves once the car model is selected.
   */
  async selectCarModel(modelInput: string) {
    await this.carModelSearchInput.click();
    await this.carModelSearchInput.fill(modelInput);
    await this.carModelDropdownItems.first().click();
    await this.page.waitForURL(/fusion/, { waitUntil: "commit" });
  }
  /**
   * Select a from date from the dropdown list
   * @param {string} dateInput
   * @returns {Promise<void>}  A Promise that resolves once the from date is selected.
   */
  async selectFromDate(dateInput: string) {
    await this.fromDateInput.fill(dateInput);
    await this.datesDropdownMenueItems.first().click();
  }
  /**
   * Select a to date from the dropdown list
   * @param {string} dateInput
   * @returns {Promise<void>}  A Promise that resolves once the to date is selected.
   */
  async selectToDate(dateInput: string) {
    await this.toDateInput.fill(dateInput);
    await this.datesDropdownMenueItems.first().click();
  }
  /**
   * Creates a new page by clicking on the specified element, waiting for a popup event.
   * @param {Page} currentPage The current page object.
   * @param {Locator} element The locator of the element that triggers the opening of a new page.
   * @returns {Promise<Page>} A Promise that resolves to the new page object.
   */
  async getNewPage(currentPage: Page, element: Locator): Promise<Page> {
    const [newPage] = await Promise.all([
      currentPage.waitForEvent("popup"),
      await element.click(),
    ]);
    return newPage;
  }

  /**
   * Select date for car
   * @param {string} dateFrom
   * @param {string} dateTo
   * @returns {Promise<Page>} A Promise that resolves once the to date is selected.
   */
  async selectDate(dateFrom: string, dateTo: string) {
    await this.selectFromDate(dateFrom);
    await this.page.waitForURL(/Car_Year_from/, { waitUntil: "commit" });
    await this.selectToDate(dateTo);
    await this.page.waitForURL(this.finalUrlFilterDate, {
      waitUntil: "commit",
    });
    await this.page.reload();
  }

  /**
   * Select a city from the dropdown list
   * @param {string} cityInput
   * @returns {Promise<Page>} A Promise that resolves once the to city is selected.
   */
  async selectCity(cityInput: string) {
    await this.cityInput.fill(cityInput);
    await this.citiesDropDownList.first().click();
    await this.page.waitForURL(/irbid/, { waitUntil: "commit" });
  }

  /**
   * Select a color from the dropdown list
   * @param {string} colorInput
   * @returns {Promise<Page>} A Promise that resolves once the to color is selected.
   */
  async selectColor(colorInput: string) {
    await this.colorInput.fill(colorInput);
    await this.carColorDropDownItems.first().click();
    await this.page.waitForURL(/Car_Color/, { waitUntil: "commit" });
  }

  async checkFirstCarItemContainsIcon() {
    await this.firstCarResult.waitFor({ state: "visible" });
    await expect(
      (await this.firstCarResult.locator(this.premiumIcon).isVisible()) ||
        (await this.firstCarResult.locator(this.turboIcon).isVisible())
    ).toBeTruthy();
  }

  async checkFirstCarItemMake() {
    await expect(this.carsResultsInfo.nth(0)).toContainText(carsData.make);
  }

  async checkFirstCarItemModel() {
    await expect(this.carsResultsInfo.nth(0)).toContainText(carsData.model);
  }

  async checkCarsResultsDate() {
    const resultsCount = await this.carsResultsInfo.count();
    for (let i = 0; i < resultsCount; i++) {
      await expect(this.carsResultsInfo.nth(i)).toContainText(
        carsData.fromYear
      );
    }
  }

  async checkAdDimension(ad: Locator, minWidth: number, minHeight: number) {
    const adWidth = await ad.evaluate((element) => {
      const { width } = window.getComputedStyle(element);
      return parseFloat(width);
    });

    const adHeight = await this.sideBannerAd.evaluate((element) => {
      const { height } = window.getComputedStyle(element);
      return parseFloat(height);
    });

    await expect(adWidth).toBeGreaterThanOrEqual(minWidth);
    await expect(adHeight).toBeGreaterThanOrEqual(minHeight);
  }

  async checkAdVisibility(ad: Locator) {
    await this.carsListResults.nth(6).scrollIntoViewIfNeeded();
    await ad.waitFor({ state: "visible" });
    await expect(ad).toBeVisible();
  }
}
export default CarsForSalePage;
