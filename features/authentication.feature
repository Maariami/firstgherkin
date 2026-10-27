Feature: Authentication

  Background:
    Given the website is open in the browser

  Scenario: User registers successfully
    Given user is on the register page
    When user enters first name, last name and the rest of the required information, unique email and password
    And user clicks the register button
    Then user should be redirected to the login page

  Scenario: User logs in successfully
    Given user is on the login page
    When user enters valid email and password
    And user clicks the login button
    Then user should be redirected to the account page

  Scenario Outline: User changes language successfully
    Given user is on the homepage
    When user clicks on the language option button
    And user selects "<option>" from the dropdown menu
    Then user should see the page in "<language>"

    Examples:
      | option | language |
      | DE     | German   |
      | EN     | English  |
      | ES     | Spanish  |
      | FR     | French   |

