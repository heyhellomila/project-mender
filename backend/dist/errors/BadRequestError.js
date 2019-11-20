"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("./HttpError");
class BadRequestError extends HttpError_1.HttpError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map