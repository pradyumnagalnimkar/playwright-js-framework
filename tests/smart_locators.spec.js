const { test, expect } = require("@playwright/test")

test.only('Place order', async ({ page }) => {

    let email = 'ruben.amorim+admin@gmail.com'
    let password = "Test@12345678"

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill(password)
    await page.getByRole("button", {name:"Login"}).click()
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
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body").filter({hasText:product}).getByRole("button", {name:"Add to Cart"}).click()
    await page.locator("#toast-container div div").waitFor()
    await expect(page.locator("#toast-container div div")).toContainText(" Product Added To Cart ")
    
    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click()
    await expect(page.getByText(product)).toBeVisible()
    
    await page.getByRole("button", {name:"Checkout"}).click()

    await page.locator(".row .ddl").first().selectOption({ label: '12' })
    await page.locator(".row .ddl").last().selectOption('31')
    await page.locator(".small input").first().fill('123')
    await page.locator("//*[text()='Name on Card ']/following-sibling::input").fill("Ruben Amorim")
    await page.locator("[name='coupon']").fill("rahulshettyacademy")
    await page.locator("button:has-text('Apply Coupon')").click()
    await expect(page.locator("p:has-text('* Coupon Applied')")).toHaveAttribute("style","color: green;")
    await expect(page.locator(".user__name label")).toContainText(email)

    const shipping_country = " India"
    await page.getByPlaceholder("Select Country").pressSequentially("Ind")
    await page.getByRole("button", {name:shipping_country}).nth(1).click()
    await page.pause()
    await page.getByText("PLACE ORDER").click()
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible()
    
    const order_id = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(`Order placed successfully! Order Id: ${order_id}`)

    await page.getByRole("listitem").getByRole("button", {name:"ORDERS"}).click()
    await page.waitForLoadState('networkidle')
    const orders = page.locator("tbody tr")
    await orders.first().waitFor()
    const number_of_orders = await orders.count()
    for(let i=0;i<number_of_orders;i++){
        if(order_id.includes(await orders.nth(i).locator('th').textContent())){
            await orders.nth(i).locator('text=View').click()
            break
        }
    }
    await expect(page.getByText("Thank you for Shopping With Us")).toBeVisible()
    await expect(page.locator(".email-title")).toContainText(" order summary ")
    const actualOrderId = await page.locator(".-main").textContent()
    expect(order_id.includes(actualOrderId)).toBeTruthy()
    await expect (page.locator(".artwork-card-info .title")).toContainText(product)
})