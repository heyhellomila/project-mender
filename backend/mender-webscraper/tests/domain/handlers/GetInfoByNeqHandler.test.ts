import Container from "typedi";
import BusinessInfoModel from "../../../src/api/models/businessInfo";
import { SearchType } from "../../../src/common/enums/SearchType";
import GetInfoByNeqHandler from "../../../src/domain/handlers/GetInfoByNeqHandler";
import RbqWebCrawler from "../../../src/services/RbqWebCrawler";

jest.mock("../../../src/services/RbqWebCrawler");

let handler: GetInfoByNeqHandler;

const NeqId = "1234567890";

const ExpectedBusinessInfoModel = new BusinessInfoModel(
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

describe("The GetInfoByNeqHandler tests", () => {
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

        handler = new GetInfoByNeqHandler();
    });

    describe("when calling get Type method of class", () => {
        test("should return its own class name: GetInfoByNeq", () => {
            expect(GetInfoByNeqHandler.Type).toEqual("GetInfoByNeq");
        });
    });

    describe("when the Handle method is called", () => {
        test("should execute the web crawler and return a model", async () => {
            expect.assertions(3);

            const expectedModel = await handler.Handle(NeqId);

            expect(RbqWebCrawler.prototype.run).toHaveBeenCalledWith(NeqId, SearchType.NEQ);
            expect(RbqWebCrawler.prototype.getInfo).toHaveBeenCalled();
            expect(expectedModel).toEqual(ExpectedBusinessInfoModel);
        });
    });
});
