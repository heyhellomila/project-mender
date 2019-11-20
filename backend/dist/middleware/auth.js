"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequestError_1 = require("../errors/BadRequestError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const UserService_1 = __importDefault(require("../services/UserService"));
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');
const auth = async (req, res, next) => {
    const token = req.header('Authorization');
    const data = await jwt.verify(token, process.env.JWT_KEY, (err, result) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                res.status(401).json(new UnauthorizedError_1.UnauthorizedError(err));
            }
            else {
                res.status(400).json(new BadRequestError_1.BadRequestError(err));
            }
        }
        else {
            return result;
        }
    });
    try {
        const user = await UserService_1.default.getUser(data._id);
        if (!user) {
            throw new UnauthorizedError_1.UnauthorizedError('Not authorized to access this resource');
        }
        req.body.user = user;
        req.headers.token = token;
        next();
    }
    catch (err) {
        res.status(401).json(err);
    }
};
module.exports = auth;
//# sourceMappingURL=auth.js.map