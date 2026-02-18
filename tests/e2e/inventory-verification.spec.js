// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { ProductPage } = require('../../pages/ProductPage');
const { standard_user, password } = require('../../utils/test-data');

test.describe('Inventory & Product Page Verification', () => {
  /** @type {LoginPage} */
  let loginPage;
  /** @type {InventoryPage} */
  let inventoryPage;
  /** @type {ProductPage} */
  let productPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productPage = new ProductPage(page);

    await loginPage.navigate();
    await loginPage.login(standard_user, password);
  });

  test('should add item to cart from inventory page', async ({ page }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(1);
  });

  test('should sort products by price (lohi)', async ({ page }) => {
    await inventoryPage.sortProducts('lohi');
    // Verify sort order
    const prices = await page.locator('.inventory_item_price').allInnerTexts();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    // Check if sorted
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
  });

  test('should add item from product detail page', async ({ page }) => {
    // Navigate to detail
    // We can use page.locator or InventoryPage helper if it exists (it doesn't yet for item click, only add to cart)
    // I'll add a click helper to verify ProductPage
    await page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' }).click();

    // On product page
    await productPage.addToCart();

    // Verify badge
    const count = await inventoryPage.getCartItemCount(); // Badge locator is same
    expect(count).toBe(1);

    // Back
    await productPage.backToProducts();
    await expect(page).toHaveURL(/inventory.html/);
  });
});
