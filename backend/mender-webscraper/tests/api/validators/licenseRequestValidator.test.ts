import { validateNeqId, validateRbqNumber } from "../../../src/api/validators/licenseRequestValidator";

describe("The licenseRequestValidator tests", () => {
    describe("when validating NEQ ID", () => {
        test.each`
            neqId                | expected
            ${"1234567890"}      | ${true}
            ${"1172686546"}      | ${true}
            ${"5739-9032-01"}    | ${false}
            ${"asdf"}            | ${false}
            ${"3"}               | ${false}
            ${"123124235445345"} | ${false}
            ${"123kdj45j9"}      | ${false}
            ${""}                | ${false}
        `("should return $expected when NEQ ID is $neqId", ({ neqId, expected }) => {
            expect(validateNeqId(neqId)).toEqual(expected);
        });
    });
    describe("when validating RBQ number", () => {
        test.each`
            rbqNum                   | expected
            ${"5739-9032-01"}        | ${true}
            ${"5739903201"}          | ${true}
            ${"5"}                   | ${false}
            ${"123kdj45j9"}          | ${false}
            ${"1231423482945827545"} | ${false}
            ${"5739-asdf-01"}        | ${false}
            ${""}                    | ${false}
        `("should return $expected when RBQ number is $rbqNum", ({ rbqNum, expected }) => {
            expect(validateRbqNumber(rbqNum)).toEqual(expected);
        });
    });
});
