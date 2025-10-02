import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import config from '../playwright.config';
import User from "../models/User";
import UserAPI from "../apis/UserAPI";

export default class SignupPage {
    
    private get signupPageUrl() {
        return '/signup';
    }
    
    private get firstNameInput() {
        return 'first-name';
    }
    
    private get lastNameInput() {
        return 'last-name';
    }

    private get emailInput() {
        return 'email';
    }

    private get passwordInput () {
        return 'password';
    }

    private get confirmPasswordInput() {
        return 'confirm-password';
    }

    private get submitButton() {
        return 'submit';
    }
    
    async load(page: Page) {
        await page.goto(this.signupPageUrl);
    }

    async signupUsingUI(page: Page, user: User) {
        await page.getByTestId(this.firstNameInput).fill(user.getFirstName());
        await page.getByTestId(this.lastNameInput).fill(user.getLastName());
        await page.getByTestId(this.emailInput).fill(user.getEmail());
        await page.getByTestId(this.passwordInput).fill(user.getPassword());
        await page.getByTestId(this.confirmPasswordInput).fill(user.getPassword());
        await page.getByTestId(this.submitButton).click();
    }

    async signUpUsingAPI(request: APIRequestContext, user: User, context: BrowserContext){
        // Call the method that registers a new user via API
        const response = await new UserAPI().signUp(request, user);
        
        //Get an access_token, firstName and user ID from the response body
        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const firstName = responseBody.firstName;
        const userID = responseBody.userID;

        //Set access_token to user
        user.setAccessToken(access_token);
        
        //Set cookies from the recieved data in responce
        await context.addCookies([
            { name: 'access_token', value: access_token, url: config.use?.baseURL},
            { name: 'firstName', value: firstName, url: config.use?.baseURL},
            { name: 'userID', value: userID, url: config.use?.baseURL},
        ]);
    }
}