# Design Document for SauceDemo Test Automation

## 1. Architecture Overview

### 1.1 Page Object Model (POM)
The project will follow the Page Object Model (POM) design pattern. This ensures that the test logic is separated from the underlying UI structure, making the tests more readable, maintainable, and robust against UI changes.

#### Directory Structure
```
tests/
  ├── e2e/                  # End-to-end test specifications
  │   ├── login.spec.js     # Authentication tests
  │   ├── products.spec.js  # Product catalog tests
  │   ├── cart.spec.js      # Cart functionality tests
  │   └── checkout.spec.js  # Checkout process tests
pages/
  ├── BasePage.js           # Common methods used across all pages
  ├── LoginPage.js          # Interactions for the login page
  ├── InventoryPage.js      # Interactions for the product list
  ├── ProductPage.js        # Interactions for individual product details
  ├── CartPage.js           # Interactions for the shopping cart
  └── CheckoutPage.js       # Interactions for the checkout process (steps 1 & 2)
utils/                      # Helper functions and test data
  └── test-data.js          # Static credentials and product data
playwright.config.js        # Global configuration
```

### 1.2 Technology Stack
*   **Language:** JavaScript (ES6+)
*   **Test Framework:** Playwright
*   **Assertion Library:** Playwright's built-in `expect` assertions

## 2. Component Specifications

### 2.1 BasePage (Abstract)
*   **Responsibilities:**
    *   Initialize the Playwright `page` object.
    *   Provide common navigation or utility methods (e.g., waiting for elements, common URL checks).

### 2.2 LoginPage
*   **URL:** `https://www.saucedemo.com/`
*   **Locators:**
    *   Username Input: `datatest-id=username` or `#user-name`
    *   Password Input: `datatest-id=password` or `#password`
    *   Login Button: `datatest-id=login-button` or `#login-button`
    *   Error Message Container: `.error-message-container`
*   **Methods:**
    *   `navigate()`: Go to the login page.
    *   `login(username, password)`: Perform the login action.
    *   `getErrorMessage()`: Retrieve validation error text.

### 2.3 InventoryPage (Products)
*   **URL:** `https://www.saucedemo.com/inventory.html`
*   **Locators:**
    *   Product Items: `.inventory_item`
    *   Product Sort Container: `.product_sort_container`
    *   Add to Cart Buttons: `button[id^="add-to-cart"]`
    *   Shopping Cart Badge: `.shopping_cart_badge`
    *   Shopping Cart Link: `.shopping_cart_link`
*   **Methods:**
    *   `addItemToCart(productName)`: Add a specific product to cart.
    *   `sortProducts(option)`: Sort the product grid (e.g., 'lohi', 'hilo').
    *   `getCartItemCount()`: Return standard integer from badge.
    *   `openCart()`: Navigate to cart page.

### 2.4 CartPage
*   **URL:** `https://www.saucedemo.com/cart.html`
*   **Locators:**
    *   Cart Items: `.cart_item`
    *   Checkout Button: `#checkout`
    *   Remove Buttons: `button[id^="remove"]`
*   **Methods:**
    *   `removeLineItem(productName)`: Remove item from cart.
    *   `proceedToCheckout()`: Click checkout button.
    *   `getLineItemNames()`: Return array of product names currently in cart.

### 2.5 CheckoutPage
*   **URL:** `https://www.saucedemo.com/checkout-step-one.html` & `step-two.html`
*   **Locators:**
    *   First Name Input: `#first-name`
    *   Last Name Input: `#last-name`
    *   Zip Code Input: `#postal-code`
    *   Continue Button: `#continue`
    *   Finish Button: `#finish`
    *   Order Confirmation: `.complete-header`
*   **Methods:**
    *   `fillShippingInfo(firstName, lastName, zip)`: Complete shipping form.
    *   `finishCheckout()`: Complete the purchase.
    *   `getOrderConfirmationMessage()`: Verify success text.

## 3. Data Flow & Test Data

### 3.1 Static Test Data Strategy
Since the application uses static credentials, we will centralize them in `utils/test-data.js`.

*   **Users:**
    *   **Standard:** `standard_user`
    *   **Locked Out:** `locked_out_user`
    *   **Password:** `secret-sauce`
*   **Product Data:**
    *   We will define expected product names and prices to use for verification in tests.

### 3.2 Test Isolation
*   Tests will run in parallel where possible using Playwright's default `fullyParallel` mode.
*   Each test will start with a fresh browser context (handled automatically by Playwright fixture).
*   `beforeEach` hooks will be used to handle common setup (like logging in).

## 4. Implementation Steps (High Level)
1.  **Project Initialization:** `npm init playwright@latest`.
2.  **Infrastructure:** Create `pages/` and `utils/` directories.
3.  **Core Implementation:** Implement `LoginPage` and `InventoryPage` first.
4.  **Test Creation:** Write login tests (positive/negative).
5.  **Expansion:** Implement Cart and Checkout pages.
6.  **Full Flow:** Write complete purchase flow tests.
