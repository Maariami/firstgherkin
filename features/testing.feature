Feature: Login/register page Features

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


Feature: Profile page Features

  Background:
    Given the website is open in the browser
    And user is logged in

 Scenario: User changes profile information successfully
    Given user is on the profile page
    And the user's first name is "Mariami"
    When user enters a new first name "Nini"
    And user clicks the update profile button
    Then user should see the "Your profile is successfully updated!" message
    And the first name should be "Nini"

Feature: Products Listing Page

  Background:
    When the website is open in the browser
    And user is on the products page

  Scenario: User sees product details successfully
    When user clicks on the product "Combination Pliers"
    Then user should be redirected to the "Combination Pliers" page
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
      | category    | brand                | sustainability                  |
      | hand tools  | ForgeFlex Tools      | Show only eco-friendly products |
      | power tools | MightyCraft Hardware |                                 |

  Scenario Outline: User sorts the products successfully
    Given user clicks on the sort by dropdown menu
    And user selects "<sorting_option>"
    Then the products should be sorted according to "<sorting_option>"

    Examples:
      | sorting_option     |
      | Price: Low to High |
      | Price: High to Low |
      | Name: A to Z       |

Feature: Add to favourites

  Background:
    Given the web shop application is open in the browser
    And user is logged in

  Scenario: User adds products to favourites successfully
    Given the user is on "Protective Gloves" details page
    When user clicks on the add to favourites button
    Then user should see the "product added to your favourites list" message
    And the "Protective Gloves" should be added to the user's favourites list


Feature: Add to cart and Check out 

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


