import { faker } from "@faker-js/faker";
import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class TodoAPI {

    //Create a new todo with API request
    async addNewTodo (request: APIRequestContext, user: User) {
        return await request.post('/api/v1/tasks', {
        data: {
            isCompleted: false,
            item: faker.lorem.sentence()
        },
        headers: {
            Authorization: `Bearer ${user.getAccessToken()}`,
        }
    })

    // //Check the status of the response
    //     if(!response.ok) {
    //         throw Error(`Error durung the adding new todo: ${response.status()}, ${response.statusText()}`)
    //     }
    //     else return response
    }
}