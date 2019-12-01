import { Request, Response, NextFunction } from 'express';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

export const validateBody = (parameters: any) => (
    req: Request, res: Response, next: NextFunction) => {
    const missingParameters = [];
    for (const parameter of parameters) {
        if (!req.body[parameter]) {
            missingParameters.push(parameter);
        }
    }
    if (missingParameters.length > 0) {
        res.status(422).json(new UnprocessableEntity(
            `Request body missing [${missingParameters.toString()}].`));
    } else {
        next();
    }
};

export const validateArrayBody = (parameters: any) => (
    req: Request, res: Response, next: NextFunction) => {
    const missingParameters = new Set();
    for (const object of req.body) {
        for (const parameter of parameters) {
            if (!object[parameter]) {
                missingParameters.add(parameter);
            }
        }
    }
    if (missingParameters.size > 0) {
        res.status(422).json(new UnprocessableEntity(
            'At least one request object is missing parameter ' +
                `[${Array.from(missingParameters).toString()}].`));
    } else {
        next();
    }
}
