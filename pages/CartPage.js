// @ts-check
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.checkoutButton = page.locator('#checkout');
    this.cartItems = page.locator('.cart_item');
  }

  /**
   * @param {string} productName
   */
  async removeLineItem(productName) {
    const item = this.cartItems.filter({ hasText: productName }).first();
    await item.locator('button[id^="remove"]').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getLineItemNames() {
    return await this.cartItems.locator('.inventory_item_name').allInnerTexts();
  }
}

module.exports = { CartPage };
