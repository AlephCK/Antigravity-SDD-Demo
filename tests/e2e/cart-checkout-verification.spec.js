// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { standard_user, password } = require('../../utils/test-data');

test.describe('Cart & Checkout Page Verification', () => {
  /** @type {LoginPage} */
  let loginPage;
  /** @type {InventoryPage} */
  let inventoryPage;
  /** @type {CartPage} */
  let cartPage;
  /** @type {CheckoutPage} */
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(standard_user, password);
    // Add item and go to cart
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
  });

  test('should list items in cart', async ({ page }) => {
    const items = await cartPage.getLineItemNames();
    expect(items).toContain('Sauce Labs Backpack');
  });

  test('should remove item from cart', async ({ page }) => {
    await cartPage.removeLineItem('Sauce Labs Backpack');
    const items = await cartPage.getLineItemNames();
    expect(items).not.toContain('Sauce Labs Backpack');
  });

  test('should proceed to checkout and complete order', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete.html/);

    const message = await checkoutPage.getOrderConfirmationMessage();
    expect(message).toContain('Thank you for your order!');
  });
});
