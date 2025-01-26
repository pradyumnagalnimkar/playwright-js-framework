Feature: Error Validation Ecommerce Application
    @Validation
    Scenario Outline: Login Validations
        Given Login to practise application with "<username>" and "password"
        Then Verify Login with invalid credentials

        Examples:
            | username | password |
            | ruben.amorim+admin@gmail.com  | Test@12345678  |
            | rahulshettyacademy            | learning       |