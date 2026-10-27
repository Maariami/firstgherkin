Feature: Cart and checkout

  Background:
    Given the web shop application is open in the browser
    And user is logged in

  Scenario: User adds products to cart successfully
    Given the user is on "Bolt Cutters" details page
    When user chooses quantity "2"
    And user clicks on the add to cart button
    Then user should see the "Product added to cart" message
    And the cart should have "2" of "Bolt Cutters"

  Scenario: User checks out successfully
    Given user has "Bolt Cutters" in the cart
    And user is on the cart page
    When user proceeds through checkout with valid billing and payment information
    Then user should see the "Payment was successful" message
    And the user should see the invoice number
