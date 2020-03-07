import { HttpError } from './HttpError';

class ResourceExistsError extends HttpError {
    constructor(message: string) {
        super(message);
        this.statusCode = 409;
    }
}

export { ResourceExistsError };
