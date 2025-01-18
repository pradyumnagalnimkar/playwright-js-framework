import { test, expect } from "@playwright/test"
import { PageFactory } from "../pages/page_factory"
import { customTest } from "../utils/test_data/globalTestData"

customTest('', async({ page, testDataForOrder}) =>{
    console.log(testDataForOrder)
    let page_factory = new PageFactory(page);
    let login_page = page_factory.getLoginPage();
    await login_page.loginToApp(testDataForOrder.username, testDataForOrder.password)
    await expect(login_page.notification_banner).toContainText("Login Successfully")
    await login_page.notification_banner.waitFor({state: "detached"})
    let dashboard_page = page_factory.getDashboardPage();
    await dashboard_page.searchProductAddToCart(testDataForOrder.productName);
    await expect(dashboard_page.notification_banner).toContainText(" Product Added To Cart ")
    await dashboard_page.navigateToCart()
})