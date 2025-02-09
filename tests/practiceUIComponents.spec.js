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
})

test('Scenario: Select dropdown Example', async function(){
    const option = "Option2"
    await page.locator("#dropdown-class-example").waitFor();
    await page.selectOption("#dropdown-class-example", {label:option});
})

test('Scenario: Checkbox example', async function(){
    const option = ['option1', 'option3'];
    await page.locator("#checkbox-example").waitFor();
    await page.locator(`input[value=${option[0]}]`).check();
    await page.locator(`input[value=${option[1]}]`).check();
    await expect(page.locator('label[for="benz"] input')).not.toBeChecked();
    await expect(page.locator('label[for="bmw"] input')).toBeChecked();
    await expect(page.locator('label[for="honda"] input')).toBeChecked();
})

test.afterAll('', async function(){
    await page.close()
})