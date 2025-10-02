import { APIRequestContext, Page } from "@playwright/test";
import TodoAPI from "../apis/TodoAPI";
import User from "../models/User";

export default class NewTodoPage {

    private get newTodoPageUrl() {
        return '/todo/new';
    }

    private get newTodoInput() {
        return 'new-todo';
    }

    private get newTodoSubmitButton(){
        return 'submit-newTask';
    }

    async load(page: Page) {
        await page.goto(this.newTodoPageUrl);
    }

    async addTodo(page: Page, task: string) {
        await page.getByTestId(this.newTodoInput).fill(task);
        await page.getByTestId(this.newTodoSubmitButton).click();
    }

    async addTodoUsingAPI(request: APIRequestContext, user: User) {
        await new TodoAPI().addNewTodo(request, user);
    }
}