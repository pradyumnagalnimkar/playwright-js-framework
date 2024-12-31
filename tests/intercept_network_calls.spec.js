const { test, expect } = require("@playwright/test");

test("Route fulfill", async({ page }) => {
    let email = 'ruben.amorim+admin@gmail.com'
    let password = "Test@12345678"


    await page.goto("https://rahulshettyacademy.com/client/")
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill(password)
    await page.getByRole("button", {name:"Login"}).click()
    await expect(page.locator("#toast-container div div")).toContainText("Login Successfully")

    let fake_response = {data:[],message:"No Orders"}
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        const response = await page.request.fetch(route.request())
        const body = JSON.stringify(fake_response)
        route.fulfill({
            response,
            body
        })
        //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    })
    await page.locator("[routerlink*='myorders']").click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    await expect(page.locator(".mt-4")).toContainText(" You have No Orders to show at this time. Please Visit Back Us ")
})

test('Route continue', async({ page }) => {
    let email = 'ruben.amorim+admin@gmail.com'
    let password = "Test@12345678"

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill(password)
    await page.getByRole("button", {name:"Login"}).click()
    await expect(page.locator("#toast-container div div")).toContainText("Login Successfully")

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async route => {
        route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"})
    })
    await page.locator("[routerlink*='myorders']").click()
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
} )

test("Abort api request", async ({ page }) => {
    let email = 'rahulshettyacademy'
    let password = 'learning'

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator("#username").fill(email)
    await page.locator("#password").fill(password)
    await page.getByRole("button", {name:"Sign In"}).click()
    
    await page.route("**/*.css", route => route.abort());
    await page.route("**/*.{jpg, jpeg,png}", route  => route.abort());
    page.on("request", request => console.log(request.url()))
    page.on("response", response => console.log(response.url(), response.status()))

    /** Note: .allTextContents() method does not support auto-wait mechanism */
    await page.locator(".card-body a").first().waitFor()
    await page.locator(".card-body a").last().waitFor()
    const products =  await page.locator(".card-body a").allTextContents()
    console.log(products)
})