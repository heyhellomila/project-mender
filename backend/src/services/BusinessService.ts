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

    async getBusiness(id: number) {
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
}

export { BusinessService };
