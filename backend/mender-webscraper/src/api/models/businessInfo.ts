import { StatusType } from "../../common/enums/StatusType";
import IBusinessInfo from "../../interfaces/models/IBusinessInfo";

export default class BusinessInfoModel implements IBusinessInfo {
    public name: string;
    public otherName: string;
    public rbqNum: string;
    public status: StatusType;
    public deliveranceDate: Date;
    public paymentDate: Date;
    public neqId: string;
    public address: string;
    public email: string;
    public telephone: string;

    constructor();
    constructor(
        name: string,
        otherName: string,
        rbqNum: string,
        status: string,
        deliveranceDate: Date,
        paymentDate: Date,
        neqId: string,
        address: string,
        email: string,
        telephone: string
    );
    constructor(
        name?: string,
        otherName?: string,
        rbqNum?: string,
        status?: string,
        deliveranceDate?: Date,
        paymentDate?: Date,
        neqId?: string,
        address?: string,
        email?: string,
        telephone?: string
    ) {
        this.name = name!;
        this.otherName = otherName!;
        this.rbqNum = rbqNum!;
        this.status = status ? (StatusType as any)[status.toLocaleUpperCase()] : StatusType.UNDEFINED;
        this.deliveranceDate = deliveranceDate!;
        this.paymentDate = paymentDate!;
        this.neqId = neqId!;
        this.address = address!;
        this.email = email!;
        this.telephone = telephone!;
    }
}
