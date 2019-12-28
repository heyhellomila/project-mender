import HttpException from "./HttpException";

export default class InvalidRbqNumberException extends HttpException {
    constructor(rbqNum: string) {
        super(
            400,
            `RBQ number: ${rbqNum} is invalid. Please enter a valid RBQ number, composed of 8 to 10 digits.`
        );
    }
}
