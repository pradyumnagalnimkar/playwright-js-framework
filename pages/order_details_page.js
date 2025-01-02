const { CommonPage } = require("./common_page");

class OrderDetailsPage extends CommonPage{
    constructor(page){
        super(page)
        this.order_confirmation = this.page.locator(".hero-primary")
        this.order_id_label = this.page.locator(".em-spacer-1 .ng-star-inserted")
        this.order_summary_text = this.page.locator(".email-title")
        this.order_product_name = this.page.locator(".artwork-card-info .title")
        this.order_id_confirmation_label = this.page.locator(".-main")
    }
}

module.exports = { OrderDetailsPage }