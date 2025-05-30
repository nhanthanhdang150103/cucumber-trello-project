const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const TrelloLoginPage = require('../../pages/TrelloLoginPage');
const i18n = require('../../i18n');

setDefaultTimeout(60000);

Before({ tags: "@trello" }, async function () {
  const locale = process.env.LANGUAGE || 'en';
  i18n.setLocale(locale);
  console.log(`Using locale: ${locale}`);
  console.log(i18n.__('login_success'));
  this.browser = await chromium.launch({ headless: true });
  this.page = await this.browser.newPage();
  await this.page.context().clearCookies(); // Xóa cookies trước khi bắt đầu
  console.log('Cleared all cookies.');
  this.trelloLoginPage = new TrelloLoginPage(this.page);
});

After({ tags: "@trello" }, async function () {
  if (this.browser) {
    await this.browser.close();
    console.log('Browser closed successfully.');
  }
});