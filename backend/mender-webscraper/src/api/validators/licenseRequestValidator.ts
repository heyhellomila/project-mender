/**
 * validateRbqNumber: A valid RBQ number is composed of 8 to 10 digits.
 * ex: 1234-5678-90 ||  1234567890  ||  1234-5678   ||  12345678
 */
export function validateRbqNumber(rbqNum: string): boolean {
    const regEx = new RegExp("(^[0-9]{4}-[0-9]{4}-[0-9]{2}$)|(^[0-9]{8,10}$)");

    return regEx.test(rbqNum);
}

/**
 * validateNeqId: A valid NEQ is composed of 10 digits.
 */
export function validateNeqId(neqId: string): boolean {
    const regEx = new RegExp("^[0-9]{10}$");

    return regEx.test(neqId);
}
