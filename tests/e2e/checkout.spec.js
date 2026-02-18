// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { standard_user, password } = require('../../utils/test-data');

test.describe('Checkout Flow', () => {
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
  });

  test('should complete purchase successfully', async ({ page }) => {
    // Add item to cart
    await inventoryPage.addItemToCart('Sauce Labs Backpack');

    // Go to cart
    await inventoryPage.openCart();

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill shipping info
    await checkoutPage.fillShippingInfo('Test', 'User', '12345');

    // Verify on step two (overview)
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Finish checkout
    await checkoutPage.finishCheckout();

    // Verify success message
    const message = await checkoutPage.getOrderConfirmationMessage();
    expect(message).toBe('Thank you for your order!');

    // Verify cart is empty (badge should be inconsistent or gone)
    // Note: SauceDemo removes the badge entirely when empty
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(0);
  });
});
