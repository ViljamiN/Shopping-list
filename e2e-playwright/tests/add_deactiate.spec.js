const { test, expect } = require("@playwright/test");

let listName;
let listId;
let itemName;
let itemId;

test("User can create a new shopping list", async ({ page }) => {
  await page.goto("/lists");
  listName = `My shopping list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type='submit'][value='Submit List!']").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

test("User can click a shopping list to see its items", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1:nth-child(2)")).toHaveText(listName);
  listId = page.url().split("/").pop();
});

test("User can add an item to a shopping list", async ({ page }) => {
  await page.goto(`/lists/${listId}`);
  itemName = `My item: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type='submit'][value='Add Item!']").click();
  await expect(page.locator(`li >> text='${itemName}'`)).toContainText(itemName);
  itemId = await page.locator(`li >> text='${itemName}'`).getAttribute("id");
});

test("User can mark an item as collected", async ({ page }) => {
  await page.goto(`/lists/${listId}`);
  await page.locator(`input[id='${itemId}'][type='submit']`).click();
  await expect(page.locator(`del >> text='${itemName}'`)).toBeVisible();
});

test("User can deactivate a shopping list", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.locator(`a >> text='${listName}'`)).toBeVisible();
  await page.locator(`input[id='${listId}'][type='submit']`).click();
  await expect(page.locator(`a >> text='${listName}'`)).not.toBeVisible();
});