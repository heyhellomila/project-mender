"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("./HttpError");
class UnauthorizedError extends HttpError_1.HttpError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=UnauthorizedError.js.map