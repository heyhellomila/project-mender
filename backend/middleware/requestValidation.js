const UnprocessableEntity = require('../errors/UnprocessableEntity');

const validateBody = (parameters) => (req, res, next) => {
    var missingParameters = [];
    for(const parameter of parameters) {
        if(!req.body[parameter]) {
            missingParameters.push(parameter);
        }
    } 
    if (missingParameters.length > 0) {
        res.status(422).json(new UnprocessableEntity(
            `Request body missing [${missingParameters.toString()}].`))
    } else {
        next();
    }
}

module.exports = { validateBody };