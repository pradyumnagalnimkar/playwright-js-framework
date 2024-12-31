const { test, request, expect } = require("@playwright/test");
const path = require("path");

let email = 'ruben.amorim+admin@gmail.com'
let password = "Test@12345678"
let webcontext;

test.beforeAll('Login app precondition', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill(password)
    await page.locator("[value='Login']").click()
    console.log(await page.locator("#toast-container div div").textContent())
    await expect(page.locator("#toast-container div div")).toContainText("Login Successfully")
    await context.storageState({path:"state.json"})
    webcontext = await browser.newContext({storageState: "state.json"})
})


test('Client service calls test', async() => {
    let page = await webcontext.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.waitForLoadState('networkidle')
    const products =  await page.locator(".card-body b").allTextContents()
    console.log(products)
})


test('Place order', async() => {
    /**
     * 1. Search placed order orderId in orders page table
     * 2. Once identified click on view details button
     * 3. Check product name, product price, order summary, order id, billing address and shipping address
     */

    let page = await webcontext.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")
    const orderId = '677294c2e2b5443b1f09e4bc'
    const product = ' ADIDAS ORIGINAL '
    await page.locator("[routerlink*='myorders']").click()
    await page.waitForLoadState('networkidle')

    const orders = page.locator("tbody tr")
    const number_of_orders = await orders.count()
    for(let i=0;i<number_of_orders;i++){
        if(await orders.nth(i).locator('th').textContent() === orderId){
            await orders.nth(i).locator('text=View').click()
            break
        }
    }

    await expect(page.locator(".tagline")).toContainText('Thank you for Shopping With Us')
    await expect(page.locator(".email-title")).toContainText(" order summary ")
    await expect(page.locator(".-main")).toContainText(orderId)
    await expect (page.locator(".artwork-card-info .title")).toContainText(product)
})