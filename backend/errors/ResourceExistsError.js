const HttpError = require('./HttpError');

class ResourceExistsError extends HttpError {
    constructor(message) {
        super(message);
        this.statusCode = 409;
    }
}

module.exports = ResourceExistsError;