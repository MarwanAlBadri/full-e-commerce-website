import { expect, test, type Page } from "@playwright/test";

const card = (page: Page, name: string) =>
    page.getByTestId("product-card").filter({ hasText: name });

test("a product colour can be chosen on the card", async ({ page }) => {
    await page.goto("/");
    const gamepad = card(page, "GP11 Shooter USB Gamepad");
    const black = gamepad.getByRole("button", { name: "Black", exact: true });
    const red = gamepad.getByRole("button", { name: "Red", exact: true });

    await expect(black).toHaveAttribute("aria-pressed", "true");
    await red.click();
    await expect(red).toHaveAttribute("aria-pressed", "true");
    await expect(black).toHaveAttribute("aria-pressed", "false");
});

test("a sold-out colour is disabled on the card", async ({ page }) => {
    await page.goto("/");
    const jacket = card(page, "Quilted Satin Jacket");
    const soldOut = jacket.getByRole("button", { name: "Red (sold out)" });

    await expect(soldOut).toBeDisabled();
    await soldOut.click({ force: true });
    await expect(soldOut).toHaveAttribute("aria-pressed", "false");
    await expect(jacket.getByRole("button", { name: "Dark green" })).toHaveAttribute(
        "aria-pressed",
        "true",
    );
});

test("the product page offers the same colour rules", async ({ page }) => {
    await page.goto("/product/jr-zoom-soccer-cleats");
    const details = page.getByTestId("product-details");

    await expect(details.getByRole("button", { name: "Red (sold out)" })).toBeDisabled();
    await expect(details.getByRole("button", { name: "Yellow" })).toHaveAttribute(
        "aria-pressed",
        "true",
    );
});
