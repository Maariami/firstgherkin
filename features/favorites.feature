Feature: Favorites

  Background:
    Given the web shop application is open in the browser
    And user is logged in

  Scenario: User adds products to favorites successfully
    Given the user is on "Protective Gloves" details page
    When user clicks on the add to favorites button
    Then user should see the "product added to your favorites list" message
    And the "Protective Gloves" should be added to the user's favorites list
