import { Locator } from "@playwright/test"
import { CommonPage } from "./common_page"

export class DashboardPage extends CommonPage{
    products_list: Locator
    cart_button: Locator
    
    constructor(page) {
        super(page)
        this.page = page
        this.products_list = this.page.locator(".card-body")
        this.cart_button = this.page.locator("[routerlink*='cart']")
    }

    async searchProductAddToCart(product_name: string) {
        await this.page.waitForLoadState('networkidle')
        const number_of_products = await this.products_list.count()
        for (let i = 0; i < number_of_products; i++) {
            if (await this.products_list.nth(i).locator('b').textContent() === product_name) {
                await this.products_list.nth(i).locator("text= Add To Cart").click()
                break
            }
        }
    }

    async navigateToCart() {
        await this.cart_button.click()
    }
}