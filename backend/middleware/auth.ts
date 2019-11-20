import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import UserService from '../services/UserService';

const jwt = require('jsonwebtoken')
const User = require('../models/User')
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError')

const auth = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    const data = await jwt.verify(token, process.env.JWT_KEY, (err: any, result: any) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                res.status(401).json(new UnauthorizedError(err))
            }
            else {
                res.status(400).json(new BadRequestError(err));
            }
        } else {
            return result;
        }
    })
    try {
        const user = await UserService.getUser(data._id)

        if (!user) {
            throw new UnauthorizedError('Not authorized to access this resource');
        }
        req.body.user = user
        req.headers.token = token
        next()
    } catch (err) {
        res.status(401).json(err);
    }
}
module.exports = auth