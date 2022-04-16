import exp = require('constants');
import { ChainablePromiseElement } from 'webdriverio';


import Page from './page';
import TreeMap from 'ts-treemap'

const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class FlightDetailsPage extends Page{
    public get getPriceList() {
        return $$("//*[contains(@class, 'blackFont fontSize12 appendBottom3')]");
    }

    public get getNextPriceList() {
        return $("//*[@id='glider-next-11']");
    }

    public get flightDetails()
    {
        return $("//*[contains(@id,'flight_list_item_0')]")
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
        await delay(3000);    
    }

    public async displayCheapestFlightDetails()
    {
        const flightDetails = await this.flightDetails;
        console.log(" &&&&&&&&&&&&&&&&&&&&&"+(await flightDetails.getText()).valueOf())
        flightDetails.getText().then(value =>{
            //console.log(" $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ "+ value);
        })
    }


}
export default new FlightDetailsPage();