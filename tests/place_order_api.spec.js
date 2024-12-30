const { test, request, expect } = require("@playwright/test")

const login_payload = {
    userEmail: "ruben.amorim+admin@gmail.com",
    userPassword: "Test@12345678"
    }
let token;

test.beforeAll('Login to app via API before all', async() => {
    const api_context = await request.newContext()
    const login_response = await api_context.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: login_payload})
    expect(login_response.ok()).toBeTruthy()
    const login_response_json = await login_response.json();
    token = login_response_json.token
    console.log(token)
})

test.only('Login to app via API', async({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto("https://rahulshettyacademy.com/client")
})