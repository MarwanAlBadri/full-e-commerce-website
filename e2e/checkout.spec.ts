import { expect, test } from "@playwright/test";
import { addFirstProductToCart, fillBilling, signUp } from "./helpers";

test("a signed-in user places an order and the cart empties", async ({ page }) => {
    await signUp(page);
    await addFirstProductToCart(page);
    await page.goto("/checkout");
    await fillBilling(page);
    await page.getByTestId("place-order").click();

    await expect(page.getByTestId("order-success")).toBeVisible();
    await expect(page.getByTestId("cart-count")).toHaveText("0");
});

test("an empty cart cannot place an order", async ({ page }) => {
    await signUp(page);
    await page.goto("/checkout");
    await fillBilling(page);
    await page.getByTestId("place-order").click();

    await expect(page.getByRole("alert")).toContainText("cart is empty");
    await expect(page.getByTestId("order-success")).toHaveCount(0);
});

test("a visitor cannot order and returns to checkout after signing up", async ({ page }) => {
    await addFirstProductToCart(page);
    await page.goto("/checkout");
    await expect(page.getByText("You need to log in to place an order.")).toBeVisible();
    await fillBilling(page);
    await page.getByTestId("place-order").click();

    await expect(page).toHaveURL(/\/login\?redirect=%2Fcheckout/);
    await expect(page.getByTestId("order-success")).toHaveCount(0);
    const orders = await page.evaluate(() => localStorage.getItem("exclusive:orders"));
    expect(orders).toBeNull();

    // Create an account from the same flow: the typed details are still there.
    await page.goto(page.url().replace("/login", "/signup"));
    const form = page.getByTestId("signup-form");
    await form.locator('input[name="name"]').fill("Sara");
    await form.locator('input[name="identifier"]').fill(`s-${Date.now()}@example.com`);
    await form.locator('input[type="password"]').fill("secret123");
    await form.locator('button[type="submit"]').click();

    await expect(page).toHaveURL("/checkout");
    await expect(page.locator('input[name="streetAddress"]')).toHaveValue("12 Test Street");
    await page.getByTestId("place-order").click();
    await expect(page.getByTestId("order-success")).toBeVisible();
});

test("saved billing details are not shown to another account", async ({ page }) => {
    await signUp(page);
    await addFirstProductToCart(page);
    await page.goto("/checkout");
    await fillBilling(page);
    await page.getByTestId("place-order").click();
    await expect(page.getByTestId("order-success")).toBeVisible();
    await page.goto("/");
    await page.getByTestId("logout").click();

    await signUp(page);
    await page.goto("/checkout");
    await expect(page.locator('input[name="streetAddress"]')).toHaveValue("");
});

test("logging out in one tab logs out the other", async ({ page, context }) => {
    await signUp(page);
    const otherTab = await context.newPage();
    await otherTab.goto("/");
    await expect(otherTab.getByTestId("logout")).toBeAttached();

    await page.getByTestId("logout").click();
    await expect(otherTab.getByTestId("logout")).toHaveCount(0);
});
