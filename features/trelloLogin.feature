Feature: Login on Trello

  @trello
  Scenario: Successful login with valid credentials
    Given I am on the Trello login page
    When I enter my email
    And I click the continue button
    When I enter my password
    And I click the login button
    Then I should be redirected to the Trello home page

  @trello @failedLogin
  Scenario: Failed login with invalid credentials
    Given I am on the Trello login page
    When I enter my email
    And I click the continue button
    When I enter wrong password
    And I click the login button
    Then I should see a Trello login failure message
    
  @trello @cookieLogin
  Scenario: Login using saved cookies
    Given I use saved cookies to log in
    Then I should be redirected to the Trello home page
    
  @trello @cookieTest
  Scenario: Add and verify a custom cookie
    Given I am on the Trello login page
    When I set a cookie with name "myCustomCookie" and value "testValue123"
    Then I should see the cookie with name "myCustomCookie" and value "testValue123"

  @trello @cookieTest
  Scenario: Delete a custom cookie
    Given I am on the Trello login page
    When I set a cookie with name "myCustomCookie" and value "testValue123"
    And I delete the cookie with name "myCustomCookie"
    Then I should see the cookie with name "myCustomCookie" and value "testValue123" should fail