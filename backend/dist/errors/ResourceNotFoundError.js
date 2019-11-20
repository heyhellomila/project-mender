"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("./HttpError");
class ResourceNotFoundError extends HttpError_1.HttpError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
//# sourceMappingURL=ResourceNotFoundError.js.map