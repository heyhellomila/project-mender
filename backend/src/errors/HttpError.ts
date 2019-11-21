class HttpError extends Error {

    statusCode: number;
    errorMessage: string;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 500;
        this.errorMessage = message;
    }
}

export {HttpError};
