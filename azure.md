/**
 * Steps to set up and run tests using Microsoft Playwright Testing (Preview) on Azure:
 * 
 * 1. Goto Azure Devops, Create an Azure account and add the Microsoft Playwright Testing (Preview) resource.
 * 
 * 2. Go to [playwright.microsoft.com](https://playwright.microsoft.com) and follow the steps to connect your Azure account with this tenant.
 * 
 * 2.1. Install the necessary package by running the following command:
 *      ```
 *      npm init @azure/microsoft-playwright-testing
 *      ```
 *      This will create a `playwright.service.config.js` file in your repository.
 * 
 * 2.2. Install the Azure CLI using Homebrew on your system (skip this step if Azure CLI is already installed):
 *      ```
 *      brew update && brew install azure-cli
 *      ```
 * 
 * 2.3. Log in to your Azure account using the following command in the terminal:
 *      ```
 *      az login --tenant <TENANT-ID>
 *      ```
 * 
 * 3. After a successful login, export the Playwright service URL:
 *      ```
 *      export PLAYWRIGHT_SERVICE_URL=${PLAYWRIGHT_SERVICE_URL}
 *      ```
 * 
 * 4. Run your tests using the following command:
 *      ```
 *      npx playwright test --config=playwright.service.config.js --workers=20
 *      ```
 */
