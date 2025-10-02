import { test, expect } from '@playwright/test'
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import UserAPI from '../apis/UserAPI';
import TodoPage from '../pages/TodoPage';

test('Should be able to register to our application',  async ({page}) => {
    
    //Create a new user object with a data from the constructor
    const user = new User();

    //Create a SignUp page object
    const signupPage = new SignupPage();

    //Open the signup page using the load method from the SignupPage file
    await signupPage.load(page)

    //Register a new user using an appropriate method from the SignupPage file
    await signupPage.signupUsingUI(page, user)

    //Create a Todo page obgect
    const todoPage = new TodoPage();

    //Check if user is registered and the welcome massage is presented after logining
    await expect(todoPage.getWelcomeMassageElement(page)).toBeVisible();
})

test('Should be able to log in', async ({ page, request }) => {

    //Create a new user object with a data from the constructor
    const user = new User();

    // Call the method that registers a new user via API
    await new UserAPI().signUp(request, user);

    //Create a Login page object
    const loginPage = new LoginPage();

    //Open the login page using the load method from the LoginPage file
    await loginPage.load(page);

    //Login user using an appropriate method from the SignUp file
    await loginPage.login(page, user)

    //Create a Todo page obgect
    const todoPage = new TodoPage();

    //Check if user is registered and the welcome massage is presented after logining
    await expect(todoPage.getWelcomeMassageElement(page)).toBeVisible();
})
