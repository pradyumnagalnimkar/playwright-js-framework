const { test,expect } = require('@playwright/test')

test('Handling multiple tabs example', async function({ browser }) {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    const new_tab_element = page.locator('#opentab')
    await new_tab_element.waitFor()
    const pagePromise = context.waitForEvent('page')
    await new_tab_element.click()
    const newPage = await pagePromise;
    await expect(newPage.getByText('Access all our Courses')).toBeVisible()
})