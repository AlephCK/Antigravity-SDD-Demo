# Requirements for SauceDemo Test Automation

## Overview
This project aims to implement a comprehensive End-to-End (E2E) test automation suite for the [SauceDemo](https://www.saucedemo.com/) e-commerce website. The goal is to ensure the core functionality of the demo store works correctly. Following best practices, the tests will be written using Playwright and JavaScript.

## Scope

### In-Scope Features
The automation suite will cover the following critical user flows:

1.  **User Authentication**
    *   Unsuccessful login attempts (invalid credentials).
    *   Successful login with standard user credentials.
    *   Logout functionality.
    *   Login with a locked out user

2.  **Product Catalog**
    *   Viewing list of products.
    *   Sorting products (Name A-Z, Z-A, Price Low-High, High-Low).
    *   Viewing product details.

3.  **Shopping Cart**
    *   Adding items to the cart from the product list.
    *   Adding items to the cart from the product detail page.
    *   Removing items from the cart.
    *   Verifying cart contents and total item count.

4.  **Checkout Process**
    *   Initiating checkout.
    *   Entering shipping information.
    *   Verifying order summary (items, total price including tax).
    *   Completing the purchase.
    *   Verifying the success message.

### Out-of-Scope
*   Visual regression testing (unless specifically requested later).
*   API testing (this project focuses on UI/E2E flows).
*   Mobile app testing (web browser only).
*   Performance testing.

## Technical Requirements

### Technology Stack
*   **Language:** JavaScript (Node.js)
*   **Framework:** Playwright (latest stable version)
*   **Test Runner:** Playwright Test Runner
*   **Reporting:** Playwright HTML Reporter

### Environment
*   **Target URL:** `https://www.saucedemo.com/`
*   **Browsers:** Chromium, Firefox, WebKit (Safari)
*   **Execution Mode:** Headless (default) and Headed (for debugging).

## Assumptions & Constraints
*   The application under test (SauceDemo) uses standard HTML elements and is testable via standard web automation tools.
*   Test data (usernames/passwords) is static and provided on the login page of the site (password is "secret-sauce" and the valid user is "standard_user" and the locked user is "locked_out_user")
*   Network stability is assumed for the duration of the test run.
*   The project will follow the Page Object Model (POM) design pattern for maintainability.

## Deliverables
*   A fully configured Playwright project repository.
*   Test scripts covering the in-scope scenarios.
*   Instructions for running tests locally.
*   HTML test execution reports.
