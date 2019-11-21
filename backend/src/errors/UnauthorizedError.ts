import { HttpError } from './HttpError';

class UnauthorizedError extends HttpError {
    constructor(message: string) {
        super(message);
        this.statusCode = 401;
    }
}

export { UnauthorizedError };
