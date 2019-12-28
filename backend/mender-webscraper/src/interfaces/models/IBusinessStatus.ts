import { StatusType } from "../../common/enums/StatusType";

export default interface IBusinessStatus {
    name: string;
    rbqNum: string;
    status: StatusType;
    isValid: boolean;
}
