const HttpError = require('./HttpError');

class UnprocessableEntity extends HttpError {
    constructor(message) {
        super(message);
        this.statusCode = 422;
    }
}

module.exports = UnprocessableEntity;