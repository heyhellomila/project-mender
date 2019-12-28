import Container from "typedi";
import BusinessInfoModel from "../../../src/api/models/businessInfo";
import BusinessStatusModel from "../../../src/api/models/businessStatus";
import { SearchType } from "../../../src/common/enums/SearchType";
import GetStatusByNeqHandler from "../../../src/domain/handlers/GetStatusByNeqHandler";
import RbqWebCrawler from "../../../src/services/RbqWebCrawler";

jest.mock("../../../src/services/RbqWebCrawler");

let handler: GetStatusByNeqHandler;

const NeqId = "1234567890";

const TestBusinessInfoModel = new BusinessInfoModel(
    "Home Depot",
    "Reno Depot",
    "RBQ",
    "Valide",
    new Date(2019, 12, 12),
    new Date(2019, 12, 12),
    NeqId,
    "123 street",
    "home@depot.com",
    "514-123-4958"
);

describe("The GetStatusByNeqHandler tests", () => {
    beforeAll(() => {
        const mockRun = jest.fn(
            (id: string, type: SearchType): Promise<void> => {
                return new Promise<void>((resolve, rejects) => {
                    resolve();
                });
            }
        );

        const mockGetInfo = jest.fn(() => {
            return TestBusinessInfoModel;
        });

        RbqWebCrawler.prototype.run = mockRun;
        RbqWebCrawler.prototype.getInfo = mockGetInfo;

        Container.set("rbq.webCrawler", new RbqWebCrawler());

        handler = new GetStatusByNeqHandler();
    });

    describe("when calling get Type method of class", () => {
        test("should return its own class name: GetInfoByRbq", () => {
            expect(GetStatusByNeqHandler.Type).toEqual("GetStatusByNeq");
        });
    });

    describe("when the Handle method is called", () => {
        test("should execute the web crawler and return a model", async () => {
            expect.assertions(3);

            const expectedModel = new BusinessStatusModel(
                TestBusinessInfoModel.name,
                TestBusinessInfoModel.rbqNum,
                TestBusinessInfoModel.neqId,
                TestBusinessInfoModel.status
            );

            const model = await handler.Handle(NeqId);

            expect(RbqWebCrawler.prototype.run).toHaveBeenCalledWith(NeqId, SearchType.NEQ);
            expect(RbqWebCrawler.prototype.getInfo).toHaveBeenCalled();
            expect(model).toEqual(expectedModel);
        });
    });
});
