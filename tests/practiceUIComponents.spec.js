const { test, expect } = require("@playwright/test")

let page;

test.beforeAll('Navigate to page', async function({ browser }){
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
})

test('Scenario: Test radio button', async function(){
    const radio_option = "radio2";
    await page.locator("#radio-btn-example").waitFor();
    await page.locator(`input[value='${radio_option}']`).check();
    await expect(page.locator(`input[value='${radio_option}']`)).toBeChecked();
})

test('Scenario: Test suggestion class example', async function () {
    const country = 'Brazil'
    await page.getByPlaceholder('Type to Select Countries').pressSequentially(country);
    await page.locator(`.ui-menu-item-wrapper`).waitFor()
    await expect(page.locator(`.ui-menu-item-wrapper`)).toContainText(country);
    await page.locator(`.ui-menu-item-wrapper`).click()
    await page.pause()
})

test.afterAll('', async function(){
    await page.close()
})