Feature: Travel booking webpage
     Background: Naviagte to URL
          Given I open browser and navigate to travel booking site
     Scenario: As a user, I can open travel booking site

          When User clicks on From City option
          Then User is able select from City
          When User clicks on To City option
          Then User is able to select To City
          When User clicks on Travellers option
          Then User selects travellers information from selection pop up
          Then User selects option to serach and lands on new page
          When User gets List of flight prices with dates and user selects cheapest flight
          Then User is able to see cheapest flight details

    # Scenario: As a user, I can select travellers Information
          #When User clicks on Travellers option
          #Then User selects travellers information from selection pop up
          #Then User selects option to serach and lands on new page

     #Scenario: As a user, I want to find chepest Flight
         #Given User is on travel webpage where flight details are displayed
        # When User gets List of flight prices with dates and user selects cheapest flight
         #Then User is able to see cheapest flight details





