import errorHandler from "../../../src/api/middlewares/errorHandler";
import { SearchType } from "../../../src/common/enums/SearchType";
import HttpException from "../../../src/exceptions/HttpException";
import InvalidNeqIdException from "../../../src/exceptions/InvalidNeqIdException";
import InvalidRbqNumberException from "../../../src/exceptions/InvalidRbqNumberException";
import LicenseNotFoundException from "../../../src/exceptions/LicenseNotFoundException";
import WebScrappingException from "../../../src/exceptions/WebScrapingException";

const mockedResponse = () => {
    const res = {} as any;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe("The errorHandler tests", () => {
    describe("when handling HttpException", () => {
        test("should return appropriate http status and message", () => {
            const req = {} as any;
            const res = mockedResponse();
            const next = jest.fn();

            const message = "error";
            const httpException = new HttpException(500, message);

            errorHandler(httpException, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(message);
        });
    });
    describe("when handling InvalidNeqIdException", () => {
        test("should return appropriate http status and message", () => {
            const req = {} as any;
            const res = mockedResponse();
            const next = jest.fn();

            const neqId = "invalid NEQ";
            const message = `NEQ ID: ${neqId} is invalid. Please enter a valid NEQ, composed of 10 digits.`;
            const httpException = new InvalidNeqIdException(neqId);

            errorHandler(httpException, req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(message);
        });
    });
    describe("when handling InvalidRbqNumberException", () => {
        test("should return appropriate http status and message", () => {
            const req = {} as any;
            const res = mockedResponse();
            const next = jest.fn();

            const rbqNum = "invalid RBQ";
            const message = `RBQ number: ${rbqNum} is invalid. Please enter a valid RBQ number, composed of 8 to 10 digits.`;
            const httpException = new InvalidRbqNumberException(rbqNum);

            errorHandler(httpException, req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(message);
        });
    });
    describe("when handling LicenseNotFoundException", () => {
        test("should return appropriate http status and message for SearchType.NEQ", () => {
            const req = {} as any;
            const res = mockedResponse();
            const next = jest.fn();

            const id = "invalid ID";
            const searchType = SearchType.NEQ;
            const err = { data: "Something went wrong." };
            const message = `License with NEQ: ${id} not found. ERROR => ${err}`;
            const httpException = new LicenseNotFoundException(id, searchType, err);

            errorHandler(httpException, req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith(message);
        });
        test("should return appropriate http status and message for SearchType.RBQ", () => {
            const req = {} as any;
            const res = mockedResponse();
            const next = jest.fn();

            const id = "invalid ID";
            const searchType = SearchType.RBQ;
            const err = { data: "Something went wrong." };
            const message = `RBQ license number ${id} not found. ERROR => ${err}`;
            const httpException = new LicenseNotFoundException(id, searchType, err);

            errorHandler(httpException, req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith(message);
        });
    });
    describe("when handling WebScrappingException", () => {
        test("should return appropriate http status and message", () => {
            const req = {} as any;
            const res = mockedResponse();
            const next = jest.fn();

            const err = "Something went wrong.";
            const message = `Web Scrapping error. ERROR => ${err}`;
            const httpException = new WebScrappingException(err);

            errorHandler(httpException, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(message);
        });
    });
});
