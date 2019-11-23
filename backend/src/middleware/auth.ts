import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { UserService } from '../services/UserService';

const jwt = require('jsonwebtoken');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');
const userService : UserService = new UserService();

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
        var user = null;
        try {
            user = await userService.getUser(data.id)
        } catch(err) {
            throw new UnauthorizedError('Not authorized to access this resource');
        }

        req.body.requestUserId = user.id
        req.headers.token = token
        next()
    } catch (err) {
        res.status(401).json(err);
    }
}

export default auth;
