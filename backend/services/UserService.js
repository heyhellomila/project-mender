const User = require('../models/User');
const { generateHash, compare} = require('../utils/HashUtils');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ResourceExistsError = require('../errors/ResourceExistsError');
const BadRequestError = require('../errors/BadRequestError');
const generateAuthToken = require('../utils/AuthUtils');
const passwordValidator = require('../utils/PasswordUtils');
const DatabaseUtils = require('../utils/DatabaseUtils');

class UserService {

    async register(email, password, firstName, lastName, type) {
        if (!passwordValidator.validate(password)) {
            throw new BadRequestError('Password must be at least 8 characters' +  
                ' and must include at least one digit.')
        }
        const hashedPassword = await generateHash(password);
        const user = await DatabaseUtils.getUserByEmail(email);
        if (user) {
            throw new ResourceExistsError("Email " + email + " already in use.");
        }
        try {
            return await DatabaseUtils.saveUser(email, hashedPassword, firstName, lastName, type);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async login(email, password) {
        const user = await DatabaseUtils.getUserByEmail(email);
        if (!user) {
            throw new ResourceNotFoundError("No user was found with this email.");
        }
        const match = await compare(password, user.password_hash);
        if (!match) {
            throw new UnauthorizedError("Password entered is incorrect.");
        }
        return await generateAuthToken(user);
    }

    async getUser(id) {
        try {
            return await DatabaseUtils.getUserById(id);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserService