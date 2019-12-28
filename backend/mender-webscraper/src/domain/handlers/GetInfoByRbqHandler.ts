import { Handler, ICommandHandler } from "tsmediator";
import { Container } from "typedi";
import BusinessInfoModel from "../../api/models/businessInfo";
import { SearchType } from "../../common/enums/SearchType";
import IWebCrawler from "../../interfaces/services/IWebCrawler";
import RbqWebCrawler from "../../services/RbqWebCrawler";

@Handler(GetInfoByRbqHandler.Type)
export default class GetInfoByRbqHandler implements ICommandHandler<string, Promise<BusinessInfoModel>> {
    private crawler: IWebCrawler<BusinessInfoModel>;

    constructor() {
        this.crawler = Container.get<RbqWebCrawler>("rbq.webCrawler");
    }

    public static get Type(): string {
        return "GetInfoByRbq";
    }

    public async Handle(rbqNum: string): Promise<BusinessInfoModel> {
        // Run the crawler to scrape info needed.
        await this.crawler.run(rbqNum, SearchType.RBQ);

        return this.crawler.getInfo();
    }
}
