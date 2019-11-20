"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("../errors/HttpError");
function handleError(err, res) {
    if (err instanceof HttpError_1.HttpError) {
        return res.status(err.statusCode).json(err);
    }
    else {
        return res.status(500).json(err);
    }
}
module.exports = { handleError };
//# sourceMappingURL=HttpUtils.js.map