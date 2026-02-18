// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { standard_user, password } = require('../../utils/test-data');

test.describe('Product and Cart Scenarios', () => {
  /** @type {LoginPage} */
  let loginPage;
  /** @type {InventoryPage} */
  let inventoryPage;
  /** @type {CartPage} */
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login(standard_user, password);
  });

  test('should sort products by price (low to high)', async ({ page }) => {
    await inventoryPage.sortProducts('lohi');

    const prices = await page.locator('.inventory_item_price').allInnerTexts();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

    // Create a sorted version to compare against
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
  });

  test('should add multiple items to cart and verify badge', async ({ page }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(2);
  });

  test('should remove item from cart and verify badge update', async ({ page }) => {
    // Add 2 items
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    await inventoryPage.openCart();

    // Remove 1 item
    await cartPage.removeLineItem('Sauce Labs Backpack');

    // Verify badge updated to 1
    // Note: Using inventoryPage method because badge is in header (common)
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(1);

    // Verify item removed from list
    const items = await cartPage.getLineItemNames();
    expect(items).not.toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Bike Light');
  });
});
