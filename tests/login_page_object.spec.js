const { test, expect } = require("@playwright/test")
import { LoginPage } from "../pages/login_page"

test("Login to app", async({  page }) => {
    let username = "ruben.amorim+admin@gmail.com"
    let passsword = "Test@12345678"

    let login_page = new LoginPage(page)    
    await login_page.loginToApp(username, passsword)
    await expect(login_page.notification_banner).toContainText("Login Successfully")
})