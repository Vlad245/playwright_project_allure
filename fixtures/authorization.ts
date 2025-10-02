import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';

const BASE_URL = 'https://todo.qacart.com/';

//Register a new user by the API request
export const test = base.extend<{
  user: { access_token: string; firstName: string; userID: string };
}>({
  user: async ({ request, context }, use) => {
    const response = await request.post('/api/v1/users/register', {
      data: {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: 'Password12345!',
      },
    });

    //Check the status of the response
    if (!response.ok()) {
      throw new Error(`Failed to create user: ${response.status()}`);
    }

    //Get a access_token, firstName and user ID from the response body
    const responseBody = await response.json()
    const access_token = responseBody.access_token;
    const firstName = responseBody.firstName;
    const userID = responseBody.userID;

    //Set cookies from the recieved data in responce
    await context.addCookies([
      { name: 'access_token', value: access_token, url: BASE_URL },
      { name: 'firstName', value: firstName, url: BASE_URL },
      { name: 'userID', value: userID, url: BASE_URL },
    ]);

    await use({ access_token, firstName, userID });
  },
});