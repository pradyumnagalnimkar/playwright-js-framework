import { Page } from "@playwright/test"
import { LoginPage } from "./login_page"
import { DashboardPage } from "./dashboard_page"
import { CheckoutPage } from "./checkout_page"
import { OrderDetailsPage } from "./order_details_page"
import { OrderListPage } from "./order_list_page"

export class PageFactory{
    page: Page
    constructor(page: Page){
        this.page = page
    }

    getLoginPage(){
        return new LoginPage(this.page)
    }

    getDashboardPage(){
        return new DashboardPage(this.page)
    }

    getCheckoutPage(){
        return new CheckoutPage(this.page)
    }

    getOrderDetailsPage(){
        return new OrderDetailsPage(this.page)
    }

    getOrderListPage(){
        return new OrderListPage(this.page)
    }
}