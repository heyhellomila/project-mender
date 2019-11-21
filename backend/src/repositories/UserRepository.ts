import { User } from '../entities/User';
import { UserType } from "../entities/UserType";
import { Connection, getConnection } from 'typeorm';

class UserRepository {

    async getUserByEmail(email: string) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(User);
        return await repository.findOne({email: email});
    }

    async getUserById(id: number) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(User);
        const user = await repository.findOne({id: id});
        return user;
    }

    async createUser(email: string, passwordHash: string, firstName: string, 
        lastName: string, phoneNumber: number, userType: UserType) {

        const connection : Connection = getConnection();
        const repository = connection.getRepository(User);
        const user = new User();
        user.email = email;
        user.passwordHash = passwordHash;
        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        user.userType = userType;
        try {
            return await repository.save(user);
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateUserById(id: number, user: User) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(User);
        await repository.update({id: id}, user);
    }
}

export { UserRepository };
