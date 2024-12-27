const { test } = require("@playwright/test")


test('Extract content from multiple elements', async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator(".form-group input[name='username']").fill("rahulshettyacademy")
    await page.locator("#password").fill("learning")
    await page.locator("[type='submit']").click()
    
    /** Note: .allTextContents() method does not support auto-wait mechanism */
    await page.locator(".card-body a").first().waitFor()
    await page.locator(".card-body a").last().waitFor()
    const products =  await page.locator(".card-body a").allTextContents()
    console.log(products)
})

test('Client service calls test', async({page}) => {
    
    let email = 'ruben.amorim+admin@gmail.com'
    let password = "Test@12345678"
    
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill(password)
    await page.locator("[value='Login']").click()
    await page.waitForLoadState('networkidle')
    const products =  await page.locator(".card-body b").allTextContents()
    console.log(products)
})