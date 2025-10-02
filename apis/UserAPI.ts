import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class UserAPI {

    //Method that registers a new user
    async signUp(request: APIRequestContext, user: User) {
        const response = await request.post('/api/v1/users/register', {
        data: {
            email: user.getEmail(),
            password: user.getPassword(),
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
        }
    })
    //Check the status of the response
        if (!response.ok()) {
            throw new Error(`Failed to create user: ${response.status()}, ${response.statusText()}`);
        }
        else return response; //Send response if its 200
    }
}