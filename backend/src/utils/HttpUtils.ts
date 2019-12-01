import { Response } from 'express';
import { HttpError } from '../errors/HttpError';

export const handleError = (err: HttpError, res: Response) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
};
