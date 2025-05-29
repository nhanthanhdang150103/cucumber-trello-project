// selectors.js
module.exports = {
  trelloLogin: {
    emailInput: '[data-testid="username"]', // Ô nhập email
    continueButton: '[id="login-submit"]', // Nút "Continue" (bước nhập email)
    passwordInput: '[data-testid="password"]', // Ô nhập password
    loginButton: '[id="login-submit"]', // Nút "Log in" (bước nhập password)
    errorMessage: '[data-testid="form-error--content"]', // Thông báo lỗi
  },
  trelloBoard: {
    createBoardButton: '[data-testid="create-board-tile"]', // Nút "Create" trên thanh header
    boardTitleInput: '[data-testid="create-board-title-input"]', // Ô nhập tiêu đề board
    submitCreateBoardButton: '[data-testid="create-board-submit-button"]', // Nút xác nhận tạo board
    boardTitle: '[data-testid="board-name-display"]', // Tiêu đề board hiển thị trên trang
  },
};	
