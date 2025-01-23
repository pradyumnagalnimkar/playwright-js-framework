const { Given, When, Then } = require("@cucumber/cucumber");
const { PageFactory } = require("../../pages/page_factory")
const { playwright } = require("@playwright/test")

Given('Login to application with {username} and {password}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch()
    const context = await browser.newContext();
    const page = await context.newPage();
    let page_factory = new PageFactory(page);
    let login_page = page_factory.getLoginPage();
    await login_page.loginToApp(username, password)
    await expect(login_page.notification_banner).toContainText("Login Successfully")
    await login_page.notification_banner.waitFor({state: "detached"})
  });

When('Add {product_name} to cart', function (product_name) {
    // Write code here that turns the phrase above into concrete actions
    
});

Then('Verify {product_name} is displayed in cart', function (product_name) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('Enter valid details and place Order', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Verify order is present in Orderhistory', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });