import { Page, Locator } from "@playwright/test"
export class CommonPage{
    page: Page
    notification_banner: Locator

    constructor(page: Page){
        this.page = page
        this.notification_banner = this.page.locator("#toast-container div div")
    }
}