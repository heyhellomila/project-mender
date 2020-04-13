import { Response } from 'express';
import { HttpError } from '../errors/HttpError';
import { getNewLogger } from '../Log4jsConfig';

const httpUtilsLogger = getNewLogger('HttpUtils');

export const handleError = (err: Error, res: Response) => {
    if (err instanceof HttpError) {
        httpUtilsLogger.error(`${err.statusCode} ${err.name} - ${err.message}`);
        return res.status(err.statusCode).json(err);
    }
    httpUtilsLogger.error(`500 InternalServerError - ${err.message}`);
    return res.status(500).json(err);
};
