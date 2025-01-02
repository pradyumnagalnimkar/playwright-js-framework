const { CommonPage } = require("./common_page");

class OrderListPage extends CommonPage{
    constructor(page){
        super(page)
        this.page = page
        this.orders_button = this.page.getByRole("listitem").getByRole("button", {name:"ORDERS"})
        this.orders = this.page.locator("tbody tr")
    }
    
    async viewOrdeDetails(order_id){
        this.orders_button.click()
        await this.orders.first().waitFor()
        const number_of_orders = await this.orders.count()
        for(let i=0;i<number_of_orders;i++){
            if(order_id.includes(await this.orders.nth(i).locator('th').textContent())){
                await this.orders.nth(i).locator('text=View').click()
                break
            }
        }
    }
}
module.exports = { OrderListPage }