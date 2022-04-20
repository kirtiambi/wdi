import { Given, When, Then } from "@wdio/cucumber-framework";
import exp = require("constants");
import TravelHome from '../pageobjects/travel.page';


const pages = {
  clickFromCityOption: TravelHome
}

const delay = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Given('I open browser and navigate to travel booking site', async () => {
  await TravelHome.open();
  await browser.maximizeWindow();
  await browser.takeScreenshot();
  
});

When('User clicks on From City option', async () => {
  await TravelHome.clickFromCityOption();
  
});

Then(/^User is able select From (\w+)$/, async (fromCity) => {
  await TravelHome.setvalueFromCity(fromCity)
  await browser.takeScreenshot();
});

When('User clicks on To City option', async () => {
  await TravelHome.clickToCityOption();
})


Then(/^User is able to select To (\w+)$/, async (toCity) => {
  await TravelHome.setvalueToCity(toCity)
  await browser.takeScreenshot();
});


When('User clicks on Travellers option', async () => {
  await TravelHome.clickTravellersOption();
  await browser.takeScreenshot();

})

Then('User selects travellers information from selection pop up', async () => {
  await TravelHome.selectTravellersInfo();
  
})

Then('User selects option to search and lands on new page', async () => {
  await TravelHome.searchInfo();
  await browser.takeScreenshot();
})


When('User gets List of flight prices with dates and user selects cheapest flight', async () => {
  await TravelHome.getFlightPriceList();
})
Then('User is able to see cheapest flight details', async () => {
  await TravelHome.displayCheapestFlightDetails();
  await browser.takeScreenshot();
})

