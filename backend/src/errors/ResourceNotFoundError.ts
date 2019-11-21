import {HttpError} from './HttpError';

class ResourceNotFoundError extends HttpError {
    constructor(message: string) {
        super(message);
        this.statusCode = 404;
    }
}

export {ResourceNotFoundError};
