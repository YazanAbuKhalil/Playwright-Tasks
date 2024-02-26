import { Page, Locator, expect } from "@playwright/test";
import carsData from "../../data/carsData";

class CarsForSalePage {
  readonly page: Page;
  readonly carMakeSearchInput: Locator;
  readonly carModelSearchInput: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly cityInput: Locator;
  readonly colorInput: Locator;
  readonly firstCarResult: Locator;
  readonly filterListResult: Locator;
  readonly carsListResults: Locator;
  readonly carMakeDropdownItems: Locator;
  readonly carModelDropdownItems: Locator;
  readonly carsResultsInfo: Locator;
  readonly firstCarMakeAndModel: Locator;
  readonly datesDropdownMenueItems: Locator;
  readonly citiesDropDownList: Locator;
  readonly viewMoreButton: Locator;
  readonly carColorDropDownItems: Locator;
  readonly ads: Locator;
  readonly sideBannerAd: Locator;
  readonly centerBannerAd: Locator;
  readonly premiumIcon: string = "[data-name='iconPremium']";
  readonly turboIcon: string = "[data-name='iconTurbo']";
  readonly carsListItemsSelector: string = "#listing_posts > div a";

  constructor(page: Page) {
    this.page = page;
    this.carMakeSearchInput = page.locator("input[placeholder='Search For Car Make']");
    this.carModelSearchInput = page.locator("input[placeholder='Search For Model']");
    this.firstCarResult = page.locator("#serpMainContent a").nth(0);
    this.carsListResults = page.locator("#serpMainContent a");
    this.carMakeDropdownItems = page.locator(
      ".sc-a373be11-0 ul li"
    );
    this.carModelDropdownItems = page.locator(
      ".sc-a373be11-0 ul li"
    );
    this.fromDateInput = page.locator("input[placeholder='From']").nth(0);
    this.toDateInput = page.locator("input[placeholder='To']").nth(0);
    this.datesDropdownMenueItems = page.locator(".sc-867cbe24-0 ul li");
    this.carsResultsInfo = page.locator("#serpMainContent  a .postDet > :nth-child(2)");
    this.cityInput = page.locator("input[placeholder='Search For  City']");
    this.citiesDropDownList = page.locator(".sc-6e955ec3-0 ul li");
    this.viewMoreButton = page.locator("#viewMoreButton");
    this.colorInput = page.locator("input[placeholder='Search For Color']");
    this.carColorDropDownItems = page.locator(".sc-fcf18714-0 ul li");
    this.filterListResult = page.locator("#listing_posts > div");
    this.ads = page.locator("#lazyLoadingBanners");
    this.sideBannerAd = page.locator("[data-google-container-id='2']");
    this.centerBannerAd = page.locator("[data-google-container-id='1']");
  }

  async selectCarMake(makeInput: string) {
    await this.carMakeSearchInput.fill(makeInput);
    await this.carMakeDropdownItems.first().click();
  }

  async selectCarModel(modelInput: string) {
    await this.carModelSearchInput.click();
    await this.carModelSearchInput.fill(modelInput);
    await this.carModelDropdownItems.first().click();
    await this.page.waitForURL(/fusion/, {waitUntil: "commit"});
    //await this.page.waitForNavigation({waitUntil: "load"});
    //await this.page.waitForLoadState("networkidle");
  }

  async selectFromDate(dateInput: string) {
    await this.fromDateInput.fill(dateInput);
    await this.datesDropdownMenueItems.first().click();

  }

  async selectToDate(dateInput: string) {
    await this.toDateInput.fill(dateInput);
    await this.datesDropdownMenueItems.first().click();
  }

  async selectDate(dateFrom: string, dateTo: string) {
    await this.selectFromDate(dateFrom);
    await this.page.waitForURL(/Car_Year_from/, {waitUntil: "commit"});
    await this.page.pause();
    await this.selectToDate(dateTo);
    await this.page.reload({waitUntil: "commit"});
  }

  async selectCity(cityInput: string) {
    await this.cityInput.fill(cityInput);
    await this.citiesDropDownList.first().click();
    await this.page.waitForURL(/irbid/, {waitUntil: "commit"});
  }

  async selectColor(colorInput: string) {
    await this.colorInput.fill(colorInput);
    await this.carColorDropDownItems.first().click();
    await this.page.waitForURL(/Car_Color/, {waitUntil: "commit"});

  }

  async checkFirstCarItemContainsIcon() {
    await this.firstCarResult.waitFor({state: "visible"});
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
   // await this.page.pause();
    const resultsCount = await this.carsResultsInfo.count();
    for (let i = 0; i < resultsCount; i++) {
        await expect(this.carsResultsInfo.nth(i)).toContainText(carsData.fromYear);
    }
  }

  async checkAdDimension(ad: Locator, minWidth: number, minHeight: number) {
    const adWidth = await ad.evaluate(element => {
      const { width } = window.getComputedStyle(element);
      return parseFloat(width);
    });

    const adHeight = await this.sideBannerAd.evaluate(element => {
      const {height} = window.getComputedStyle(element);
      return parseFloat(height);
    });

    await expect(adWidth).toBeGreaterThanOrEqual(minWidth);
    await expect(adHeight).toBeGreaterThanOrEqual(minHeight);

  }

  async checkAdVisibility(ad: Locator) {
    await this.carsListResults.nth(6).scrollIntoViewIfNeeded();
    await ad.waitFor({state: "visible"});
    await expect(ad).toBeVisible();
  }

}
export default CarsForSalePage;
