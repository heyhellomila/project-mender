import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { BusinessType as BusinessTypeEnum } from '../enums/BusinessType';
import { BusinessRepository } from '../repositories/BusinessRepository';
import { BusinessType } from '../entities/BusinessType';
import { BusinessTypeService } from './BusinessTypeService';
import { Business } from '../entities/Business';

class BusinessService {

    private businessRepository: BusinessRepository = new BusinessRepository();
    private businessTypeService: BusinessTypeService = new BusinessTypeService();

    async businessExists(neq: number) {
        const business: Business = await this.businessRepository.getBusinessByNEQ(neq);
        if (!business) {
            return false;
        } else {
            return true;
        }
    }

    async getBusinessById(id: number) {
        const business: Business = await this.businessRepository.getBusinessById(id);
        if (!business) {
            throw new ResourceNotFoundError("Business with id " + id + " does not exist");
        } 
        return business;
    }

    async getBusinessByNEQ(neq: number) {
        const business: Business = await this.businessRepository.getBusinessByNEQ(neq);
        if (!business) {
            throw new ResourceNotFoundError("Business with NEQ " + neq + " does not exist");
        } 
        return business;
    }

    async createBusiness(business: Business) {

        if (!business.NEQ && (business.name || business.businessType.type == BusinessTypeEnum.BUSINESS)) {
            throw new BadRequestError("Cannot provide business name or type 'BUSINESS' without an NEQ.")
        }
        if (this.businessExists(business.NEQ)) {
            throw new BadRequestError("A business with the NEQ " + business.NEQ + " aready exists.")
        }
        business.businessType = await this.businessTypeService.getBusinessType(business.businessType.type);

        try {
            return await this.businessRepository.createBusiness(business);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { BusinessService };
