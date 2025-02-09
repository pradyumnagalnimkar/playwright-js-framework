const { test, expect } = require("@playwright/test");
const { name } = require("../playwright.config");
const exp = require("constants");

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

test('Scenario: Switch window example', async function(){
    await page.getByRole('button', {name: 'Open Window'}).waitFor();
    const [newWindow] = await Promise.all([page.waitForEvent('popup'), page.getByRole('button', {name: 'Open Window'}).click()]);
    await expect(newWindow.locator(".main-btn").nth(0)).toContainText('Access all our Courses');
})

test('Scenario: Switch multiple tabs', async function(){
    await page.locator("#opentab").waitFor();
    const [newPage] = await Promise.all([page.waitForEvent('popup'), page.locator("#opentab").click()]);
    await expect(newPage.locator(".main-btn").nth(0)).toContainText('Access all our Courses');
    const [newWindow] = await Promise.all([page.waitForEvent('popup'), page.getByRole('button', {name: 'Open Window'}).click()]);
    await expect(newWindow.locator(".main-btn").nth(0)).toContainText('Access all our Courses');
    await expect(page.locator(".switch-tab")).toContainText('Switch Tab Example');
})

test('Scenario: Switch to alert example', async function(){
    const name = 'Pradyumna'
    let actualMessage = `Hello ${name}, share this practice page and share your knowledge`
    let dialogMessage;
    await page.locator("#name").fill(name);
    page.on('dialog', function(dialog){
        dialogMessage = dialog.message();
        dialog.accept();
    });
    await page.pause();
    await page.locator("#alertbtn").click();
    expect(dialogMessage).toBe(actualMessage);
})

test('Scenario: Switch to confirm alert example', async function(){
    const name = 'Pradyumna Galnimkar'
    let actualMessage = `Hello ${name}, Are you sure you want to confirm?`
    let dialogMessage;
    await page.locator("#name").fill(name);
    page.on('dialog', function(dialog){
        dialogMessage = dialog.message();
        dialog.accept();
    });
    await page.locator("#confirmbtn").click();
    expect(dialogMessage).toBe(actualMessage);
})



test.afterAll('', async function(){
    await page.close()
})