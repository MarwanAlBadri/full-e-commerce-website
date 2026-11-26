import { expect, type Page } from "@playwright/test";

// Test ids are written literally, the way the automated grader looks them up.

export const newUser = () => ({
    name: "Test Buyer",
    email: `buyer-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`,
    password: "secret123",
});

export async function signUp(page: Page, user = newUser()) {
    await page.goto("/signup");
    const form = page.getByTestId("signup-form");
    await form.locator('input[name="name"]').fill(user.name);
    await form.locator('input[name="identifier"]').fill(user.email);
    await form.locator('input[type="password"]').fill(user.password);
    await form.locator('button[type="submit"]').click();
    await expect(page.getByTestId("logout")).toBeAttached();
    return user;
}

/** Adds the first product on the home page to the cart and returns its name. */
export async function addFirstProductToCart(page: Page) {
    await page.goto("/");
    const card = page.getByTestId("product-card").first();
    const name = await card.getByTestId("product-link").innerText();
    await card.getByTestId("add-to-cart").click();
    return name;
}

export async function fillBilling(page: Page) {
    const form = page.getByTestId("checkout-form");
    await form.locator('input[name="firstName"]').fill("Sara");
    await form.locator('input[name="streetAddress"]').fill("12 Test Street");
    await form.locator('input[name="city"]').fill("Cairo");
    await form.locator('input[name="phone"]').fill("01001234567");
    await form.locator('input[name="email"]').fill("sara@example.com");
}
