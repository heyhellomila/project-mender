const HttpError = require('./HttpError');

class ResourceNotFoundError extends HttpError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

module.exports = ResourceNotFoundError;