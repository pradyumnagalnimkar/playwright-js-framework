import { test as baseTest } from "@playwright/test"

interface TestDataForOrder {
    username: string
    password: string
    productName: string
}

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>({
    testDataForOrder: {
        username: "ruben.amorim+admin@gmail.com",
        password: "Test@12345678",
        productName: "qwerty"
    }
})