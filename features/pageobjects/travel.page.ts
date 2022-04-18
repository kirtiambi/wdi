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
        return $("//*[@id='fromCity']");
    }
    public get toCity() {
        return $("//*[@id='toCity']");
    }

    public get toCityInputBox() {
        return $("//input[@placeholder='To']");
    }
    public get travellersOption() {
        return $("//*[@id='travellers']");
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
        return $("//*[@id='glider-next-3']");
    }

    public get search() {
        return $("//*[text()='Search']");
    }


    public get flightDetails() {
        return $("//*[contains(@id,'flight_list_item_0')]")
    }
    public async clickFromCityOption() {
        await this.fromCity.waitForEnabled()
        await (await this.fromCity).doubleClick()
    }

    public async setvalueFromCity(fromCity: string) {
        const fromSelector = await this.fromCityInputBox;
        await setInputValue(fromSelector, fromCity)
        console.log(" #####################################" + await fromSelector.getValue())
        await delay(1000);
        await browser.takeScreenshot();
        await fromSelector.keys('ArrowDown')
        await fromSelector.keys('Enter')
    }

    public async clickToCityOption() {
        await this.toCity.waitForEnabled()
        await (await this.toCity).doubleClick()
    }
    public async setvalueToCity(toCity: string) {
        const toSelector = await this.toCityInputBox;
        await delay(500);
        await setInputValue(toSelector, toCity)
        console.log(" #####################################" + await toSelector.getValue())
        await delay(1000);
        await toSelector.keys('ArrowDown')
        await toSelector.keys('Enter')

    }
    public async clickTravellersOption() {
        await (await this.travellersOption).doubleClick();
        await delay(500);
    }

    public async selectTravellersInfo() {
        await this.adultsInfo.click()
        await delay(300);
        await this.childInfo.click()
        await delay(300);
        await browser.takeScreenshot();
        await this.applyBtn.click();
    }


    public async searchInfo() {
        await this.search.click();
        await delay(3000);
    }

    public async getFlightPriceList() {
      /* for (let i = 0; i < 3; i++) {
            await this.getNextPriceList.click();
            await delay(500);

        } */
        const priceList = await this.getPriceList;
        console.error(" Lenght @@@@@" + priceList.length)
        const treeMap = new TreeMap<string, WebdriverIO.Element>()
        for (let i = 0; i < priceList.length-1; i++) {
            var  price = await priceList[i].nextElement().getText();

            if(price == null || price == '--' || price.length == 0 || price == '' ){
                console.log(" Do no conider value Prices ### "+ price)
            }else{
               // var  displayCheapestFlightDetails = await priceList[i].getText();
              //  console.log("conider value Prices ### "+ displayCheapestFlightDetails)
                treeMap.set(price, priceList[i]);
             }
           
        }
        await browser.takeScreenshot();
        console.log("Fiest Entry Details ###: "+  treeMap.size)

            console.log("Cheapest element date >> "+ await treeMap.firstEntry()[1].getText())
            //treeMap.firstEntry()[1].getValue().then(vall => console.log(vall))
      
        treeMap.firstEntry()[1].click();
        await delay(1000);
    }

    public async displayCheapestFlightDetails() {
        const flightDetails = await this.flightDetails;
        console.log(" Cheapest flightDetails" + (await flightDetails.getText()).valueOf())
        await delay(1000);
    }

}
export default new TravelHome();
