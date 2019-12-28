import Container from "typedi";
import { LicenseController } from "../../../src/api/controllers/licenseController";
import BusinessInfoModel from "../../../src/api/models/businessInfo";
import BusinessStatusModel from "../../../src/api/models/businessStatus";
import InvalidNeqIdException from "../../../src/exceptions/InvalidNeqIdException";
import InvalidRbqNumberException from "../../../src/exceptions/InvalidRbqNumberException";
import MockMediator from "../../_mocks_/MockMediator";

let licenseController: LicenseController;

describe("The LicenseController tests", () => {
    beforeAll(() => {
        Container.set("tsmediator", new MockMediator());

        licenseController = new LicenseController();
    });

    describe("when calling getStatusByRbq method", () => {
        test("should return 400 BAD REQUEST, with invalid RBQ number", async () => {
            const rbqNum = "invalidRbq";
            const expectedError = new InvalidRbqNumberException(rbqNum);

            expect.assertions(2);

            try {
                await licenseController.getStatusByRbq(rbqNum);
            } catch (e) {
                expect(e.status).toEqual(expectedError.status);
                expect(e.message).toEqual(expectedError.message);
            }
        });
        test("should return BusinessStatusModel, with valid RBQ number", async () => {
            const rbqNum = "1234567890";
            const model = await licenseController.getStatusByRbq(rbqNum);

            expect(model).toBeDefined();
            expect(model).toBeInstanceOf(BusinessStatusModel);
            expect(model.rbqNum).toEqual(rbqNum);
        });
    });

    describe("when calling getInfoByRbq method", () => {
        test("should return 400 BAD REQUEST, with invalid RBQ number", async () => {
            const rbqNum = "invalidRbq";
            const expectedError = new InvalidRbqNumberException(rbqNum);

            expect.assertions(2);

            try {
                await licenseController.getInfoByRbq(rbqNum);
            } catch (e) {
                expect(e.status).toEqual(expectedError.status);
                expect(e.message).toEqual(expectedError.message);
            }
        });
        test("should return BusinessInfoModel, with valid RBQ number", async () => {
            const rbqNum = "1234567890";
            const model = await licenseController.getInfoByRbq(rbqNum);

            expect(model).toBeDefined();
            expect(model).toBeInstanceOf(BusinessInfoModel);
            expect(model.rbqNum).toEqual(rbqNum);
        });
    });

    describe("when calling getStatusByNeq method", () => {
        test("should return 400 BAD REQUEST, with invalid NEQ ID", async () => {
            const neqId = "invalidNeq";
            const expectedError = new InvalidNeqIdException(neqId);

            expect.assertions(2);

            try {
                await licenseController.getStatusByNeq(neqId);
            } catch (e) {
                expect(e.status).toEqual(expectedError.status);
                expect(e.message).toEqual(expectedError.message);
            }
        });
        test("should return BusinessStatusModel, with valid NEQ ID", async () => {
            const neqId = "1234567890";
            const model = await licenseController.getStatusByNeq(neqId);

            expect(model).toBeDefined();
            expect(model).toBeInstanceOf(BusinessStatusModel);
            expect(model.neqId).toEqual(neqId);
        });
    });

    describe("when calling getInfoByNeq method", () => {
        test("should return 400 BAD REQUEST, with invalid NEQ ID", async () => {
            const neqId = "invalidNeq";
            const expectedError = new InvalidNeqIdException(neqId);

            expect.assertions(2);

            try {
                await licenseController.getInfoByNeq(neqId);
            } catch (e) {
                expect(e.status).toEqual(expectedError.status);
                expect(e.message).toEqual(expectedError.message);
            }
        });
        test("should return BusinessInfoModel, with valid NEQ ID", async () => {
            const neqId = "1234567890";
            const model = await licenseController.getInfoByNeq(neqId);

            expect(model).toBeDefined();
            expect(model).toBeInstanceOf(BusinessInfoModel);
            expect(model.neqId).toEqual(neqId);
        });
    });
});
