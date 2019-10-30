const HttpError = require('./HttpError');

class UnauthorizedError extends HttpError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

module.exports = UnauthorizedError;