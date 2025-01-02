class CommonPage{
    constructor(page){
        this.page = page
        this.notification_banner = this.page.locator("#toast-container div div")
    }
}
module.exports = { CommonPage }