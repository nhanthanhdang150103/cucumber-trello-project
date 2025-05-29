const selectors = require('./selectors');

class TrelloBoardPage {
  constructor(page) {
    this.page = page;
    this.createBoardButton = selectors.trelloBoard.createBoardButton;
    this.boardTitleInput = selectors.trelloBoard.boardTitleInput;
    this.submitCreateBoardButton = selectors.trelloBoard.submitCreateBoardButton;
    this.boardTitle = selectors.trelloBoard.boardTitle;
  }

  async clickCreateBoardButton() {
    await this.page.click(this.createBoardButton);
  }

  async enterBoardTitle(title) {
    await this.page.fill(this.boardTitleInput, title);
  }

  async clickSubmitCreateBoard() {
    await this.page.click(this.submitCreateBoardButton);
  }

  async getBoardTitle() {
    try {
      console.log('Waiting for board title selector:', this.boardTitle);
      await this.page.waitForSelector(this.boardTitle, { timeout: 10000 }); // Increase timeout
      const titleElement = await this.page.$(this.boardTitle);
      const titleText = await titleElement.evaluate(el => el.textContent.trim());
      console.log('Retrieved board title:', titleText);
      return titleText;
    } catch (error) {
      console.error('Error retrieving board title:', error.message);
      return '';
    }
  }
}

module.exports = TrelloBoardPage;