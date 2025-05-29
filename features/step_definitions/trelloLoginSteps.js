// trelloLoginSteps.js
require('dotenv').config();
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const i18n = require('../../i18n');
const fs = require('fs');

Given('I am on the Trello login page', async function () {
  await this.trelloLoginPage.goto();
  console.log('Navigated to Trello login page.');
});

When('I enter my email', async function () {
  await this.trelloLoginPage.enterEmail(process.env.TRELLO_EMAIL);
});

When('I click the continue button', async function () {
  await this.trelloLoginPage.clickContinue();
  console.log(i18n.__('clicked_continue'));
});

When('I enter my password', async function () {
  await this.trelloLoginPage.enterPassword(process.env.TRELLO_PASSWORD);
});

When('I enter wrong password', async function () {
  await this.trelloLoginPage.enterPassword(process.env.TRELLO_WRONG_PASSWORD);
  console.log('Entered wrong password.');
});

When('I click the login button', async function () {
  await this.trelloLoginPage.clickLogin();
  console.log('Clicked the Log in button.');
});

Then('I should be redirected to the Trello home page', async function () {
  try {
    await this.page.waitForURL('**/boards', { timeout: 30000 });
    const currentUrl = await this.trelloLoginPage.getCurrentUrl();
    console.log(`Current URL after login: ${currentUrl}`);
    assert.ok(currentUrl.includes('boards'), 'Expected URL to contain "boards"');
    const cookies = await this.trelloLoginPage.getCookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
    console.log('Cookies saved to cookies.json');
  } catch (error) {
    const currentUrl = await this.trelloLoginPage.getCurrentUrl();
    console.log(`Current URL after login: ${currentUrl}`);
    throw error;
  }
});

Then('I should see a Trello login failure message', async function () {
  try {
    const errorMessage = await this.trelloLoginPage.getErrorMessage();
    console.log(i18n.__('error_message', { message: errorMessage }));
    assert.ok(errorMessage.length > 0, 'Expected a login failure message, but none was found');
    assert.ok(
      errorMessage.toLowerCase().includes('incorrect') || errorMessage.toLowerCase().includes('invalid'),
      'Expected error message to indicate incorrect or invalid credentials'
    );
  } catch (error) {
    const currentUrl = await this.trelloLoginPage.getCurrentUrl();
    console.log(`Current URL after failed login: ${currentUrl}`);
    throw error;
  }
});

Given('I use saved cookies to log in', async function () {
  try {
    const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
    await this.trelloLoginPage.setCookies(cookies);
    await this.page.goto('https://trello.com/boards');
    console.log('Logged in using saved cookies.');
  } catch (error) {
    console.error('Error using saved cookies:', error.message);
    throw error;
  }
});

// Thêm các bước cho @cookieTest
When('I set a cookie with name {string} and value {string}', async function (name, value) {
  await this.trelloLoginPage.setCookie(name, value);
  console.log(`Set cookie ${name} with value ${value}.`);
});

When('I delete the cookie with name {string}', async function (name) {
  await this.trelloLoginPage.deleteCookie(name);
  console.log(`Deleted cookie ${name}.`);
});

Then('I should see the cookie with name {string} and value {string}', async function (name, expectedValue) {
  const cookies = await this.trelloLoginPage.getCookies();
  const cookie = cookies.find(c => c.name === name);
  assert.ok(cookie, `Cookie with name ${name} not found.`);
  assert.strictEqual(cookie.value, expectedValue, `Expected cookie ${name} to have value ${expectedValue}, but got ${cookie.value}`);
});

Then('I should see the cookie with name {string} and value {string} should fail', async function (name, expectedValue) {
  const cookies = await this.trelloLoginPage.getCookies();
  const cookie = cookies.find(c => c.name === name);
  assert.ok(!cookie, `Cookie with name ${name} was found, but it should have been deleted.`);
});
// trelloLoginSteps.js (thêm vào cuối file)
When('I use an expired session cookie', async function () {
  const cookies = await this.trelloLoginPage.getCookies();
  const sessionCookie = cookies.find(c => c.name === 'cloud.session.token') || { value: 'expired_token' };
  await this.trelloLoginPage.setExpiredCookie('cloud.session.token', sessionCookie.value);
  await this.page.goto('https://trello.com/boards');
  console.log('Attempted to log in with expired session cookie.');
});

Then('I should be redirected to the login page', async function () {
  try {
    await this.page.waitForURL('**/login', { timeout: 10000 });
    const currentUrl = await this.trelloLoginPage.getCurrentUrl();
    console.log(`Current URL: ${currentUrl}`);
    assert.ok(currentUrl.includes('login'), 'Expected to be redirected to login page');
  } catch (error) {
    const currentUrl = await this.trelloLoginPage.getCurrentUrl();
    console.log(`Current URL: ${currentUrl}`);
    throw error;
  }
});