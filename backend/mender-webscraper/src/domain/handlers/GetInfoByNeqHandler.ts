import { Handler, ICommandHandler } from "tsmediator";
import { Container } from "typedi";
import BusinessInfoModel from "../../api/models/businessInfo";
import { SearchType } from "../../common/enums/SearchType";
import IWebCrawler from "../../interfaces/services/IWebCrawler";
import RbqWebCrawler from "../../services/RbqWebCrawler";

@Handler(GetInfoByNeqHandler.Type)
export default class GetInfoByNeqHandler implements ICommandHandler<string, Promise<BusinessInfoModel>> {
    private crawler: IWebCrawler<BusinessInfoModel>;

    constructor() {
        this.crawler = Container.get<RbqWebCrawler>("rbq.webCrawler");
    }

    public static get Type(): string {
        return "GetInfoByNeq";
    }

    public async Handle(neqId: string): Promise<BusinessInfoModel> {
        // Run the crawler to scrape info needed.
        await this.crawler.run(neqId, SearchType.NEQ);

        return this.crawler.getInfo();
    }
}
