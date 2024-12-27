const { test, expect } = require("@playwright/test")

test('Browser fixture test', async ({ browser }) => {
    /**
     * 1. Create new browser context or new browser instance using browser fixture
     * 2. Create new page for above created browser context
     */ 
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
})

test('Page fixture test', async ({ page }) => {
    /**
     * 1. Use Page fixture directly for opening new browser instance
     * Note: Since no configOptions are specified we do not need to create browser context
     */
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
})