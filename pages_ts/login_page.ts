import { CommonPage } from "./common_page"
import { Locator } from "@playwright/test"
export class LoginPage extends CommonPage{
    
    email_textbox: Locator
    password_tetxbox: Locator
    login_button: Locator

    constructor(page){
        super(page)
        this.page = page
        this.email_textbox = this.page.getByPlaceholder("email@example.com")
        this.password_tetxbox = this.page.getByPlaceholder("enter your passsword")
        this.login_button = this.page.getByRole("button", {name:"Login"})
    }

    async loginToApp(username, password){
        await this.page.goto("https://rahulshettyacademy.com/client/")
        await this.email_textbox.fill(username)
        await this.password_tetxbox.fill(password)
        await this.login_button.click()
    }
}