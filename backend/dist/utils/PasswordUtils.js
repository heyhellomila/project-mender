"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passwordValidator = require('password-validator');
exports.passwordValidator = passwordValidator;
var passwordValidator = new passwordValidator();
exports.passwordValidator = passwordValidator;
passwordValidator
    .is().min(8)
    .has().letters()
    .has().digits();
//# sourceMappingURL=PasswordUtils.js.map