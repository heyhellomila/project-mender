import { HttpError } from './HttpError';

class UnprocessableEntity extends HttpError {
    constructor(message: string) {
        super(message);
        this.statusCode = 422;
    }
}

export { UnprocessableEntity };
