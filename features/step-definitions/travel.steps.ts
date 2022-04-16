import { Given,When,Then  } from "@wdio/cucumber-framework";
import exp = require("constants");
import FlightdetailsPage from "../pageobjects/Flightdetails.page";
import TravelHome from '../pageobjects/travel.page';



const pages = {
  clickFromCityOption: TravelHome
}

const delay = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Given('I open browser and navigate to travel booking site',async() => {
    
  await TravelHome.open();
 // await delay(1000);
  //await browser.maximizeWindow();
  // expect(await (await browser.getTitle()).to.be.equal('MakeMyTrip - #1 Travel Website 50% OFF on Hotels, Flights & Holiday'));
  });
  
  When('User clicks on From City option',async() => {
    await TravelHome.clickFromCityOption()
    
  });

  Then('User is able select from City',async() =>
  {
      await TravelHome.setvalueFromCity('BLR')
      //await expect(TravelHome.fromCityInputBox).toBeExisting();
   });

  When('User clicks on To City option',async() =>{
    await TravelHome.clickToCityOption()
  })

  Then('User is able to select To City',async() =>{
    await TravelHome.setvalueToCity('SXR')
  })

  When('User clicks on Travellers option',async() =>{
    await TravelHome.clickTravellersOption()
    
  })

  Then('User selects travellers information from selection pop up',async() =>{
    await TravelHome.selectTravellersInfo()
  })

  Then('User selects option to serach and lands on new page',async() =>{
    await TravelHome.searchInfo()
  })

  Given('User is on travel webpage where flight details are displayed', async() =>{
    await TravelHome.validateFlightDetailsPage();
  })

  When('User gets List of flight prices with dates and user selects cheapest flight', async() =>{
    await TravelHome.getFlightPriceList();
  })
  Then('User is able to see cheapest flight details', async()=>{
    await TravelHome.displayCheapestFlightDetails();
  })

  