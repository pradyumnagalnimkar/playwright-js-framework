const { test } = require("@playwright/test")
import readExcel, { writeExcel } from "../utils/excelUtils"

test.only('Download File', async({ page }) => {
    const file_path = "/Users/pradyumna.galnimkar/Downloads/download.xlsx"
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")
    const downloadPromise =  page.waitForEvent('download')
    await page.getByRole("button", {name:"Download"}).click()
    await downloadPromise
    const output = await readExcel(file_path, "Updated text")
    console.log(output)
    writeExcel(file_path, output.row, output.col, "Updated Updated text")
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles("/Users/pradyumna.galnimkar/Downloads/download.xlsx")
})