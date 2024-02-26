import {test, expect} from "@playwright/test";
import HomePage from "../pages/HomePage";
import CarsPage from "../pages/CarsPage";
import CarsForSalePage from "../pages/CarsForSalePage";
import CarsDetailsPage from "../pages/CarDetailsPage";
import carsData from "../../data/carsData";

let homepage: HomePage;
let carsPage: CarsPage;
let carsForSalePage: CarsForSalePage;
let carsDetailsPage: CarsDetailsPage;

test.describe("Filter Cars For Sale Functionality", () => {
    test.beforeEach(async({page}) => {
        homepage = new HomePage(page);
        carsPage = new CarsPage(page);
        carsForSalePage = new CarsForSalePage(page);
        carsDetailsPage = new CarsDetailsPage(page);


        await page.goto(homepage.path);
        await homepage.autosIcon.click();
        await carsPage.carsForSaleIcon.click();
        await carsForSalePage.selectCarMake(carsData.make);
        await carsForSalePage.selectCarModel(carsData.model);
    })
    test("verify presence of premium or turbo icon in first car item", async()=> {    
        await carsForSalePage.checkFirstCarItemContainsIcon();
        await carsForSalePage.checkFirstCarItemMake();
        await carsForSalePage.checkFirstCarItemModel();
    });

    test("verify Correct Date filtering on the first page car results", async() => {
        await carsForSalePage.selectDate(carsData.fromYear, carsData.toYear);
        await carsForSalePage.checkCarsResultsDate();
    });

    test("verify correct city filtering on the first page results", async({page}) => {
        await carsForSalePage.viewMoreButton.click();
        await carsForSalePage.selectCity(carsData.city);
        const [newPage] = await Promise.all([
            page.waitForEvent("popup"),
            await carsForSalePage.firstCarResult.click()
        ]);

        await carsDetailsPage.checkFirstCarCity(newPage);
    });

    test("Verify Correct Color filtering on the first page results", async({page}) => {
        await carsForSalePage.viewMoreButton.click();
        await carsForSalePage.selectColor(carsData.color);
        const [newPage] = await Promise.all([
            page.waitForEvent("popup"),
            await carsForSalePage.firstCarResult.click()
        ]);
        await carsDetailsPage.checkFirstCarColor(newPage);
    });
});

test.describe("Ads Testing", () => {
    test.beforeEach(async({page}) => {
        homepage = new HomePage(page);
        carsPage = new CarsPage(page);
        carsForSalePage = new CarsForSalePage(page);
        carsDetailsPage = new CarsDetailsPage(page);

        await page.goto(homepage.path);
        await homepage.autosIcon.click();
        await carsPage.carsForSaleIcon.click();
        await carsForSalePage.selectCarMake(carsData.make);
        await carsForSalePage.selectCarModel(carsData.model);
    })
    test("Verify visibility of the side Banner Ad after filtering cars", async() => {
        await carsForSalePage.checkAdVisibility(carsForSalePage.sideBannerAd);
        await carsForSalePage.checkAdDimension(carsForSalePage.sideBannerAd, 120, 250);
    });

    test("Verify visibility of the center Banner Ad after filtering cars", async() => {
        await carsForSalePage.checkAdVisibility(carsForSalePage.centerBannerAd);
        await carsForSalePage.checkAdDimension(carsForSalePage.centerBannerAd, 728, 90);
    });
});
