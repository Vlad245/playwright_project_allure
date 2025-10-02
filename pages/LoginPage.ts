import { Page } from "@playwright/test";
import User from "../models/User";

export default class LoginPage {

    private get loginPageURL() {
        return '/login';
    }

    private get emailInput() {
        return 'email';
    } 

    private get passwordInput() {
        return 'password';
    }

    private get submitButton() {
        return 'submit';
    }

    async load(page: Page) {
        await page.goto(this.loginPageURL);
    }

    async login(page: Page, user: User) {
        await page.getByTestId(this.emailInput).fill(user.getEmail());
        await page.getByTestId(this.passwordInput).fill(user.getPassword());
        await page.getByTestId(this.submitButton).click();
    }

}