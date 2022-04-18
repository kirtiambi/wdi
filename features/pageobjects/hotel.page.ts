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

        return $("//*[contains(@aria-label,'Jun 20 2022')]")

    }

    public get selectCheckoutDate() {
        return $("//*[contains(@aria-label,'Jun 23 2022')]")
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

    public get showMoreBtn() {
        return $('//*[@id="hlistpg_proptypes_show_more"]')
    }

    public get displayHotelDetails() {
        return $('//*[@id="Listing_hotel_0"]')
    }



    public async selectHotelDetails() {
        await (await this.cityName).doubleClick();
        const cityNameInput = await this.enterCityNameInputBox;
        expect(cityNameInput).toBeExisting();
        await setInputValue(cityNameInput, 'Srinagar')
        await delay(1000);
        await cityNameInput.keys('ArrowDown')
        await cityNameInput.keys('Enter')
        await delay(100)
        browser.takeScreenshot();

    }

    public async  menuClick() {
         await this.hotels.doubleClick();
         await delay(100)
         browser.takeScreenshot();
    }

    public async selectDateAndGuestInfo() {

        await (await this.checkIndate).doubleClick();
        await (await this.nextBtnInCalender).click();
        await (await this.selectCheckIndate).click();
        await (await this.selectCheckoutDate).click();
        await delay(1000);
        // var $input = $('.datepicker')
        // Use the picker object directly.
        // var picker = $input.pickadate('picker')

        await (await this.clickRoomsandGuests).doubleClick();
        await (await this.selectAdult).click();
        await (await this.selectChild).click();
        await this.child1age.click();
        const childage1 = await this.child1age;
        childage1.selectByAttribute("value", "5");
        await (await this.child2age).selectByAttribute("value", "2");
        await (await this.applyBtn).click();
        await delay(1000);
        browser.takeScreenshot();
        await (await this.search).click();

    }

    public async validateHotelDetailsPage() {
        const hoteldetails = $("//*[contains(@id,'Hotels, Villas, Apartments and more')]")
        if (hoteldetails.isDisplayed)
            console.log("Hotel details are displayed.")
        await delay(100)
        browser.takeScreenshot()
    }

    public async selectHotelOptions() {
        await (await this.showMoreBtn).click();
        await delay(2000)
        //  await (await $("//*[@id='STAR_CATEGORY']:nth child(4)")).click();
        const StarHotel = $('//*[@id="STAR_CATEGORY"]/ul/li[4]/span[1]');
        // (await StarHotel).isDisplayedInViewport();
        (await StarHotel).scrollIntoView();
        (await StarHotel).waitForDisplayed();

        console.log("3 star selection is displayed" + StarHotel.isDisplayedInViewport())

        await (await StarHotel).doubleClick();
        await delay(1000);
        await (await $('//*[@id="hlistpg_sortby_option"]')).click();
        await delay(1000);
        await (await $('//*[@id="hlistpg_sortby_option"]/ul/li[2]')).click();
        await delay(1000);
        browser.takeScreenshot()

    }

    public async displayCheapestHotelDetails() {
        const chepestHotel = this.displayHotelDetails;
        console.log("Chepaest hotel is" + (await chepestHotel.getText()).valueOf())
        await delay(1000);
        browser.takeScreenshot()
    }

}

export default new HotelDetails();



