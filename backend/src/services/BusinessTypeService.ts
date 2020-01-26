import { BusinessTypeRepository } from '../repositories/BusinessTypeRepository';
import { BusinessType as BusinessTypeEnum } from '../enums/BusinessType';
import { BusinessType } from '../entities/BusinessType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class BusinessTypeService {

    private businessTypeRepository : BusinessTypeRepository = new BusinessTypeRepository();

    async getBusinessType(type: string) {
        const businessTypeObj: BusinessType = await this.businessTypeRepository
            .getBusinessType(type);
        if (!businessTypeObj) {
            throw new ResourceNotFoundError('Invalid Type. Allowed Types: [' +
                `${Object.keys(BusinessTypeEnum)}]`);
        }
        return businessTypeObj;
    }
}

export { BusinessTypeService };
