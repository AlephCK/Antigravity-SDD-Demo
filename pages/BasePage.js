// @ts-check

/**
 * Base Page Object Model class
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL relative to base URL
   * @param {string} path
   */
  async navigate(path = '/') {
    await this.page.goto(path);
  }
}

module.exports = { BasePage };
