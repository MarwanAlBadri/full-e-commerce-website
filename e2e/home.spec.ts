import { expect, test } from "@playwright/test";

test("home page lists at least 4 products", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("product-card").nth(3)).toBeVisible();
});
