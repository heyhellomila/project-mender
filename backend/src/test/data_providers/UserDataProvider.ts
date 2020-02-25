import { User } from '../../entities/User';
import { UserType } from '../../entities/UserType';
import { UserTypeDataProvider } from './UserTypeDataProvider';

class UserDataProvider {

    static getUser(id: number) : User;
    static getUser(id: number, email: string, userType: string) : User;
    static getUser(id: number, email: string, userType: UserType, passwordHash: string) : User;
    static getUser(id: number, email: string, userType: string, passwordHash: string,
                   firstName: string, lastName: string, phoneNumber: number,
                   password: string, confirmPassword: string): User;

    static getUser(id: number, email?: string, userType?: UserType | string,
                   passwordHash?: string, firstName?: string, lastName?: string,
                   phoneNumber?: number, password?: string, confirmPassword?: string) : User {
        const user : User = new User();
        user.id = id;
        user.email = email;
        if (typeof userType === 'string') {
            user.userType = UserTypeDataProvider.getUserType(null, userType);
        } else {
            user.userType = userType;
        }
        user.passwordHash = passwordHash;
        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        user.password = password;
        user.confirmPassword = confirmPassword;
        return user;
    }

    static getUserWithEmailAndPasswordHash(id: number, email: string, passwordHash: string) : User {
        const user : User = new User();
        user.id = id;
        user.email = email;
        user.passwordHash = passwordHash;
        return user;
    }

    static getUserWithEmail(id: number, email: string) : User {
        const user : User = new User();
        user.id = id;
        user.email = email;
        return user;
    }

    static getUserWithPasswordHash(id: number, passwordHash: string) : User {
        const user : User = new User();
        user.id = id;
        user.passwordHash = passwordHash;
        return user;
    }

    static getUpdatedUserWithoutId(
        email: string, userType: UserType, passwordHash: string, firstName: string,
        lastName: string, phoneNumber: number): User {
        const user : User = new User();
        user.email = email;
        user.userType = userType;
        user.passwordHash = passwordHash;
        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        return user;
    }

    static getUserWithType(id: number, type: string) {
        const user : User = new User();
        user.id = id;
        user.userType = UserTypeDataProvider.getUserType(null, type);
        return user;
    }
}

export { UserDataProvider };
