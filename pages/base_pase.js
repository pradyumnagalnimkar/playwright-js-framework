class BasePage{
    
    constructor(page){
        this.page = page
    }

    async load(){
        this.page.goto()
    }

}

module.exports = {BasePage}