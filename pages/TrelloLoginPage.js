// TrelloLoginPage.js
const selectors = require('./selectors');

class TrelloLoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = selectors.trelloLogin.emailInput;
    this.continueButton = selectors.trelloLogin.continueButton;
    this.passwordInput = selectors.trelloLogin.passwordInput;
    this.loginButton = selectors.trelloLogin.loginButton;
    this.errorMessage = selectors.trelloLogin.errorMessage;
  }

  async goto() {
    await this.page.goto('https://trello.com/login');
  }

  async enterEmail(email) {
    await this.page.fill(this.emailInput, email);
  }

  async clickContinue() {
    await this.page.click(this.continueButton);
  }

  async enterPassword(password) {
    await this.page.waitForSelector(this.passwordInput, { timeout: 5000 });
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.loginButton);
  }

  async getCurrentUrl() {
    return await this.page.url();
  }

  async getErrorMessage() {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
      return await this.page.textContent(this.errorMessage);
    } catch (error) {
      return '';
    }
  }

  async getCookies() {
    const cookies = await this.page.context().cookies();
    console.log('Danh sách cookies:', cookies);
    return cookies;
  }

  async setCookies(cookies) {
    await this.page.context().addCookies(cookies);
    console.log('Đã thêm cookies từ dữ liệu.');
  }

  // Thêm cookie tùy chỉnh
  async setCookie(name, value, options = {}) {
    const defaultOptions = {
      url: 'https://trello.com',
      name,
      value,
      ...options,
    };
    await this.page.context().addCookies([defaultOptions]);
    console.log(`Cookie ${name} với giá trị ${value} đã được thêm.`);
  }

  // Xóa cookie theo tên
  async deleteCookie(name) {
    const cookies = await this.page.context().cookies();
    const updatedCookies = cookies.filter(cookie => cookie.name !== name);
    await this.page.context().clearCookies();
    await this.page.context().addCookies(updatedCookies);
    console.log(`Cookie ${name} đã được xóa.`);
  }
}

module.exports = TrelloLoginPage;