import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { BusinessType as BusinessTypeEnum } from '../enums/BusinessType';
import { BusinessRepository } from '../repositories/BusinessRepository';
import { BusinessTypeService } from './BusinessTypeService';
import { Business } from '../entities/Business';

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

    async businessExists(neq: number) {
        return await this.businessRepository.getBusinessByNEQ(neq);
    }

    async getBusinessById(id: number) {
        const business: Business = await this.businessRepository.getBusinessById(id);
        if (!business) {
            throw new ResourceNotFoundError(`Business with id ${id} does not exist`);
        }
        return business;
    }

    async createBusiness(business: Business) {
        if (!business.NEQ &&
            (business.name || business.businessType.type === BusinessTypeEnum.BUSINESS)) {
            throw new BadRequestError('Cannot provide business name or type \'BUSINESS\' without an NEQ.');
        }
        if (business.NEQ && await this.businessExists(business.NEQ)) {
            throw new ResourceExistsError(
                `A business with the NEQ ${business.NEQ} already exists.`);
        }
        business.businessType = await this.businessTypeService
            .getBusinessType(business.businessType.type);

        return await this.businessRepository.createBusiness(business);
    }
}

export { BusinessService };
