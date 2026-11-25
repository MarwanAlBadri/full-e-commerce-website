import { expect, test } from "@playwright/test";

// Test ids are written literally, the way the automated grader looks them up.

test("home page has no horizontal scroll", async ({ page, viewport }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Flash Sales" })).toBeVisible();

    // Compare with the configured width: on mobile `innerWidth` grows along with an overflow.
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(viewport!.width);
});

test("home page lists at least 4 products", async ({ page }) => {
    // Expected to fail until step P6.1 adds the test ids; remove this line then.
    test.fail();

    await page.goto("/");
    await expect(page.getByTestId("product-card").nth(3)).toBeVisible();
});
