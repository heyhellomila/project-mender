import { Request, Response, NextFunction } from 'express';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

export const validateBody = (parameters: any) => (
    req: Request, res: Response, next: NextFunction) => {
    const missingParameters = new Set();
    let errorString = '';
    if (Array.isArray(req.body)) {
        for (const object of req.body) {
            for (const parameter of parameters) {
                if (!object[parameter]) {
                    missingParameters.add(parameter);
                }
            }
        }
        errorString = 'At least one request object is missing parameter ' +
            `[${Array.from(missingParameters).toString()}].`;
    } else {
        for (const parameter of parameters) {
            if (!req.body[parameter]) {
                missingParameters.add(parameter);
            }
        }
        errorString = `Request body missing [${Array.from(missingParameters).toString()}].`;
    }
    if (missingParameters.size > 0) {
        res.status(422).json(new UnprocessableEntity(errorString));
    } else {
        next();
    }
};
