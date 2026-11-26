import { expect, test, type Page } from "@playwright/test";
import { addFirstProductToCart, signUp } from "./helpers";

const publicRoutes = [
    { path: "/", marker: "Flash Sales" },
    { path: "/about", marker: "Our Story" },
    { path: "/contact", marker: "Call To Us" },
    { path: "/cart", marker: "Your cart is empty" },
    { path: "/wishlist", marker: "Wishlist (0)" },
    { path: "/checkout", marker: "Billing Details" },
    { path: "/signup", marker: "Create an account" },
    { path: "/login", marker: "Log in to Exclusive" },
    { path: "/product/havit-hv-g92-gamepad", marker: "HAVIT HV-G92 Gamepad" },
    { path: "/search?tag=all", marker: "All Products" },
    { path: "/nothing-here", marker: "404 Not Found" },
];

/** Compares with the configured width: on mobile `innerWidth` grows along with an overflow. */
async function expectNoHorizontalScroll(page: Page) {
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(page.viewportSize()!.width);
}

for (const { path, marker } of publicRoutes) {
    test(`${path} opens directly without horizontal scroll`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("console", (message) => {
            if (message.type() === "error") errors.push(message.text());
        });

        await page.goto(path);
        await expect(page.getByRole("heading", { name: marker }).first()).toBeVisible();
        await expectNoHorizontalScroll(page);
        expect(errors).toEqual([]);
    });
}

test("filled pages have no horizontal scroll", async ({ page }) => {
    await signUp(page);
    await addFirstProductToCart(page);
    await page.getByTestId("product-card").nth(1).getByTestId("add-to-wishlist").click();

    for (const path of [
        "/",
        "/cart",
        "/checkout",
        "/wishlist",
        "/account",
        "/account?tab=orders",
    ]) {
        await page.goto(path);
        await expect(page.getByRole("contentinfo")).toBeVisible();
        await expectNoHorizontalScroll(page);
    }
});
