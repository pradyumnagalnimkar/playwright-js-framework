import { Page } from "@playwright/test"
export class BasePage{
    page: Page
    constructor(page){
        this.page = page
    }

    async load(url: string){
        this.page.goto(url)
    }

}