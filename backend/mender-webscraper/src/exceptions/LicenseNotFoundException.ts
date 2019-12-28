import { SearchType } from "../common/enums/SearchType";
import HttpException from "./HttpException";

export default class LicenseNotFoundException extends HttpException {
    constructor(id: string, searchType: SearchType, err: any) {
        let message = "";

        if (searchType === SearchType.NEQ) {
            message = `License with NEQ: ${id} not found. ERROR => ${err}`;
        } else {
            message = `RBQ license number ${id} not found. ERROR => ${err}`;
        }

        super(404, message);
    }
}
