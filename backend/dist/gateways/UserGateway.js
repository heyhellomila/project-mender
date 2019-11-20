"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceNotFoundError_1 = require("../errors/ResourceNotFoundError");
const User_1 = __importDefault(require("../models/User"));
class UserGateway {
    async getUserByEmail(email) {
        return await User_1.default.findOne({ email: email });
    }
    async getUserById(id) {
        const user = await User_1.default.findById(id);
        if (!user) {
            throw new ResourceNotFoundError_1.ResourceNotFoundError("User with id " + id + " does not exist");
        }
        return user;
    }
    async createUser(email, password_hash, first_name, last_name, phone_number, type) {
        const user = new User_1.default({
            email: email,
            password_hash: password_hash,
            first_name: first_name,
            last_name: last_name,
            phone_number,
            type: type
        });
        try {
            return await user.save();
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
exports.default = new UserGateway();
//# sourceMappingURL=UserGateway.js.map