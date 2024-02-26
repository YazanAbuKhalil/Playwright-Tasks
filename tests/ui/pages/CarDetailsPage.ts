import {Page, Locator, expect} from "@playwright/test";

class CarsDetailsPage {
    readonly page: Page;
    readonly cityLabel: Locator;
    readonly colorLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cityLabel = page.locator("a.City");
        this.colorLabel = page.locator("a.Color");
    }

    async checkFirstCarCity(newPage: Page) {
        await expect(newPage.locator("a.City")).toHaveText("Irbid");    
    }

    async checkFirstCarColor(newPage: Page) {
        await expect(newPage.locator("a.Color")).toHaveText("Black");
    }
}
export default CarsDetailsPage;
