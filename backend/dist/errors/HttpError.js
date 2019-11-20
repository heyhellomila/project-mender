"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 500;
        this.errorMessage = message;
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=HttpError.js.map