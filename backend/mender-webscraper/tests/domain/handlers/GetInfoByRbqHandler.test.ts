import Container from "typedi";
import BusinessInfoModel from "../../../src/api/models/businessInfo";
import GetInfoByRbqHandler from "../../../src/domain/handlers/GetInfoByRbqHandler";
import RbqWebCrawler from "../../../src/services/RbqWebCrawler";
import { SearchType } from "./../../../src/common/enums/SearchType";

let handler: GetInfoByRbqHandler;

const RbqNum = "1234-5678-90";

const ExpectedBusinessInfoModel = new BusinessInfoModel(
    "Home Depot",
    "Reno Depot",
    RbqNum,
    "Valide",
    new Date(2019, 12, 12),
    new Date(2019, 12, 12),
    "1234567890",
    "123 street",
    "home@depot.com",
    "514-123-4958"
);

describe("The GetInfoByRbqHandler tests", () => {
    beforeAll(() => {
        const mockRun = jest.fn(
            (id: string, type: SearchType): Promise<void> => {
                // tslint:disable-next-line: no-shadowed-variable
                return new Promise<void>((resolve, reject) => {
                    resolve();
                });
            }
        );

        const mockGetInfo = jest.fn(() => {
            return ExpectedBusinessInfoModel;
        });

        RbqWebCrawler.prototype.run = mockRun;
        RbqWebCrawler.prototype.getInfo = mockGetInfo;

        Container.set("rbq.webCrawler", new RbqWebCrawler());

        handler = new GetInfoByRbqHandler();
    });

    describe("when calling get Type method of class", () => {
        test("should return its own class name: GetInfoByRbq", () => {
            expect(GetInfoByRbqHandler.Type).toEqual("GetInfoByRbq");
        });
    });

    describe("when the Handle method is called", () => {
        test("should execute the web crawler and return a model", async () => {
            expect.assertions(3);

            const expectedModel = await handler.Handle(RbqNum);

            expect(RbqWebCrawler.prototype.run).toHaveBeenCalledWith(RbqNum, SearchType.RBQ);
            expect(RbqWebCrawler.prototype.getInfo).toHaveBeenCalled();
            expect(expectedModel).toEqual(ExpectedBusinessInfoModel);
        });
    });
});
