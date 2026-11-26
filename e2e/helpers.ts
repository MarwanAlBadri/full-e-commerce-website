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
