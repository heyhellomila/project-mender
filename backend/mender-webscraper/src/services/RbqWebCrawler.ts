import puppeteer from "puppeteer";
import { TimeoutError } from "puppeteer/Errors";
import { Service } from "typedi";
import config from "../api/config/config";
import BusinessInfoModel from "../api/models/businessInfo";
import { SearchType } from "../common/enums/SearchType";
import LicenseNotFoundException from "../exceptions/LicenseNotFoundException";
import WebScrapingException from "../exceptions/WebScrapingException";
import IWebCrawler from "../interfaces/services/IWebCrawler";

@Service("rbq.webCralwer")
export default class RbqWebCrawler implements IWebCrawler<BusinessInfoModel> {
    private baseUrl: string;
    private model: BusinessInfoModel;

    constructor() {
        this.baseUrl = config.rbqBaseUrl;
        this.model = new BusinessInfoModel();
    }

    public async run(id: string, searchType: SearchType): Promise<void> {
        // Launch chrome browser. Add { headless: false } for testing purposes.
        // For more info visit: https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-puppeteerlaunchoptions
        const browser = await puppeteer.launch();

        try {
            // Create a new page(tab) to navigate
            const page = await browser.newPage();

            this.model = await this.crawl(page, id, searchType);
        } catch (e) {
            throw e;
        } finally {
            await browser.close();
        }
    }

    public getInfo(): BusinessInfoModel {
        return this.model;
    }

    private async crawl(page: puppeteer.Page, id: string, searchType: SearchType): Promise<BusinessInfoModel> {
        // Go to target page
        await page.goto(this.baseUrl);

        if (searchType === SearchType.NEQ) {
            // Enter NEQ ID in the text box
            await page.type("[name=NEQ]", id);
        } else {
            // Enter RBQ license number in the text box
            await page.type("[name=NoLicence]", id);
        }

        // Click on "Recherche"(search) button. This will trigger a naviation event
        // and we'll have to wait unti page.waitForNavigation() promise to
        // be resolved. Else we might end up with a race condition.
        const btnSearchSelector = "[type=submit]";
        await page.waitForSelector(btnSearchSelector, { timeout: 10000 });
        await page.click(btnSearchSelector);

        try {
            // Click "Voir Fiche Complete"(View More Details) button for more details.
            const btnMoreInfoSelector = "a.btn.btn-primary.btn-sm";
            await page.waitForSelector(btnMoreInfoSelector, { timeout: 10000 });
            await page.click(btnMoreInfoSelector);

            // Scrape Company name
            const companyNameSelector = "div.col-md-10 h1.h1";
            await page.waitForSelector(companyNameSelector, { timeout: 10000 });

            const compName = await page.evaluate(
                selector => document.querySelector(selector).innerText.trim(),
                companyNameSelector
            );

            // Scrape the info table
            const infoSelector = "div[class=p-1]";
            await page.waitForSelector(infoSelector);

            const dataArray = await page.evaluate(selector => {
                const info = Array.from(document.querySelectorAll(selector));
                return info.map(data => data.innerText.trim());
            }, infoSelector);

            return new BusinessInfoModel(
                compName,
                dataArray[0],
                dataArray[1],
                dataArray[2],
                dataArray[3],
                dataArray[4],
                dataArray[5],
                dataArray[6],
                dataArray[7],
                dataArray[8]
            );
        } catch (e) {
            if (e instanceof TimeoutError) {
                throw new LicenseNotFoundException(id, searchType, e);
            }

            throw new WebScrapingException(e);
        }
    }
}
