import { User } from '../../entities/User';

class UserDataProvider {

    static getUser(id: number) : User {
        const user : User = new User();
        user.id = id;
        return user;
    }
}

export { UserDataProvider };