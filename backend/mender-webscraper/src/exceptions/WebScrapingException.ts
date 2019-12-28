import HttpException from "./HttpException";

export default class WebScrapingException extends HttpException {
    constructor(err: any) {
        super(500, `Web Scrapping error. ERROR => ${err}`);
    }
}
