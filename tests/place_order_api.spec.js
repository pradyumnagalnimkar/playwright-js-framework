const { test, request, expect } = require("@playwright/test")

const login_payload = {
    userEmail: "ruben.amorim+admin@gmail.com",
    userPassword: "Test@12345678"
    }
let token;
const order_payload = {orders:[{country:"Cuba",productOrderedId:"6581ca979fd99c85e8ee7faf"}]}
let order_id ;
exports.order_id = order_id;

test.beforeAll('Login to app via API before all', async() => {
    const api_context = await request.newContext()
    const login_response = await api_context.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: login_payload})
    expect(login_response.ok()).toBeTruthy()
    const login_response_json = await login_response.json();
    token = login_response_json.token

    const order_reponse = await api_context.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: order_payload,
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
    })
    const order_response_json = await order_reponse.json()
    order_id = order_response_json.orders[0]
})

test('@API Login to app via API', async({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)

    /**
     * Place order API
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