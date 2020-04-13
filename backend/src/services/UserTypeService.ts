import { UserTypeRepository } from '../repositories/UserTypeRepository';
import { UserType as UserTypeEnum } from '../enums/UserType';
import { UserType } from '../entities/UserType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const userTypeServiceLogger = getNewLogger('UserTypeService');

class UserTypeService {

    private userTypeRepository : UserTypeRepository = new UserTypeRepository();

    constructor(userTypeRepository?: UserTypeRepository) {
        this.userTypeRepository = userTypeRepository
            ? userTypeRepository : new UserTypeRepository();
    }

    async getUserType(type: string) {
        const userType: UserType = await this.userTypeRepository.getUserType(type);
        if (!userType) {
            userTypeServiceLogger.error(`404 ResourceNotFoundError - Invalid User Type. Allowed Types: [
                ${Object.keys(UserTypeEnum)}]`);
            throw new ResourceNotFoundError(`Invalid User Type. Allowed Types: [
                ${Object.keys(UserTypeEnum)}]`);
        }
        return userType;
    }
}

export { UserTypeService };
