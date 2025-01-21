const { CommonPage } = require("./common_page");

export class CheckoutPage extends CommonPage{
    constructor(page){
        super(page)
        this.page = page
        this.checkout_button = this.page.locator("button:has-text('Checkout')")
        this.expiry_date_row = this.page.locator(".row .ddl")
        this.cvv_textbox = this.page.locator(".small input")
        this.card_holder_textbox = this.page.locator("//*[text()='Name on Card ']/following-sibling::input")
        this.coupon_textbox = this.page.locator("[name='coupon']")
        this.apply_coupon_button = this.page.locator("button:has-text('Apply Coupon')")
        this.applied_coupon_label = this.page.locator("p:has-text('* Coupon Applied')")
        this.shipping_address_label = this.page.locator(".user__name label")
        this.country_dropdown = this.page.locator("[placeholder='Select Country']")
        this.country_dropdwn_results = this.page.locator(".ta-results")
        this.place_order_button = this.page.locator(".action__submit")
    }

    async checkoutOrder(expiryMonth, expiryDay, cvv_code, email, coupon_code){
        await this.checkout_button.click()
        await this.expiry_date_row.first().selectOption({label: expiryMonth})
        await this.expiry_date_row.last().selectOption(expiryDay)
        await this.cvv_textbox.first().fill(cvv_code)
        await this.card_holder_textbox.fill(email)
        await this.coupon_textbox.fill(coupon_code)
        await this.apply_coupon_button.click()
    }

    async selectCountry(country){
        await this.country_dropdown.pressSequentially(country)
        await this.country_dropdwn_results.waitFor()
        const dropdownOptions = await this.country_dropdwn_results.locator("button").count()
        for(let i=0; i<dropdownOptions; i++){
            if(await this.country_dropdwn_results.locator("button").nth(i).textContent() === " "+country){
                await this.country_dropdwn_results.locator("button").nth(i).click()
                break
            }
        }
    }

    async placeOrder(){
        await this.place_order_button.click()
    }
}