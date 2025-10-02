import { test, expect } from '@playwright/test'
import User from '../models/User';
import TodoPage from '../pages/TodoPage';
import SignupPage from '../pages/SignupPage';
import NewTodoPage from '../pages/NewTodoPage';
//import { test } from '../fixtures/authorization'; //Import the file with user sign up via API and cookies

test('Should be able to create a new todo', async ({ page, request, context }) => {

    //Create a new user object with data from the constructor
    const user = new User();

    //Create a new signup page and call the method that register via API
    const signupPage = new SignupPage();
    await signupPage.signUpUsingAPI(request, user, context);

    //Create a new todo page object and load the new todo page
    const newTodoPage = new NewTodoPage();
    await newTodoPage.load(page);

    const taskName = 'Learning Playwright!!!';

    //Create a new todo item with name
    await newTodoPage.addTodo(page, taskName)

    //Create a todo page object
    const todoPage = new TodoPage();

    //Comparing the created todo with displayed
    const todoItem = await todoPage.getTodoItem(page);
    expect(await todoItem.innerText()).toEqual(taskName);
})

test('Should be able to delete a todo', async ({ page, request, context }) => {

    //Create a new user object with data from the constructor
    const user = new User();

    //Create a new signup page and call the method that register via API
    const signupPage = new SignupPage();
    await signupPage.signUpUsingAPI(request, user, context);

    //Create a new todo using API
    const newDodoPage = new NewTodoPage();
    await newDodoPage.addTodoUsingAPI(request, user);

    //Directly go to the todo page by API
    const todoPage = new TodoPage();
    await todoPage.load(page);
    
    //Todo deletion
    await todoPage.deleteTodo(page);

    //Check that the massage about no todos is presented
    const noTodosMassage = await todoPage.getNoTodosMassage(page);
    expect(await noTodosMassage.innerText()).toEqual('No Available Todos');     
})
