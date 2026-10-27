Feature: Product catalog

  Background:
    Given the website is open in the browser
    And user is on the products page

  Scenario: User sees product details successfully
    When user clicks on the product "Combination Pliers"
    Then user should be redirected to the "Combination Pliers" details page
    And user should see the "Combination Pliers" name, description, and price

  Scenario: User searches for an exact product successfully
    When user enters the "Protective Gloves" name in the search bar
    And user clicks on the search button
    Then user should see the products with the same name as the searched "Protective Gloves"

  Scenario Outline: User filters the products successfully
    Given user selects the category "<category>"
    And user selects the brand "<brand>"
    And user selects "<sustainability>"
    Then only products matching category "<category>", brand "<brand>" and sustainability "<sustainability>" should be displayed

    Examples:
      | category    | brand                 | sustainability                  |
      | hand tools  | ForgeFlex Tools       | Show only eco-friendly products |
      | power tools | MightyCraft Hardware  |                                 |

  Scenario Outline: User sorts the products successfully
    Given user clicks on the sort by dropdown menu
    And user selects "<sorting_option>"
    Then the products should be sorted according to "<sorting_option>"

    Examples:
      | sorting_option     |
      | Price (Low - High)  |
      | Price (High - Low)  |
      | Name (A - Z)        |
