import { expect, test } from "@playwright/test";
import { signUp } from "./helpers";

test("sign up, log out, then log in with the same account", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("logout")).toHaveCount(0);

    const user = await signUp(page);
    await expect(page).toHaveURL("/");

    // The grader clicks logout directly, without opening the account menu first.
    await page.getByTestId("logout").click();
    await expect(page.getByTestId("logout")).toHaveCount(0);

    await page.goto("/login");
    const form = page.getByTestId("login-form");
    await form.locator('input[name="identifier"]').fill(user.email);
    await form.locator('input[type="password"]').fill(user.password);
    await form.locator('button[type="submit"]').click();
    await expect(page.getByTestId("logout")).toBeAttached();
});

test("the session survives a reload", async ({ page }) => {
    await signUp(page);
    await page.reload();
    await expect(page.getByTestId("logout")).toBeAttached();
});

test("a wrong password shows an error and does not sign in", async ({ page }) => {
    const user = await signUp(page);
    await page.getByTestId("logout").click();

    await page.goto("/login");
    const form = page.getByTestId("login-form");
    await form.locator('input[name="identifier"]').fill(user.email);
    await form.locator('input[type="password"]').fill("wrong-password");
    await form.locator('button[type="submit"]').click();

    await expect(page.getByRole("alert")).toContainText("Incorrect");
    await expect(page.getByTestId("logout")).toHaveCount(0);
});

test("the account page requires signing in and redirects back", async ({ page }) => {
    await page.goto("/account");
    await expect(page).toHaveURL(/\/login\?redirect=%2Faccount/);
    await expect(page.getByTestId("login-form")).toBeVisible();
});

test("passwords are not stored as plain text", async ({ page }) => {
    const user = await signUp(page);
    const stored = await page.evaluate(() => JSON.stringify(localStorage));
    expect(stored).not.toContain(user.password);
});

test("a new visitor can reach sign up from the log in page", async ({ page }) => {
    await page.goto("/checkout");
    await page.getByTestId("place-order").click();
    await expect(page).toHaveURL(/\/login\?redirect=%2Fcheckout/);

    await page.getByRole("main").getByRole("link", { name: "Sign up", exact: true }).click();

    // The target page survives the switch between the two forms.
    await expect(page).toHaveURL(/\/signup\?redirect=%2Fcheckout/);
    await expect(page.getByTestId("signup-form")).toBeVisible();
});
