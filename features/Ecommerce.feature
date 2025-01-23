Feature: Ecommerce Validations
    Scenario: Place Order
        Given Login to application with "ruben.amorim+admin@gmail.com" and "Test@12345678"
        When Add "qwerty" to cart
        Then Verify "qwerty" is displayed in cart
        When Enter valid details and place Order
        Then Verify order is present in Orderhistory