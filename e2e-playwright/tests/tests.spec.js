const { test, expect } = require("@playwright/test");

test("Can create a list.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("input[type=text]").type("testing");
  await page.click('text="Create list!"');
  await page.goto("/lists");
  await page.locator("input[type=text]").type("testing2");
  await page.click('text="Create list!"');
  await expect(page.locator("li")).toHaveText(["testing", "testing2"]);
});

test("Can show single list.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`a >> text='testing'`).click();
  await expect(page.locator("h1")).toHaveText("testing");
});

test("Can add items to shopping list.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`a >> text='testing'`).click();
  await page.locator("input[type=text]").type("Item1");
  await page.click('text="Add items!"');
  await page.locator("input[type=text]").type("Item2");
  await page.click('text="Add items!"');
  await expect(page.locator("li")).toHaveText(["Item1", "Item2"]);
});

test("Can mark items as collected.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`a >> text='testing'`).click();
  await page.locator("text=Mark collected!").first().click();
  await expect(page.locator("li").first()).toHaveText(["Item2"]);
  await expect(page.locator("li").nth(1)).toHaveText(["Item1"]);
  await page.locator("text=Mark collected!").first().click();
  await expect(page.locator("li").first()).toHaveText(["Item1"]);
  await expect(page.locator("li").nth(1)).toHaveText(["Item2"]);
});

test("Can deactivate shopping list.", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.locator("li")).toHaveText(["testing", "testing2"]);
  await page.locator("text=Deactivate list!").nth(1).click();
  await expect(page.locator("li")).toHaveText(["testing"]);
});
