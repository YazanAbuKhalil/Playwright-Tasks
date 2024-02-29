import { expect, test } from "@playwright/test";
import HomePage from "../pages/HomePage";

let homepage: HomePage;
test("Verify cisibilty of location alert", async ({ page }) => {
  homepage = new HomePage(page);
  await page.goto(homepage.path);
  const isPromptShown: boolean = await page.evaluate(() => {
    return new Promise((resolve) => {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        resolve(result.state === "prompt");
      });
    });
  });
  expect(isPromptShown).toBe(true);
});
