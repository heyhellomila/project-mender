class HttpError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 500;
        this.errorMessage = message;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = HttpError;