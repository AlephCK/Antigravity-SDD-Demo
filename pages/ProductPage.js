// @ts-check
const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.addToCartButton = page.locator('button[id^="add-to-cart"]');
    this.backToProductsButton = page.locator('#back-to-products');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}

module.exports = { ProductPage };
