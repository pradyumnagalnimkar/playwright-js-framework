const { Given, When, Then } = require("@cucumber/cucumber");
const { PageFactory } = require("../../pages/page_factory")
const { expect } = require("@playwright/test")
const  playwright  = require("@playwright/test")

Given('Login to application with {string} and {string}', {timeout: 10*1000}, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch({headless: false})
    const context = await browser.newContext()
    this.page = await context.newPage();
    this.page_factory = new PageFactory(this.page);
    let login_page = this.page_factory.getLoginPage();
    await login_page.loginToApp(username, password)
    await expect(login_page.notification_banner).toContainText("Login Successfully")
    await login_page.notification_banner.waitFor({state: "detached"})
  });

When('Add {string} to cart', {timeout: 10*1000}, async function (product_name) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboard_page = this.page_factory.getDashboardPage();
    await this.dashboard_page.searchProductAddToCart(product_name);
    await expect(this.dashboard_page.notification_banner).toContainText(" Product Added To Cart ")
    
});

Then('Navigate to cart', {timeout: 10*1000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboard_page.navigateToCart()
});

When('Enter valid details and place Order', {timeout: 10*1000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    let checkout_page = this.page_factory.getCheckoutPage()
    await checkout_page.checkoutOrder('12','31', '123', "ruben.amorim+admin@gmail.com", "rahulshettyacademy")
    await expect(checkout_page.applied_coupon_label).toHaveAttribute("style","color: green;")
    await expect(checkout_page.shipping_address_label).toContainText("ruben.amorim+admin@gmail.com")
    await checkout_page.selectCountry("Cuba")
    await checkout_page.placeOrder()
    this.order_details_page = this.page_factory.getOrderDetailsPage()
    await expect(this.order_details_page.order_confirmation).toContainText(" Thankyou for the order. ")
    this.order_id = await this.order_details_page.order_id_label.textContent()
    console.log(`Order placed successfully! Order Id: ${this.order_id}`)
});

Then('Verify order is present in Orderhistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    let order_list_page = this.page_factory.getOrderListPage()
    await order_list_page.viewOrdeDetails(this.order_id)
    await expect(this.page.getByText("Thank you for Shopping With Us")).toBeVisible()
    await expect(this.order_details_page.order_summary_text).toContainText(" order summary ")
    const actualOrderId = await this.order_details_page.order_id_confirmation_label.textContent()
    expect(this.order_id.includes(actualOrderId)).toBeTruthy()
    await expect(this.order_details_page.order_product_name).toContainText("qwerty")
  });