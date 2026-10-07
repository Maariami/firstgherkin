Feature: Software Testing

Scenario: User logs in successfully    
    Given user is on the login page
    When user enters valid credentials
    And user clicks the login button
    Then user should be redirected to the homepage

Scenario: User registers successfully    
    Given user is on the register page
    When user enters valid information
    And user clicks the register button
    Then user should be redirected to the login page

Scenario: User changes profile information successfully   
    Given user is logged in
    And user is on the profile page 
    When user enters a new first name 
    And user clicks the update profile button
    Then user should see the "Your profile is successfully updated!" message

Scenario: User changes language successfully  
    Given user is on the homepage
    When user clicks on the language change button
    And user selects a new language from the dropdown menu
    Then user should see the page in the selected language
  
Scenario: User sees product details successfully
    Given user is on the products page
    When user clicks on a product
    Then user should be redirected to the product page 
    And user should see the product name, description, and price
  
Scenario: User adds products to cart successfully
    Given user is on the product page
    When user chooses quantity 
    And user clicks on the add to cart button
    Then user should see the product added to cart message

Scenario: User adds products to favourites successfully
    Given user is logged in
    And user is on the product page
    When user clicks on the add to favourites button
    Then user should see the "product added to your favourites list" message

Scenario: User searches for an exact product successfully
    Given user is on the products page
    When user enters a product name in the search bar
    And user clicks on the search button
    Then user should see the products with the same name as the searched product

Scenario: User filters the products successfully
    Given user is on the products page
    When user selects a category 
    And user selects a brand
    And user selects sustainability
    Then products should be filtered according to the filter criteria

Scenario: User sorts the products successfully
    Given user is on the products page
    When user clicks on the sort by dropdown menu
    And user selects a sorting option
    Then the products should be sorted according to the selected sorting option
  
Scenario: User checks out successfully  
    Given user is logged in
    And user has products in the cart
    And user is on the cart page
    When user proceeds through checkout with valid billing and payment information
    Then user should see the payment was successful message
    And user should see the invoice number 
 
    