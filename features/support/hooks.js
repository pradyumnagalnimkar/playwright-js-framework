const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const  playwright  = require("@playwright/test")
const { PageFactory } = require("../../pages/page_factory");
const path = require("path");


Before(async function () {
    const browser = await playwright.chromium.launch({headless: false})
    const context = await browser.newContext()
    this.page = await context.newPage();
    this.page_factory = new PageFactory(this.page);
})


BeforeStep(async function () {
    console.log('I am before step code to execute.')
})

AfterStep(async function ({ result }) {
    if(result.status === Status.FAILED){
        await this.page.screenshot({ path: "failedStep.png"})
    }
})


After(async function () {
    console.log(`I am after test code to execute.`)
})