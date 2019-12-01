import {HttpError} from './HttpError';

class BadRequestError extends HttpError {
    constructor(message: string) {
        super(message);
        this.statusCode = 400;
    }
}

export {BadRequestError};
