const { test, request, expect } = require("@playwright/test")
import APIUtils from "../utils/api/api_utils";

const login_payload = {
    userEmail: "ruben.amorim+admin@gmail.com",
    userPassword: "Test@12345678"
}

const order_paylaod = {
    orders:[{country:"Cuba",productOrderedId:"6581ca979fd99c85e8ee7faf"}]
}

let token;
let order_id;

test.beforeAll("Integrating API Preconditions", async() => {
    const api_context = await request.newContext();
    let api_utils = new APIUtils(api_context, login_payload);
    token  = await api_utils.loginToAppAPI("https://rahulshettyacademy.com/api/ecom/auth/login");

    /**
     * Placr Order API
     */
    order_id = await api_utils.placeOrderAPI("https://rahulshettyacademy.com/api/ecom/order/create-order", order_paylaod, token)
})

test("@API Place order", async({ page }) => {

    /**
     * Set token
     */
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)

    /**
     * Validate placed order through API on UI using order_id
     */
    await page.goto("https://rahulshettyacademy.com/client")
    await page.getByRole("listitem").getByRole("button", {name:"ORDERS"}).click()
    await page.waitForLoadState('networkidle')

    const orders = page.locator("tbody tr")
    await orders.first().waitFor()
    const number_of_orders = await orders.count()
    for(let i=0;i<number_of_orders;i++){
        if(order_id.includes(await orders.nth(i).locator('th').textContent())){
            await orders.nth(i).locator('text=View').click()
            break
        }
    }
    await expect(page.getByText("Thank you for Shopping With Us")).toBeVisible()
    await expect(page.locator(".email-title")).toContainText(" order summary ")
    const actualOrderId = await page.locator(".-main").textContent()
    expect(order_id.includes(actualOrderId)).toBeTruthy()
})