import { BusinessTypeRepository } from '../repositories/BusinessTypeRepository';
import { BusinessType as BusinessTypeEnum } from '../enums/BusinessType';
import { BusinessType } from '../entities/BusinessType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const businessTypeServiceLogger = getNewLogger('BusinessTypeService');

class BusinessTypeService {

    private businessTypeRepository : BusinessTypeRepository;

    constructor(businessTypeRepository?: BusinessTypeRepository) {
        this.businessTypeRepository = businessTypeRepository
            ? businessTypeRepository : new BusinessTypeRepository();
    }

    async getBusinessType(type: string) {
        const businessTypeObj: BusinessType = await this.businessTypeRepository
            .getBusinessType(type);
        if (!businessTypeObj) {
            businessTypeServiceLogger.error('404 ResourceNotFoundError - Invalid Type. Allowed Types: [' +
                `${Object.keys(BusinessTypeEnum)}]`);
            throw new ResourceNotFoundError('Invalid Type. Allowed Types: [' +
                `${Object.keys(BusinessTypeEnum)}]`);
        }
        return businessTypeObj;
    }
}

export { BusinessTypeService };
