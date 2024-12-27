const { test } = require("@playwright/test")


test('Invalid creds login page test', async ( {page} ) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator("#username").fill("rahulshettyacademy")
    await page.locator("[name='password']").fill("Test123")
    await page.locator("[type='submit']").click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.")
})

test('Valid creds login page test', async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator(".form-group input[name='username']").fill("rahulshettyacademy")
    await page.locator("#password").fill("learning")
    await page.locator("[type='submit']").click()
    console.log(await page.locator(".card-body a").nth(0).textContent())
    await expect(page.locator(".card-body a").nth(0)).toContainText("iphone X")
})