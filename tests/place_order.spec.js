const { test, expect } = require("@playwright/test")
const { styleText } = require("util")


test.only('Place order', async ({ page }) => {

    let email = 'ruben.amorim+admin@gmail.com'
    let password = "Test@12345678"

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill(password)
    await page.locator("[value='Login']").click()
    await expect(page.locator("#toast-container div div")).toContainText("Login Successfully")

    /**
     * 1. Scan products & add product "qwerty" to cart.
     * 2. Goto cart page & validate product added to cart successfully.
     * 3. Goto checkout page & fill necessary details.
     * 4. Verify email address above shipping email is same.
     * 5. Place order
     * 6. Verify thankyou message displayed on screen.
     * 7. Fetch OrderID & print in output
     */

    const product = "QWERTY".toLowerCase()
    const products = page.locator(".card-body")
    await page.waitForLoadState('networkidle')
    const number_of_products = await products.count()
    for(let i=0;i<number_of_products;i++){
        if(await products.nth(i).locator('b').textContent() === product){
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }
    await page.locator("#toast-container div div").waitFor()
    await expect(page.locator("#toast-container div div")).toContainText(" Product Added To Cart ")
    
    await page.locator("[routerlink*='cart']").click()
    await page.locator(".cart li").waitFor({state:"visible"})
    const is_product_added_to_cart = await page.locator(`h3:has-text("${product}")`).isVisible()
    expect(is_product_added_to_cart).toBeTruthy()
    
    await page.locator("button:has-text('Checkout')").click()
    await page.locator(".row .ddl").first().selectOption({ label: '12' })
    await page.locator(".row .ddl").last().selectOption('31')
    await page.locator(".small input").first().fill('123')
    await page.locator("//*[text()='Name on Card ']/following-sibling::input").fill("Ruben Amorim")
    await page.locator("[name='coupon']").fill("rahulshettyacademy")
    await page.locator("button:has-text('Apply Coupon')").click()
    await expect(page.locator("p:has-text('* Coupon Applied')")).toHaveAttribute("style","color: green;")
    
    await expect(page.locator(".user__name label")).toContainText(email)

    const shipping_country = " India"
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind")
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    const dropdownOptions = await dropdown.locator("button").count()
    for(let i=0; i<dropdownOptions; i++){
        if(await dropdown.locator("button").nth(i).textContent() === shipping_country){
            await dropdown.locator("button").nth(i).click()
            break
        }
    }

    await page.locator(".action__submit").click()

    await expect(page.locator(".hero-primary")).toContainText(" Thankyou for the order. ")
    const order_id = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(`Order placed successfully! Order Id: ${order_id}`)
})
