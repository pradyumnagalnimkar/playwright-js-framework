const { LoginPage } = require("./login_page")
const { DashboardPage } = require("./dashboard_page")
const { CheckoutPage } = require("./checkout_page")
const { OrderDetailsPage } = require("./order_details_page")
const { OrderListPage } = require("./order_list_page")

class PageFactory{
    constructor(page){
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
module.exports = { PageFactory }