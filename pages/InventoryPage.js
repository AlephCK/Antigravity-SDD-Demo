// @ts-check
const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.productSortContainer = page.locator('.product_sort_container');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
  }

  /**
   * @param {string} productName
   */
  async addItemToCart(productName) {
    // Locate the product item container that has the product name
    const productItem = this.inventoryItems.filter({ hasText: productName }).first();
    // Click the add to cart button within that item
    await productItem.locator('button[id^="add-to-cart"]').click();
  }

  /**
   * @param {string} option - 'az', 'za', 'lohi', 'hilo'
   */
  async sortProducts(option) {
    await this.productSortContainer.selectOption(option);
  }

  async getCartItemCount() {
    if (await this.shoppingCartBadge.isVisible()) {
      const text = await this.shoppingCartBadge.textContent();
      return parseInt(text || '0', 10);
    }
    return 0;
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}

module.exports = { InventoryPage };
