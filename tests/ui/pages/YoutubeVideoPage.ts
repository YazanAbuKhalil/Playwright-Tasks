import {Page, Locator} from "@playwright/test";

class YoutubeVideoPage {
    readonly adsContainer: Locator;
    readonly page: Page;
    readonly path: string = "https://www.youtube.com/watch?v=HatC68Pea6M";
    readonly skipButton: Locator;

    constructor(page: Page) {
        this.adsContainer = page.locator(".video-ads");
        this.page = page;
        this.skipButton = page.locator(".ytp-ad-skip-button-modern");
    }
}
export default YoutubeVideoPage;
