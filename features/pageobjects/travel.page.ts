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
        return $("//*[contains(@id, 'glider-next')]");
    }

    public get getPreviousPriceList() {
        return $("//*[contains(@id, 'glider-prev')]");
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
        console.log("From City : " + await fromSelector.getValue())
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
        console.log("To City : " + await toSelector.getValue())
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
        await delay(200);
        await this.childInfo.click()
        await delay(200);
        await browser.takeScreenshot();
        await this.applyBtn.click();
    }


    public async searchInfo() {
        await this.search.click();
        await delay(3000);
    }

    public async getFlightPriceList() {
        const priceToElementMap = new TreeMap<number, WebdriverIO.Element>()
        const priceToIndexMap = new TreeMap<number, number>()
        const currentPagePriceList = await this.getPriceList;
        var pageScrollCount = 20;

        for (let i = 0; i < currentPagePriceList.length; i++) {
            var  price = await currentPagePriceList[i].nextElement().getText();
            price = price.replace('₹ ','');
            price = price.replace(',','');
            
            if(price == null || price == '--' || price.length == 0 || price == '' ){
               // console.log(" Do no conider value Prices ### "+ price)
            }else{
                var numPrice = parseInt(price)
                console.log("conider value Prices ### "+ numPrice)
                if(!priceToElementMap.has(numPrice)){
                    priceToElementMap.set(numPrice, currentPagePriceList[i]);
                    priceToIndexMap.set(numPrice,0);
                }
             }
           
        }

        console.log("Tree Map Size "+  priceToElementMap.size)

        for (let j = 0; j < pageScrollCount; j++) {
            await this.getNextPriceList.click();
          //  await delay(100);
            const nextPriceList = await this.getPriceList;
            console.error(" Lenght @@@@@" + nextPriceList.length)
            for (let i = 0; i < nextPriceList.length; i++) {
                var price = await nextPriceList[i].nextElement().getText();
                price = price.replace('₹ ','');
                price = price.replace(',','');
                if (price == null || price == '--' || price.length == 0 || price == '') {
                   // console.log(" Do no conider value Prices ### " + price)
                } else {
                    // var  displayCheapestFlightDetails = await priceList[i].getText();
                    var numPrice = parseInt(price)
                    console.log("conider value Prices ### "+ numPrice)
                    if (!priceToElementMap.has(numPrice)){
                        priceToElementMap.set(numPrice, nextPriceList[i]);
                        priceToIndexMap.set(numPrice,1 + j);
                    }
                }

            }

        } 
        await browser.takeScreenshot();
        console.log("Treemap size after "+  priceToElementMap.size)
        var lowestPrice = priceToElementMap.firstEntry()[0];
        var lowestPriceIndex = priceToIndexMap.get(lowestPrice); 
        console.log("Cheapest element Price >> "+ lowestPrice)
        console.log("Cheapest element Price >> "+ lowestPriceIndex)
        for(let i = pageScrollCount  ; i > lowestPriceIndex ; i--){
            await this.getPreviousPriceList.click();
            await delay(500);
        }
       // await delay(500);
        console.log("Cheapest element Date >> "+ await priceToElementMap.firstEntry()[1].getText())
        priceToElementMap.firstEntry()[1].click();
        await delay(500);
      
    }

    public async displayCheapestFlightDetails() {
        const flightDetails = await this.flightDetails;
        console.log(" Cheapest flightDetails" + (await flightDetails.getText()).valueOf())
        await delay(100);
    }

}
export default new TravelHome();
