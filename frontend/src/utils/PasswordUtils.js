var PasswordValidator = require('password-validator');
 
var passwordValidator = new PasswordValidator();
 
passwordValidator.is().min(8).has().letters().has().digits();

module.exports = passwordValidator;
