import exp = require('constants');
import { ChainablePromiseElement } from 'webdriverio';
import Page from './page';

const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const setInputValue = async (el: ElementSync, value: string) => {
    try {
        await el.clearValue()
        await value
            .split('')
            .reduce(async (prev: Promise<string>, current: string) => {
                const nextString = `${await prev}${current}`
                await el.addValue(current)
                await el.waitUntil(
                    async function () {
                        const text = await el.getValue()
                        return text === nextString

                    },
                    {
                        timeout: 5000,
                        interval: 100,
                    }
                )
                return nextString
            }, Promise.resolve(''))

    } catch (e) {
        console.log('SetInputValue Error:', e)
    }

}

class HotelDetails extends Page {
  
    public get hotels() {
        return $('//*[@class="menu_Hotels"]')
    }

    public get cityName() {
        return $('//*[@id="city"]')
    }

    public get enterCityNameInputBox() {

        return $('//*[@placeholder="Enter city/ Hotel/ Area/ Building"]')

    }

    public get checkIndate() {

        return $("//*[@data-cy='checkInDate']")

    }

    public get selectCheckIndate() {

        return $("//*[contains(@aria-label,'Apr 24 2022')]")

    }

    public get selectCheckoutDate() {
        return $("//*[contains(@aria-label,'Apr 28 2022')]")
    }

    public get nextBtnInCalender() {
        return $("//*[@aria-label='Next Month']")
    }

    public get clickRoomsandGuests() {
        return $("//input[@data-cy='guest']")
    }

    public get selectAdult() {
        return $('//*[@data-cy="adults-2"]')
    }

    public get selectChild() {
        return $('//*[@data-cy="children-2"]')
    }

    public get child1age() {
        return $("//*[@data-cy='childAge-0']")
    }

    public get child2age() {
        return $("//*[@data-cy='childAge-1']")
    }

    public get applyBtn() {
        return $('//*[@data-cy="submitGuest"]')
    }

    public get search() {
        return $('//*[@id="hsw_search_button"]')
    }

    public get hotelDetailsPageHeading()
    {
        return $("//*[contains(@id,'Hotels, Villas, Apartments and more')]")
    }

    public get showMoreBtn() {
        return $('//*[@id="hlistpg_proptypes_show_more"]')
    }
   public get starSelection()
   {
       return $('//*[@id="STAR_CATEGORY"]/ul/li[4]/span[1]/label/div/span');
   }

   public get sortByOption()
   {
       return $('//*[@id="hlistpg_sortby_option"]');
   }
   public get sortLowToHigh()
   {
        return $('//*[@id="hlistpg_sortby_option"]/ul/li[2]');
   }
    public get displayHotelDetails() {
        return $('//*[@id="Listing_hotel_0"]')
    }



    public async selectHotelDetails(City:string) {
        await (await this.cityName).doubleClick();
        const cityNameInput = await this.enterCityNameInputBox;
        expect(cityNameInput).toBeExisting();
        await setInputValue(cityNameInput, City)
        browser.takeScreenshot();
        await delay(300);
        await cityNameInput.keys('ArrowDown')
        await cityNameInput.keys('Enter')
        await delay(500)
        browser.takeScreenshot();

    }

    public async  menuClick() {
         await this.hotels.doubleClick();
         await delay(200)
         browser.takeScreenshot();
    }

    public async selectDateAndGuestInfo() {

        await (await this.checkIndate).doubleClick();
       // await (await this.nextBtnInCalender).click();
        await (await this.selectCheckIndate).click();
        await (await this.selectCheckoutDate).click();
        await delay(500);

        await (await this.clickRoomsandGuests).doubleClick();
        await (await this.selectAdult).click();
        await (await this.selectChild).click();
        await this.child1age.click();
        const childage1 = await this.child1age;
        childage1.selectByAttribute("value", "5");
        await (await this.child2age).selectByAttribute("value", "2");
        browser.takeScreenshot();
        await (await this.applyBtn).click();
        await delay(500);
        browser.takeScreenshot();
        await (await this.search).click();

    }

    public async validateHotelDetailsPage() {
        const hoteldetails = await this.hotelDetailsPageHeading;
        if (hoteldetails.isDisplayed)
            console.log("Hotel details are displayed.")
        await delay(100)
        browser.takeScreenshot()
    }

    public async selectHotelOptions() {
        await (await this.showMoreBtn).click();
        await delay(500)
        
        const threeStarHotel = await this.starSelection;
       await delay(500);

        console.log("3 star hotel is displayed" + threeStarHotel.isDisplayedInViewport())

        await (await threeStarHotel).doubleClick();
        console.log("3 star hotel selected"+threeStarHotel.isSelected())
        await delay(500);
        browser.takeScreenshot();
        if(threeStarHotel.isSelected())
        {
            await (await this.sortByOption).click();
            await delay(500);
            await (await this.sortLowToHigh).click();
            await delay(500);
            browser.takeScreenshot()
        }

 }

    public async displayCheapestHotelDetails() {
        const chepestHotel = this.displayHotelDetails;
        console.log("Chepaest hotel is" + (await chepestHotel.getText()).valueOf())
        await delay(500);
        browser.takeScreenshot()
    }

}

export default new HotelDetails();



