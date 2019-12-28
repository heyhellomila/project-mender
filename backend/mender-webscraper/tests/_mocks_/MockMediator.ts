import BusinessInfoModel from "../../src/api/models/businessInfo";
import BusinessStatusModel from "../../src/api/models/businessStatus";
import { StatusType } from "../../src/common/enums/StatusType";
import GetInfoByNeqHandler from "../../src/domain/handlers/GetInfoByNeqHandler";
import GetInfoByRbqHandler from "../../src/domain/handlers/GetInfoByRbqHandler";
import GetStatusByNeqHandler from "../../src/domain/handlers/GetStatusByNeqHandler";
import GetStatusByRbqHandler from "../../src/domain/handlers/GetStatusByRbqHandler";

const mockBusinessInfoModel = new BusinessInfoModel(
    "Home Depot",
    "Reno Depot",
    "RBQ",
    "Valide",
    new Date(2019, 12, 12),
    new Date(2019, 12, 12),
    0,
    "123 street",
    "home@depot.com",
    "514-123-4958"
);

const mockBusinessStatusModel = new BusinessStatusModel("Home Depot", "RBQ", 0, StatusType.VALIDE);

export default class MockMediator {
    public async Send(command: string, payload: any): Promise<any> {
        switch (command) {
            case GetStatusByRbqHandler.Type:
                mockBusinessStatusModel.rbqNum = payload;
                return mockBusinessStatusModel;

            case GetInfoByRbqHandler.Type:
                mockBusinessInfoModel.rbqNum = payload;
                return mockBusinessInfoModel;

            case GetStatusByNeqHandler.Type:
                mockBusinessStatusModel.neqId = payload;
                return mockBusinessStatusModel;

            case GetInfoByNeqHandler.Type:
                mockBusinessInfoModel.neqId = payload;
                return mockBusinessInfoModel;
        }
    }
}
