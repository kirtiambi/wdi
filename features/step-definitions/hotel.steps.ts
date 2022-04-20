import { Given, When, Then } from "@wdio/cucumber-framework";
import exp = require("constants");
import HotelDetails from '../pageobjects/hotel.page';

const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
    
}

When('User selects Hotels option', async () => {
   
    await HotelDetails.menuClick();
});

When(/^User selects City (\w+)$/, async (City) => {
    await HotelDetails.selectHotelDetails(City);
})


Then('User selects date and guests option and click on serach', async () => {
    await HotelDetails.selectDateAndGuestInfo();
})

Then('User is able to see Hotel details', async () => {
    await HotelDetails.validateHotelDetailsPage();
})

When('User selects 3 star hotel option and select filter to sort hotel details by Price Low to High', async () => {
    await HotelDetails.selectHotelOptions();
})

Then('User is able to see cheapest hotel details', async () => {
    await HotelDetails.displayCheapestHotelDetails();
})
