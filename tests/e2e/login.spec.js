// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { standard_user, locked_out_user, password } = require('../../utils/test-data');

test.describe('Authentication Scenarios', () => {
  /** @type {LoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(standard_user, password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should show error for locked out user', async ({ page }) => {
    await loginPage.login(locked_out_user, password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Sorry, this user has been locked out');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await loginPage.login('random_user', 'random_pass');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('should logout successfully', async ({ page }) => {
    await loginPage.login(standard_user, password);

    // Open hamburger menu
    await page.locator('#react-burger-menu-btn').click();

    // Click logout link
    await page.locator('#logout_sidebar_link').click();

    // Verify redirect to login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
