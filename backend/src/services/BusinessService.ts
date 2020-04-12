import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { BusinessType as BusinessTypeEnum } from '../enums/BusinessType';
import { BusinessRepository } from '../repositories/BusinessRepository';
import { BusinessTypeService } from './BusinessTypeService';
import { Business } from '../entities/Business';
import { getNewLogger } from '../Log4jsConfig'

const businessServiceLogger = getNewLogger('BusinessService');

class BusinessService {

    private businessRepository: BusinessRepository;
    private businessTypeService: BusinessTypeService;

    constructor(businessRepository?: BusinessRepository,
                businessTypeService?: BusinessTypeService) {
        this.businessRepository = businessRepository
            ? businessRepository : new BusinessRepository();
        this.businessTypeService = businessTypeService
            ? businessTypeService : new BusinessTypeService();
    }

    async getBusinessByNeq(neq: number) {
        return await this.businessRepository.getBusinessByNEQ(neq);
    }

    async getBusinessById(id: number) {
        const business: Business = await this.businessRepository.getBusinessById(id);
        if (!business) {
            businessServiceLogger.error(`404 ResourceNotFoundError - Business with id ${id} does not exist`);
            throw new ResourceNotFoundError(`Business with id ${id} does not exist`);
        }
        return business;
    }

    async createBusiness(business: Business) {
        if (!business.NEQ &&
            (business.name || business.businessType.type === BusinessTypeEnum.BUSINESS)) {
            businessServiceLogger.error('400 BadRequestError - Cannot provide business name or type \'BUSINESS\' without an NEQ.');
            throw new BadRequestError('Cannot provide business name or type \'BUSINESS\' without an NEQ.');
        }
        if (business.NEQ && await this.getBusinessByNeq(business.NEQ)) {
            businessServiceLogger.error(`409 ResourceExistsError - A business with the NEQ ${business.NEQ} already exists.`);
            throw new ResourceExistsError(
                `A business with the NEQ ${business.NEQ} already exists.`);
        }
        business.businessType = await this.businessTypeService
            .getBusinessType(business.businessType.type);

        return await this.businessRepository.createBusiness(business);
    }
}

export { BusinessService };
