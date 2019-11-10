var passwordValidator = require('password-validator');
 
var passwordValidator = new passwordValidator();
 
passwordValidator
.is().min(8)
.has().letters()
.has().digits()

module.exports = passwordValidator;
