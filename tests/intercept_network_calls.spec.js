const { test, expect } = require("@playwright/test");

test("Route fulfill", async({ page }) => {
    let email = 'ruben.amorim+admin@gmail.com'
    let password = "Test@12345678"


    await page.goto("https://rahulshettyacademy.com/client/")
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill(password)
    await page.getByRole("button", {name:"Login"}).click()
    await expect(page.locator("#toast-container div div")).toContainText("Login Successfully")

    let body = {data:[],message:"No Orders"}

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        const response = await page.request.route(route.fetch())
        await route.fulfill({
            response,
            body
        })
    })

    await page.locator("[routerlink*='myorders']").click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    await expect(page.locator(".mt-4")).toContainText(" You have No Orders to show at this time. Please Visit Back Us ")
    await page.pause()
})