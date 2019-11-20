"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const saltRounds = 10;
async function generateHash(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err)
                reject(err);
            resolve(hash);
        });
    });
    return hashedPassword;
}
async function compare(unhashed, hashed) {
    const match = await new Promise((resolve, reject) => {
        bcrypt.compare(unhashed, hashed, function (err, res) {
            if (err)
                reject(err);
            resolve(res);
        });
    });
    return match;
}
module.exports = { generateHash, compare };
//# sourceMappingURL=HashUtils.js.map