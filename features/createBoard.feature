Feature: Create a Board on Trello

  @trello @createBoard
  Scenario: Successfully create a new board
    Given I am logged in to Trello
    When I click the create new board button
    And I enter the board title "My New Board"
    And I click the create board button
    Then I should see the new board with title "My New Board"