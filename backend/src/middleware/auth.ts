import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { UserService } from '../services/UserService';
import { getNewLogger } from '../Log4jsConfig'

const authLogger = getNewLogger('AuthMiddleware');

const jwt = require('jsonwebtoken');
// tslint:disable-next-line:variable-name
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');
const userService : UserService = new UserService();

const auth = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    const data = await jwt.verify(token, process.env.JWT_KEY, (err: any, result: any) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                res.status(401).json(new UnauthorizedError(err));
            } else {
                res.status(400).json(new BadRequestError(err));
            }
        } else {
            return result;
        }
    });
    try {
        try {
            await userService.getUser(data.userId);
        } catch (err) {
            authLogger.error('401 UnauthorizedError - Not authorized to access this resource');
            throw new UnauthorizedError('Not authorized to access this resource');
        }

        req.body.decodedToken = data;
        next();
    } catch (err) {
        res.status(401).json(err);
    }
};

export default auth;
