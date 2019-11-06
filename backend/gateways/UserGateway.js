const User = require('../models/User');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError')

const UserGateway = {

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
    
    async createUser(email, passwordHash, firstName, lastName, type) {
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
    },

    async updateUser(id, email, passwordHash, firstName, lastName, type) {
        user = this.getUserById(id);
        try {
            return await User.updateOne({id: id},
                {
                    $set: {
                        email: email,
                        passwordHash: passwordHash,
                        firstName: firstName,
                        lastName: lastName,
                        type: type
                    }
                }
                );
        } catch (err) {
            throw new Error(err);
        } 
    },

    async deleteUser(id) {
        try {
            return await User.deleteOne({id: id});
        } catch (err) {
            throw new Error(err);
        }
    }
    
}

module.exports = UserGateway