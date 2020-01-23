import { UserTypeRepository } from '../repositories/UserTypeRepository';
import { UserType as UserTypeEnum } from '../enums/UserType';
import { UserType } from '../entities/UserType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class UserTypeService {

    private userTypeRepository : UserTypeRepository = new UserTypeRepository();

    async getUserType(type: string) {
        const userType: UserType = await this.userTypeRepository.getUserType(type);
        if (!userType) {
            throw new ResourceNotFoundError('Invalid User Type. Allowed Types: [' +
                ` ${Object.keys(UserTypeEnum)}]`);
        }
        return userType;
    }
}

export { UserTypeService };
