import exp = require('constants');
import { ChainablePromiseElement } from 'webdriverio';


import Page from './page';

import TreeMap from 'ts-treemap'


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

class TravelHome extends Page {
   
    public open() {
        return super.open();
    }
    public get fromCityInputBox() {
        return $("//input[@placeholder='From']");
    }
    public get fromCity() {
        return $("//span[text()='From']");
    }
    public get toCity() {
        return $("//span[text()='To']");
    }

    public get toCityInputBox() {
        return $("//input[@placeholder='To']");
    }
    public get travellersOption() {
        return $('#travellers')
    }

    public get adultsInfo() {
        return $("//*[@data-cy='adults-2']")
    }
    public get childInfo() {
        return $("//*[@data-cy='children-2']")
    }

    public get applyBtn() {
        return $("//*[@data-cy='travellerApplyBtn']")
    }

    public get getPriceList() {
        return $$("//*[contains(@class, 'blackFont fontSize12 appendBottom3')]");
    }
    public get getNextPriceList() {
        return $("//*[@id='glider-next-11']");
    }


      public get search() {
        return $('=Search')
        //return $('button[type="submit"]')
    }

  
    public get flightDetails()
    {
        return $("//*[contains(@id,'flight_list_item_0')]")
    }
    public async clickFromCityOption() {

        await this.fromCity.click()
        await this.fromCity.click()

    }

    public async setvalueFromCity(fromCityName: string) {
        const fromSelector = await this.fromCityInputBox;

        expect(fromSelector).toBeExisting();
        await setInputValue(fromSelector, fromCityName)

        console.log(" #####################################" + await fromSelector.getValue())
        await delay(1000);
        await fromSelector.keys('ArrowDown')
        await fromSelector.keys('Enter')

    }

    public async clickToCityOption() {
        await this.toCity.click()
        await this.toCity.click()
    }
    public async setvalueToCity(toCityName: string) {
        const toSelector = await this.toCityInputBox;
        expect(toSelector).toBeExisting();
        await delay(1000);
        await setInputValue(toSelector, toCityName)
        // await this.toCityInputBox.setValue(toCityName);
        console.log(" #####################################" + await toSelector.getValue())
        await delay(1000);
        await toSelector.keys('ArrowDown')
        await toSelector.keys('Enter')

    }
    public async clickTravellersOption() {
        await this.travellersOption.click()
        await delay(1000);
    }

    public async selectTravellersInfo() {
        await delay(1000);
       await  this.adultsInfo.click()
        await delay(200);
        await  this.childInfo.click()
        await delay(200);
       await  this.applyBtn.click() ;
    }
    

    public async searchInfo()
    {
        await this.search.click();
        delay(2000);
    }

    public async dispalyFlightDetails()
    {
        console.log("Cheapest flight is:"+this.flightDetails.getText())
    }

    public async validateFlightDetailsPage()
    {
        
        console.log("New page title is" + await browser.getTitle())
    }

    public async getFlightPriceList()
    {
        await delay(2000)
        const priceList = await this.getPriceList;
        await delay(1000);
        console.log(" Lenght @@@@@" +priceList.length)
        
        const treeMap = new TreeMap<string, WebdriverIO.Element>()
        for (let i = 0; i < priceList.length ; i++) {
           treeMap.set(await priceList[i].nextElement().getText(), priceList[i]);
        }
        treeMap.firstEntry()[1].click();
        treeMap.firstEntry()[1].click();
        await delay(1000);    
    }

    public async displayCheapestFlightDetails()
    {
        const flightDetails = await this.flightDetails;
        console.log(" Cheapest flightDetails"+(await flightDetails.getText()).valueOf())
    }

}
export default new TravelHome();
