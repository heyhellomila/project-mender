import HttpException from "./HttpException";

export default class InvalidNeqIdException extends HttpException {
    constructor(neqId: string) {
        super(400, `NEQ ID: ${neqId} is invalid. Please enter a valid NEQ, composed of 10 digits.`);
    }
}
