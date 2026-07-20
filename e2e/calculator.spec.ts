import { expect, test, type Page } from "@playwright/test";

function displayValue(page: Page) {
  return page.locator(".calculator-display-value");
}

function displayExpression(page: Page) {
  return page.locator(".calculator-display-expression");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("completes a calculation with button clicks and clears the display", async ({ page }) => {
  await page.getByRole("button", { name: "Seven" }).click();
  await expect(displayValue(page)).toHaveText("7");

  await page.getByRole("button", { name: "Add" }).click();
  await expect(displayExpression(page)).toHaveText("7 +");

  await page.getByRole("button", { name: "Five" }).click();
  await expect(displayValue(page)).toHaveText("5");

  await page.getByRole("button", { name: "Equals" }).click();
  await expect(displayValue(page)).toHaveText("12");
  await expect(displayExpression(page)).toHaveText("7 + 5 =");

  await page.getByRole("button", { name: "Clear" }).click();
  await expect(displayValue(page)).toHaveText("0");
  await expect(displayExpression(page)).toBeEmpty();
});

test("completes a chained calculation with keyboard input", async ({ page }) => {
  await page.getByRole("status").click();

  await page.keyboard.press("1");
  await page.keyboard.press("2");
  await page.keyboard.press("+");
  await page.keyboard.press("3");
  await page.keyboard.press("*");
  await expect(displayValue(page)).toHaveText("15");
  await expect(displayExpression(page)).toHaveText("15 x");

  await page.keyboard.press("2");
  await page.keyboard.press("Enter");

  await expect(displayValue(page)).toHaveText("30");
  await expect(displayExpression(page)).toHaveText("15 x 2 =");
});

test("handles keyboard division truncation and divide by zero", async ({ page }) => {
  await page.getByRole("status").click();

  await page.keyboard.press("7");
  await page.keyboard.press("/");
  await page.keyboard.press("2");
  await page.keyboard.press("=");

  await expect(displayValue(page)).toHaveText("3");
  await expect(displayExpression(page)).toHaveText("7 / 2 =");

  await page.keyboard.press("Escape");
  await page.keyboard.press("8");
  await page.keyboard.press("/");
  await page.keyboard.press("0");
  await page.keyboard.press("=");

  await expect(displayValue(page)).toHaveText("Cannot divide by zero");
  await expect(page.getByRole("status")).toHaveAttribute("aria-invalid", "true");
});
