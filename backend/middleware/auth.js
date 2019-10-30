const jwt = require('jsonwebtoken')
const User = require('../models/User')
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError')

const auth = async(req, res, next) => {
    const token = req.header('Authorization');
    const data = await jwt.verify(token, process.env.JWT_KEY, (err, result) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                res.status(401).json(new UnauthorizedError(err))
            }
            else {
                res.status(400).json(new BadRequestError(err));
            }
        } else {
            return result;
        }
    })
    try {
        const user = await User.findOne({ _id: data._id})
        if (!user) {
            throw new UnauthorizedError('Not authorized to access this resource');
        }
        req.user = user
        req.token = token
        next()
    } catch (err) {
        res.status(401).json(err);
    }
}
module.exports = auth