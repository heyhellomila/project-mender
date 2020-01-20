import { UserType } from '../../entities/UserType';

class UserTypeDataProvider {

    static getUserType(id: number, type: string) : UserType {
        const userType : UserType = new UserType();
        userType.id = id;
        userType.type = type;
        return userType;
    }
}

export { UserTypeDataProvider };
