const { test, expect } = require("@playwright/test")

test('Register user', async({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    
    let email = 'ruben.amorim+admin@gmail.com'
    let password = "Test@12345678"
    
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator(".text-reset").click()
    await page.locator("[placeholder='First Name']").fill("Ruben")
    await page.locator("[formcontrolname='lastName']").fill("Amorim")
    await page.locator("#userEmail").fill(email)
    await page.locator(".form-group input[type='text']").fill("9999999999")
    await page.locator("[formcontrolname='occupation']").selectOption({label: "Engineer"})
    await page.locator("[value='Male']").click()
    await page.locator("#userPassword").fill(password)
    await page.locator("#confirmPassword").fill(password)
    await page.locator("[type='checkbox']").click()
    await page.locator("[value='Register']").click()
    console.log(await page.locator("#toast-container div div").textContent())
    await expect(page.locator("#toast-container div div")).toContainText(" Registered Successfully ")
    await expect(page.locator("h1.headcolor")).toContainText("Account Created Successfully")
})

test('Login registered user', async({page}) => {
    
    let email = 'ruben.amorim+admin@gmail.com'
    let password = "Test@12345678"

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill(password)
    await page.locator("[value='Login']").click()
    console.log(await page.locator("#toast-container div div").textContent())
    await expect(page.locator("#toast-container div div")).toContainText("Login Successfully")
})