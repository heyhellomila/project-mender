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
    
    async createUser(email, password_hash, first_name, last_name, phone_number, type) {
        user = new User({
            email: email,
            password_hash: password_hash,
            first_name: first_name,
            last_name: last_name,
            phone_number,
            type: type
        });
        try {
            return await user.save();
        } catch (err) {
            throw new Error(err);
        }
    },

    async updateUser(id, email, password_hash, first_name, last_name, phone_number, type) {
        user = this.getUserById(id);
        try {
            return await User.updateOne({id: id},
                {
                    $set: {
                        email: email,
                        password_hash: password_hash,
                        first_name: first_name,
                        last_name: last_name,
                        phone_number: phone_number,
                        type: type
                    }
                }
                );
        } catch (err) {
            throw new Error(err);
        } 
    }
    
}

module.exports = UserGateway;