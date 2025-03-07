const { test, expect } = require("@playwright/test")

test.describe.configure({mode: 'parallel'})
// test.describe.configure({mode: 'serial'})
test("Verify hidden elements", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#hide-textbox").click()
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden()
    await page.locator("#show-textbox").click()
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible()
})

test("Handle alert popups", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.getByPlaceholder("Enter Your Name").fill("Alert handles")
    page.on('dialog', dialog => {
        console.log(dialog.message())
        dialog.dismiss()
    })
    await page.locator("#confirmbtn").click()
})

test('handle multiple windows', async({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const [newPage] = await Promise.all([context.waitForEvent('page'), page.locator("#opentab").click()])
    await expect(newPage.getByText("Access all our Courses")).toBeVisible()
    
})

test("handle frames", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framePage = page.frameLocator("#courses-iframe")
    await framePage.locator("li a[href*='lifetime-access']:visible").click()
    console.log(await expect(framePage.locator(".text h2")).toContainText("13,522"))
})