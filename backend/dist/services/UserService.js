"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserGateway_1 = __importDefault(require("../gateways/UserGateway"));
const PasswordUtils_1 = require("../utils/PasswordUtils");
const ResourceNotFoundError_1 = require("../errors/ResourceNotFoundError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const ResourceExistsError_1 = require("../errors/ResourceExistsError");
const BadRequestError_1 = require("../errors/BadRequestError");
const UserType_1 = require("../enums/UserType");
const { generateHash, compare } = require('../utils/HashUtils');
const generateAuthToken = require('../utils/AuthUtils');
const validator = require('validator');
class UserService {
    async userExists(id) {
        try {
            await UserGateway_1.default.getUserById(id);
        }
        catch (err) {
            return false;
        }
        return true;
    }
    async register(email, password, first_name, last_name, phone_number, type) {
        if (!PasswordUtils_1.passwordValidator.validate(password)) {
            throw new BadRequestError_1.BadRequestError('Password must be at least 8 characters' +
                ' and must include at least one digit.');
        }
        if (!validator.isEmail(email)) {
            throw new BadRequestError_1.BadRequestError('Invalid Email address');
        }
        if (!validator.isMobilePhone(phone_number)) {
            throw new BadRequestError_1.BadRequestError('Invalid phone number');
        }
        if (!(type in UserType_1.UserType)) {
            throw new BadRequestError_1.BadRequestError('Invalid User Type. Allowed Types: ['
                + Object.keys(UserType_1.UserType) + ']');
        }
        const hashedPassword = await generateHash(password);
        const user = await UserGateway_1.default.getUserByEmail(email);
        if (user) {
            throw new ResourceExistsError_1.ResourceExistsError("Email " + email + " already in use.");
        }
        try {
            return await UserGateway_1.default.createUser(email, hashedPassword, first_name, last_name, phone_number, type);
        }
        catch (err) {
            throw new BadRequestError_1.BadRequestError(err.message);
        }
    }
    async login(email, password) {
        const user = await UserGateway_1.default.getUserByEmail(email);
        if (!user) {
            throw new ResourceNotFoundError_1.ResourceNotFoundError("No user was found with this email.");
        }
        const match = await compare(password, user.password_hash);
        if (!match) {
            throw new UnauthorizedError_1.UnauthorizedError("Password entered is incorrect.");
        }
        return await generateAuthToken(user);
    }
    async getUser(id) {
        try {
            return await UserGateway_1.default.getUserById(id);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map