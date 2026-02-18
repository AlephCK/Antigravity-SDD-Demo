# Tasks for SauceDemo Test Automation

## Progress Tracking / Rules & Tips
- **Project Structure:** Using standard Playwright structure with `pages` for POM and `tests/e2e` for specs.
- **Config:** BaseURL is set globally to `https://www.saucedemo.com`.
- **Learnings:**
  - Password is `secret_sauce` (underscore), not `secret-sauce` (dash).
  - Logout flow involves `#react-burger-menu-btn` and `#logout_sidebar_link`.

# Next Tasks Order

## Current Execution Order

## Current Execution Order

## Current Execution Order

All tasks complete.

## Execution Plan

- **Group A (Sequential - Foundational):** Task 2.1 -> Task 3.1 [Complete]
- **Group B (Parallel - Feature Pages):** Task 2.2, Task 2.3
  - Next up.
- **Group C (Parallel - Feature Tests):** Task 3.2, Task 3.3

## Phase 1: Project Setup & Core Framework
- [x] **Task 1.1**: Initialize Playwright Project
    - [x] Run `npm init playwright@latest`
    - [x] Configure `playwright.config.js` with:
        - [x] Base URL: `https://www.saucedemo.com/`
        - [x] Browsers: Chromium, Firefox, WebKit
        - [x] Parallel execution settings
        - [x] HTML Reporter
    - [x] Create directory structure: `tests/e2e`, `pages`, `utils`
    - [x] Create `utils/test-data.js` with user credentials (`standard_user`, `locked_out_user`)
    - [x] **Test:** Verify project runs with a sample test (`npx playwright test`)
        - [x] Ensure HTML report generates correctly

## Phase 2: Page Object Implementation
- [x] **Task 2.1**: Implement BasePage & LoginPage
    - [x] Create `pages/BasePage.js` with common navigation methods
    - [x] Create `pages/LoginPage.js` extending BasePage
        - [x] Implement `navigate()`
        - [x] Implement `login(username, password)`
        - [x] Implement `getErrorMessage()`
    - [x] **Test:** Create strict unit-style test for page object methods (if possible) or verify manually via REPL/debug

- [x] **Task 2.2**: Implement InventoryPage & ProductPage
    - [x] Create `pages/InventoryPage.js`
        - [x] Implement `addItemToCart(productName)`
        - [x] Implement `sortProducts(option)`
        - [x] Implement `getCartItemCount()`
        - [x] Implement `openCart()`
    - [x] Create `pages/ProductPage.js` (for individual item view)
        - [x] Implement `addToCart()`
        - [x] Implement `backToProducts()`

- [x] **Task 2.3**: Implement CartPage & CheckoutPage
    - [x] Create `pages/CartPage.js`
        - [x] Implement `removeLineItem(productName)`
        - [x] Implement `proceedToCheckout()`
    - [x] Create `pages/CheckoutPage.js`
        - [x] Implement `fillShippingInfo(firstName, lastName, zip)`
        - [x] Implement `finishCheckout()`
        - [x] Implement `getOrderConfirmationMessage()`

## Phase 3: Test Specifications (E2E)
**Note:** All tests must use real browser interactions against `saucedemo.com`. No mocks.

- [x] **Task 3.1**: Automate Authentication Scenarios
    - [x] Create `tests/e2e/login.spec.js`
    - [x] **Test Case:** Valid Login
        - [x] Login with `standard_user`
        - [x] Verify redirect to inventory page
    - [x] **Test Case:** Locked Out User
        - [x] Login with `locked_out_user`
        - [x] Verify error message contains "locked out"
    - [x] **Test Case:** Invalid Login
        - [x] Login with random strings
        - [x] Verify error message appears
    - [x] **Test Case:** Logout
        - [x] Login -> Click Burger Menu -> Click Logout
        - [x] Verify redirect to login page

- [x] **Task 3.2**: Automate Product & Cart Scenarios
    - [x] Create `tests/e2e/products.spec.js`
    - [x] **Test Case:** Sort Products
        - [x] Sort by Price (Low to High)
        - [x] Verify first item price < last item price
    - [x] **Test Case:** Add to Cart
        - [x] Add 2 items from Inventory
        - [x] Verify cart badge shows "2"
    - [x] **Test Case:** Remove from Cart
        - [x] Go to Cart page -> Remove 1 item
        - [x] Verify cart badge shows "1"

- [x] **Task 3.3**: Automate Checkout Flow
    - [x] Create `tests/e2e/checkout.spec.js`
    - [x] **Test Case:** Complete Purchase
        - [x] Login
        - [x] Add item to cart
        - [x] Checkout -> Fill Info -> Finish
        - [x] Verify "THANK YOU FOR YOUR ORDER" message
        - [x] Verify cart is empty after purchase
