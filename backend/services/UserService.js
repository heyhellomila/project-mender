const User = require('../models/User');
const { generateHash, compare} = require('../utils/HashUtils');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ResourceExistsError = require('../errors/ResourceExistsError');
const BadRequestError = require('../errors/BadRequestError');
const generateAuthToken = require('../utils/AuthUtils');

class UserService {

    async register(email, password, firstName, lastName, type) {
        const hashedPassword = await generateHash(password);
        var user = await User.findOne({email: email});
        if (user) {
            throw new ResourceExistsError("Email already in use.");
        }
        user = new User({
            email: email,
            passwordHash: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            type: type
        });
        try {
            return await user.save();
        } catch (err) {
            throw new BadRequestError(err);
        }
    }

    async login(email, password) {
        const user = await User.findOne({email: email});
        if (!user) {
            throw new ResourceNotFoundError("No user was found with this email.");
        }
        const match = await compare(password, user.get("passwordHash"));
        if (!match) {
            throw new UnauthorizedError("Password entered is incorrect.");
        }
        return await generateAuthToken(user);
    }

    async getUser(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new ResourceNotFoundError("User with id " + id + " does not exist");
        }
        else {
            return user;
        }
    }
}

module.exports = UserService