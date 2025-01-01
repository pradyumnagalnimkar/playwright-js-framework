class LoginPage{
    
    constructor(page){
        this.page = page
        this.email_textbox = this.page.getByPlaceholder("email@example.com")
        this.password_tetxbox = this.page.getByPlaceholder("enter your passsword")
        this.login_button = this.page.getByRole("button", {name:"Login"})
        this.notification_banner = this.page.locator("#toast-container div div")
    }

    async loginToApp(username, password){
        await this.page.goto("https://rahulshettyacademy.com/client/")
        await this.email_textbox.fill(username)
        await this.password_tetxbox.fill(password)
        await this.login_button.click()
    }
}

module.exports = { LoginPage }