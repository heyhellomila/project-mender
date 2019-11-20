"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
require('dotenv/config');
async function generateAuthToken(user) {
    const token = await new Promise((resolve, reject) => {
        jwt.sign({ _id: user.get("_id") }, process.env.JWT_KEY, { expiresIn: '24h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            return resolve(token);
        });
    });
    return token;
}
async function validateToken(token) {
    const validated = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(decoded);
        });
    });
    return validated;
}
module.exports = generateAuthToken, validateToken;
//# sourceMappingURL=AuthUtils.js.map