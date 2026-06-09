import { expect, test } from "@playwright/test";

test.describe("Rendering examples hub", () => {
  test("lists rendering strategies", async ({ page }) => {
    await page.goto("/rendering");

    await expect(page.getByRole("heading", { name: "Rendering strategies" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Static (SSG)" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Dynamic (SSR)" })).toBeVisible();
  });
});
