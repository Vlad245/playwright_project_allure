import { expect, Page } from "@playwright/test";

export default class TodoPage {

    private get todoPageURL() {
        return '/todo'
    }

    private get todoItem() {
        return 'todo-item';
    }

    private get welcomeMassage() {
        return 'data-testid=welcome';
    }

    private get deleteButton(){
        return 'delete';
    }

    private get noTodosMassage() {
        return 'data-testid=no-todos';
    }

    getWelcomeMassageElement(page: Page) {
        return page.locator(this.welcomeMassage);
    }
    
    async load(page: Page) {
        await page.goto(this.todoPageURL);
    }

    async deleteTodo(page: Page){
        await page.getByTestId(this.deleteButton).click();
    }

    async getNoTodosMassage(page: Page){
        return page.locator(this.noTodosMassage);
    }

    async getTodoItem(page: Page) {
        return page.getByTestId(this.todoItem);
    }
}