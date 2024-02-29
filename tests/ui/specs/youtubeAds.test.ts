import { test } from "@playwright/test";
import YoutubeVideoPage from "../pages/YoutubeVideoPage";

let youtubeVideoPage: YoutubeVideoPage;

test.describe("Youtube Ads", () => {
  test.beforeEach(async ({ page }) => {
    youtubeVideoPage = new YoutubeVideoPage(page);
    await page.goto(youtubeVideoPage.path);
    await page.reload();
  });

  test("Verify ad visibility", async ({ page }) => {
    await youtubeVideoPage.adsContainer.waitFor({ state: "visible" });
    await page.waitForTimeout(10000);
    //await youtubeVideoPage.skipButton.waitFor({state: "visible"});
    if (await youtubeVideoPage.skipButton.isVisible()) {
      await youtubeVideoPage.skipButton.click();
    } else {
      await page.pause();
      await page.locator(".ytp-large-play-button").click();
    }
  });
});
