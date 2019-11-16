const User = require('../models/User');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError')

const DatabaseUtils = {

    async getUserByEmail(email) {
        return await User.findOne({email: email});
    },

    async getUserById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new ResourceNotFoundError("User with id " + id + " does not exist");
        }
        return user;
    },
    
    async saveUser(email, passwordHash, firstName, lastName, type) {
        user = new User({
            email: email,
            passwordHash: passwordHash,
            firstName: firstName,
            lastName: lastName,
            type: type
        });
        try {
            return await user.save();
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = DatabaseUtils;