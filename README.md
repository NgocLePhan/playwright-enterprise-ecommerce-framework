# Enterprise E-Commerce Automation Testing Framework

[![Playwright Tests CI](https://github.com/NgocLePhan/playwright-enterprise-ecommerce-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/NgocLePhan/playwright-enterprise-ecommerce-framework/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-v1.40+-green.svg?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Allure Report](https://img.shields.io/badge/Report-Allure-orange.svg?logo=allure)](https://allurereport.org/)

A robust, enterprise-grade automated testing solution combining UI End-to-End (E2E) and REST API test suites. Built with **Playwright**, **TypeScript**, and **Page Object Model (POM)** architecture, fully integrated with **Allure Reporting** and **GitHub Actions CI/CD pipeline**.

---

## 🎯 Target Applications Under Test

* **E2E Web App:** [SauceDemo E-Commerce](https://www.saucedemo.com)
* **REST API:** [ReqRes Hosted REST API](https://reqres.in)

---

## 🏗 Key Architectural Highlights

* **Page Object Model (POM):** Clean separation between test logic, locators, and user interactions to maximize reusability and maintainability.
* **Dual-Scope Project Configuration:** Distinct project configurations (`chromium` for E2E UI and `api` for REST requests) within `playwright.config.ts`.
* **Environment-Driven Configurations:** Multi-environment handling via `.env` injection and fallback strategies for seamless execution locally and on headless CI runners.
* **Comprehensive API Testing:** Direct HTTP assertion verifying status codes, response payloads, and data schemas with Playwright's native `request` context.
* **Continuous Integration:** Fully automated headless test execution via GitHub Actions on Ubuntu runners with zero plain-text credential leaks using GitHub Secrets.
* **Advanced Reporting:** High-level executive dashboards and step-level diagnostic traces powered by Allure Report.

---

## 📂 Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI pipeline configuration
├── pages/                         # Page Object Model layer
│   ├── login-page.ts              # Authentication page locators & methods
│   ├── inventory-page.ts          # Product listing & cart actions
│   └── checkout-page.ts           # Checkout process & verification
├── tests/
│   ├── e2e/
│   │   └── checkout-flow.spec.ts  # End-to-end shopping & checkout flows
│   └── api/
│       └── user-api.spec.ts       # REST API tests (GET, POST endpoints)
├── .env.qa                        # Environment-specific configuration
├── playwright.config.ts           # Global Playwright configuration & projects
├── package.json                   # Dependencies and execution scripts
└── README.md                      # Framework documentation
```

## 🚀 Getting Started

**Prerequisites**
- Node.js: v20.x or higher
- npm: v10.x or higher
- Java JDK: Required locally to render Allure reports (allure serve)

**Installation**

1. Clone the repository:
```
git clone [https://github.com/](https://github.com/)<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

2. Install dependencies:
```
npm install
```

3. Install Playwright browser binaries and OS dependencies:
```
npx playwright install --with-deps chromium
```

4. Set up environment variables:
    Create a .env.qa file in the root directory:
```
STANDARD_USER=standard_user
USER_PASSWORD=secret_sauce
```

## 🧪 Test Execution Scripts

| Command | Description |
| :--- | :--- |
| `npm run test` | Run all test suites (E2E & API) in QA environment |
| `npm run test:e2e` | Execute only UI End-to-End tests |
| `npm run test:api` | Execute only REST API tests |
| `npm run test:smoke` | Run high-priority test cases tagged with `@smoke` |
| `npm run allure:serve` | Generate and launch the local Allure Dashboard immediately |
| `npm run allure:generate` | Compile raw test data into static `allure-report/` files |
| `npm run allure:open` | Open an existing compiled Allure report |

## 📊 Test Reporting
- To inspect results immediately following a run:
```
npm run allure:serve
```

## ⚙️ CI/CD Workflow Summary
The GitHub Actions workflow triggers automatically on push and pull request events to main/master:

- Spins up an ubuntu-latest runner on Node 20.
- Installs cached dependencies via npm ci.
- Sets up Chromium binaries with required system dependencies.
- Reads credentials securely from GitHub Repository Secrets (STANDARD_USER, USER_PASSWORD).
- Runs test suites headlessly and archives Playwright and Allure artifacts for 14 days.

---

### **Cách cập nhật file:**
1. Copy toàn bộ nội dung trên vào file `README.md`.
2. Thay `<your-username>` và `<your-repo-name>` thành đường dẫn thật của bạn.
3. Commit và push lên GitHub:
   ```bash
   git add README.md
   git commit -m "docs: finalize comprehensive README with CI badges and architecture overview"
   git push origin main