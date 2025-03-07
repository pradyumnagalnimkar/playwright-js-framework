import { expect } from "@playwright/test"

export class APIUtils{
    api_context: any
    login_payload: Object
    constructor(api_context: any, login_payload: Object){
        this.api_context = api_context
        this.login_payload = login_payload
    }

    async loginToAppAPI(url: string){
        const login_response = await this.api_context.post(url, {data: this.login_payload})
        expect(login_response.ok()).toBeTruthy()
        console.log("Logged In Successfully!!")
        const login_response_json = await login_response.json()
        return login_response_json.token;
    }

    async placeOrderAPI(url: string, order_payload: any, token: any){
        const order_response = await this.api_context.post(url, {data: order_payload, headers: {"authorization": token, "Content-Type": "application/json"}})
        expect(order_response.ok()).toBeTruthy();
        console.log(`Order placed successfully.`)
        const order_response_json = await order_response.json()
        return order_response_json.orders[0]
    }
}