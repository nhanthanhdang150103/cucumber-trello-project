// createBoardSteps.js
require('dotenv').config(); // Thêm dòng này để tải biến môi trường
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const TrelloBoardPage = require('../../pages/TrelloBoardPage');

Given('I am logged in to Trello', async function () {
  // Tái sử dụng các bước đăng nhập từ trelloLoginSteps.js
  await this.trelloLoginPage.goto();
  await this.trelloLoginPage.enterEmail(process.env.TRELLO_EMAIL);
  await this.trelloLoginPage.clickContinue();
  await this.trelloLoginPage.enterPassword(process.env.TRELLO_PASSWORD);
  await this.trelloLoginPage.clickLogin();
  await this.page.waitForURL('**/boards', { timeout: 30000 });
  console.log('Logged in to Trello successfully.');
  this.trelloBoardPage = new TrelloBoardPage(this.page); // Khởi tạo TrelloBoardPage
});

When('I click the create new board button', async function () {
  await this.trelloBoardPage.clickCreateBoardButton();
  console.log('Clicked the Create new board button.');
});

When('I enter the board title {string}', async function (title) {
  await this.trelloBoardPage.enterBoardTitle(title);
  console.log(`Entered board title: ${title}`);
});

When('I click the create board button', async function () {
  await this.trelloBoardPage.clickSubmitCreateBoard();
  console.log('Clicked the Create board button.');
});

Then('I should see the new board with title {string}', async function (expectedTitle) {
  const actualTitle = await this.trelloBoardPage.getBoardTitle();
  console.log(`Board title: ${actualTitle}`);
  assert.strictEqual(actualTitle.trim(), expectedTitle, `Expected board title to be "${expectedTitle}", but got "${actualTitle}"`);
});