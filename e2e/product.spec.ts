import { expect, test } from "@playwright/test";
import { signUp } from "./helpers";

test("a product link opens the product page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByTestId("product-link").first();
    const name = await link.innerText();
    await link.click();

    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByTestId("product-details")).toContainText(name);
});

test("a signed-in user adds a review", async ({ page }) => {
    await signUp(page);
    await page.goto("/");
    await page.getByTestId("product-link").first().click();
    await expect(page.getByTestId("review")).toHaveCount(0);

    await page.getByTestId("review-text").fill("Great quality, arrived quickly.");
    await page.getByTestId("review-submit").click();

    await expect(page.getByTestId("review")).toHaveCount(1);
    await expect(page.getByTestId("review")).toContainText("Great quality, arrived quickly.");

    await page.reload();
    await expect(page.getByTestId("review")).toHaveCount(1);
});

test("a visitor is sent to log in and keeps the draft", async ({ page }) => {
    await page.goto("/product/havit-hv-g92-gamepad");
    await page.getByTestId("review-text").fill("My draft review");
    await page.getByTestId("review-submit").click();

    await expect(page).toHaveURL(/\/login\?redirect=/);
    await page.getByRole("link", { name: "Sign Up" }).first().isVisible();

    // Create an account from the log in flow, then come back to the product.
    await page.goto(page.url().replace("/login", "/signup"));
    const form = page.getByTestId("signup-form");
    await form.locator('input[name="name"]').fill("Reviewer");
    await form.locator('input[name="identifier"]').fill(`r-${Date.now()}@example.com`);
    await form.locator('input[type="password"]').fill("secret123");
    await form.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/\/product\/havit-hv-g92-gamepad/);
    await expect(page.getByTestId("review-text")).toHaveValue("My draft review");
});

test("an unknown product shows the 404 page", async ({ page }) => {
    await page.goto("/product/does-not-exist");
    await expect(page.getByRole("heading", { name: "404 Not Found" })).toBeVisible();
});
