"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserService_1 = __importDefault(require("../services/UserService"));
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');
const userController = express_1.default.Router();
exports.userController = userController;
const loginFields = ['email', 'password'];
const registerFields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'type'];
userController.post('/', validateBody(registerFields), async (req, res) => {
    try {
        const { email, password, first_name, last_name, phone_number, type } = req.body;
        const user = await UserService_1.default.register(email, password, first_name, last_name, phone_number, type);
        return res.status(200).json(user);
    }
    catch (err) {
        return handleError(err, res);
    }
});
userController.post('/login', validateBody(loginFields), async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await UserService_1.default.login(email, password);
        return res.status(200).json({ token });
    }
    catch (err) {
        return handleError(err, res);
    }
});
userController.get('/:id', auth, async (req, res) => {
    try {
        const user = await UserService_1.default.getUser(req.params.id);
        return res.status(200).json(user);
    }
    catch (err) {
        return handleError(err, res);
    }
});
//# sourceMappingURL=UserController.js.map