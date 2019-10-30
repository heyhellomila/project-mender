const HttpError = require('../errors/HttpError');

function handleError(err, res) {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json(err);
    } else {
        return res.status(500).json(err);
    }
}

module.exports = { handleError };