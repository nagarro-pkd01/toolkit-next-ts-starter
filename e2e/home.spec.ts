import { expect, test } from "@playwright/test";

test.describe("Shop home", () => {
  test("displays shop heading", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Shop Home" })).toBeVisible();
  });

  test("navigates to dashboard from header", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Dashboard" }).click();

    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });
});
