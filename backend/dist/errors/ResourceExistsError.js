"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("./HttpError");
class ResourceExistsError extends HttpError_1.HttpError {
    constructor(message) {
        super(message);
        this.statusCode = 409;
    }
}
exports.ResourceExistsError = ResourceExistsError;
//# sourceMappingURL=ResourceExistsError.js.map