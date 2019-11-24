import { User } from '../entities/User';
import { UserType } from '../entities/UserType';
import { BaseRepository } from './BaseRepository';
import { UserFields } from './FindOptionsFields';
import { FindOptions } from 'typeorm';

class UserRepository extends BaseRepository<User> {

    async getUserByEmail(email: string) {
        return await this.getRepositoryConnection(User).findOne({email: email});
    }

    async getUserById(id: number, fieldOptions?: FindOptions<User>) {
        const user = await this.getRepositoryConnection(User).findOne(id, 
            fieldOptions);
        return user;
    }

    async createUser(email: string, passwordHash: string, firstName: string, 
        lastName: string, phoneNumber: number, userType: UserType) {

        const user = new User();
        user.email = email;
        user.passwordHash = passwordHash;
        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        user.userType = userType;
        try {
            return await this.getRepositoryConnection(User).save(user);
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateUserById(id: number, user: User) {
        await this.getRepositoryConnection(User).update({id: id}, user);
    }
}

export { UserRepository };
