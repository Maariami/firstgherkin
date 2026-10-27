Feature: Profile management

  Background:
    Given the website is open in the browser
    And user is logged in

  Scenario: User changes profile information successfully
    Given user is on the profile page
    And the user's first name is "mariami"
    When user enters a new first name "Nini"
    And user clicks the update profile button
    Then user should see the "Your profile is successfully updated!" message
    And the first name should be "Nini"
