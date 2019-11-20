import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import User from '../models/User';

class UserGateway {

    async getUserByEmail(email: string) {
        return await User.findOne({ email: email });
    }

    async getUserById(id: string) {
        const user = await User.findById(id);
        if (!user) {
            throw new ResourceNotFoundError("User with id " + id + " does not exist");
        }
        return user;
    }

    async createUser(email: string, password_hash: string, first_name: string, 
        last_name: string, phone_number: number, type: string) {
        const user = new User({
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
    }

    // async updateUserById(id, userObj) {
    //     try {
    //         return await User.update({ _id: id }, {
    //             $set: userObj,
    //         }, { runValidators: true });
    //     } catch (err) {
    //         throw new Error(err);
    //     }
    // }

}

export default new UserGateway();
