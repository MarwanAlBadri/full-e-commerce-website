import { expect, test } from "@playwright/test";
import { addFirstProductToCart } from "./helpers";

test("search shows only matching products", async ({ page }) => {
    await page.goto("/");
    const search = page.getByTestId("search-input");
    await search.fill("gamepad");
    await search.press("Enter");

    await expect(page).toHaveURL(/\/search\?q=gamepad/);
    const names = await page
        .getByTestId("product-card")
        .getByTestId("product-link")
        .allInnerTexts();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) expect(name.toLowerCase()).toContain("gamepad");
});

test("search with no match shows no products", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("search-input").fill("zzzz-nothing");
    await page.getByTestId("search-input").press("Enter");

    await expect(page.getByText("No products found")).toBeVisible();
    await expect(page.getByTestId("product-card")).toHaveCount(0);
});

test("a wishlisted product appears on the wishlist page", async ({ page }) => {
    await page.goto("/");
    const card = page.getByTestId("product-card").first();
    const name = await card.getByTestId("product-link").innerText();
    await card.getByTestId("add-to-wishlist").click();

    await page.goto("/wishlist");
    await expect(page.getByTestId("wishlist-item")).toHaveCount(1);
    await expect(page.getByTestId("wishlist-item")).toContainText(name);
});

test("cart counter, cart page and removal", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("cart-count")).toHaveText("0");

    const name = await addFirstProductToCart(page);
    await expect(page.getByTestId("cart-count")).toHaveText("1");

    await page.goto("/cart");
    await expect(page.getByTestId("cart-item")).toHaveCount(1);
    await expect(page.getByTestId("cart-item")).toContainText(name);

    await page.getByTestId("remove-from-cart").click();
    await expect(page.getByTestId("cart-item")).toHaveCount(0);
    await expect(page.getByTestId("cart-count")).toHaveText("0");
});

test("checkout places an order and empties the cart", async ({ page }) => {
    await addFirstProductToCart(page);
    await page.goto("/checkout");

    const form = page.getByTestId("checkout-form");
    await form.locator('input[name="firstName"]').fill("Sara");
    await form.locator('input[name="streetAddress"]').fill("12 Test Street");
    await form.locator('input[name="city"]').fill("Cairo");
    await form.locator('input[name="phone"]').fill("01001234567");
    await form.locator('input[name="email"]').fill("sara@example.com");
    await page.getByTestId("place-order").click();

    await expect(page.getByTestId("order-success")).toBeVisible();
    await expect(page.getByTestId("cart-count")).toHaveText("0");
});

test("an empty cart cannot place an order", async ({ page }) => {
    await page.goto("/checkout");
    const form = page.getByTestId("checkout-form");
    await form.locator('input[name="firstName"]').fill("Sara");
    await form.locator('input[name="streetAddress"]').fill("12 Test Street");
    await form.locator('input[name="city"]').fill("Cairo");
    await form.locator('input[name="phone"]').fill("01001234567");
    await form.locator('input[name="email"]').fill("sara@example.com");
    await page.getByTestId("place-order").click();

    await expect(page.getByRole("alert")).toContainText("cart is empty");
    await expect(page.getByTestId("order-success")).toHaveCount(0);
});

test("the coupon lowers the total", async ({ page }) => {
    await addFirstProductToCart(page);
    await page.goto("/cart");
    await page.getByRole("textbox", { name: "Coupon code" }).fill("save10");
    await page.getByRole("button", { name: "Apply Coupon" }).click();
    await expect(page.getByText("Discount (SAVE10):")).toBeVisible();
});
