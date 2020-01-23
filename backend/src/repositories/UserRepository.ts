import { User } from '../entities/User';
import { BaseRepository } from './BaseRepository';
import { FindOptions } from 'typeorm';

class UserRepository extends BaseRepository<User> {

    async getUserByEmail(email: string) {
        return await this.getRepositoryConnection(User).findOne({ email });
    }

    async getUserById(id: number, fieldOptions?: FindOptions<User>) {
        const user = await this.getRepositoryConnection(User)
            .findOne(id, fieldOptions);
        return user;
    }

    async createUser(user: User) {
        return await this.getRepositoryConnection(User).save(user);
    }

    async updateUserById(id: number, user: User) {
        await this.getRepositoryConnection(User).update({ id }, user);
    }
}

export { UserRepository };
