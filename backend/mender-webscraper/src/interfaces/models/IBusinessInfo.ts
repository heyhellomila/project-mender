import { StatusType } from "../../common/enums/StatusType";

export default interface IBusinessInfo {
    name: string;
    otherName: string;
    rbqNum: string;
    status: StatusType;
    deliveranceDate: Date;
    paymentDate: Date;
    neqId: string;
    address: string;
    email: string;
    telephone: string;
}
