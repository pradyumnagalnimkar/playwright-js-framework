const base = require("@playwright/test")

exports.customTest = base.test.extend({
    testDataForOrder: {
        username: "ruben.amorim+admin@gmail.com",
        password: "Test@12345678",
        productName: "qwerty"
    }
})