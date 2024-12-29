const { test, expect } = require("@playwright/test")

test("Verify hidden elements", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#hide-textbox").click()
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden()
    await page.locator("#show-textbox").click()
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible()
})

test.only("Handle alert popups", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.getByPlaceholder("Enter Your Name").fill("Alert handles")
    page.on('dialog', dialog => {
        console.log(dialog.message())
        dialog.dismiss()
    })
    await page.locator("#confirmbtn").click()
})