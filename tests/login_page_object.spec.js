const { test, expect } = require("@playwright/test")
const { PageFactory } = require("../pages/page_factory")


test("Place Order", async({  page }) => {
    let username = "ruben.amorim+admin@gmail.com"
    let passsword = "Test@12345678"
    let product = "QWERTY".toLowerCase()
    

    let page_factory = new PageFactory(page);
    let login_page = page_factory.getLoginPage();
    await login_page.loginToApp(username, passsword)
    await expect(login_page.notification_banner).toContainText("Login Successfully")
    await login_page.notification_banner.waitFor({state: "detached"})
    let dashboard_page = page_factory.getDashboardPage();
    await dashboard_page.searchProductAddToCart(product);
    await expect(dashboard_page.notification_banner).toContainText(" Product Added To Cart ")
    await dashboard_page.navigateToCart()
    let checkout_page = page_factory.getCheckoutPage()
    await checkout_page.checkoutOrder('12','31', '123', username, "rahulshettyacademy")
    await expect(checkout_page.applied_coupon_label).toHaveAttribute("style","color: green;")
    await expect(checkout_page.shipping_address_label).toContainText(username)
    await checkout_page.selectCountry("Cuba")
    await checkout_page.placeOrder()
    let order_details_page = page_factory.getOrderDetailsPage()
    await expect(order_details_page.order_confirmation).toContainText(" Thankyou for the order. ")
    const order_id = await order_details_page.order_id_label.textContent()
    console.log(`Order placed successfully! Order Id: ${order_id}`)
    let order_list_page = page_factory.getOrderListPage()
    await order_list_page.viewOrdeDetails(order_id)
    await expect(page.getByText("Thank you for Shopping With Us")).toBeVisible()
    await expect(order_details_page.order_summary_text).toContainText(" order summary ")
    const actualOrderId = await order_details_page.order_id_confirmation_label.textContent()
    expect(order_id.includes(actualOrderId)).toBeTruthy()
    await expect(order_details_page.order_product_name).toContainText(product)
})