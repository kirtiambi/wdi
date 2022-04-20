Feature: Travel booking webpage
     Background: Naviagte to URL
          Given I open browser and navigate to travel booking site
     Scenario Outline: As a user, I can open travel booking site

          When User clicks on From City option
          Then User is able select From <fromCity>
          When User clicks on To City option
          Then User is able to select To <toCity>
          When User clicks on Travellers option
          Then User selects travellers information from selection pop up
          Then User selects option to search and lands on new page
          When User gets List of flight prices with dates and user selects cheapest flight
          Then User is able to see cheapest flight details

          Examples:
               | fromCity | toCity |
               | BLR      | SXR    |

     Scenario Outline: As a user, I want to check cheapest Hotel
          When User selects Hotels option
          When User selects City <City>
          Then User selects date and guests option and click on serach
          Then User is able to see Hotel details
          When User selects 3 star hotel option and select filter to sort hotel details by Price Low to High
          Then User is able to see cheapest hotel details

          Examples:
               | City     |
               | Srinagar |




