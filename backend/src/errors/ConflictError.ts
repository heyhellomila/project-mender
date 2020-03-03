import { HttpError } from './HttpError';

class ConflictError extends HttpError {
    constructor(message: string) {
        super(message);
        this.statusCode = 409;
    }
}

export { ConflictError };