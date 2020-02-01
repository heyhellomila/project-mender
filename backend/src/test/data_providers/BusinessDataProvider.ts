import { Business } from '../../entities/Business';
import { BusinessType } from '../../entities/BusinessType';
import { BusinessTypeDataProvider } from './BusinessTypeDataProvider';

class BusinessDataProvider {

    static getBusiness(id: number, neq: number) : Business;
    static getBusiness(id: number, neq: number, businessType: string) : Business;
    static getBusiness(id: number, neq: number, businessType: BusinessType) : Business;

    static getBusiness(id: number, neq: number, businessType?: string | BusinessType) : Business {
        const business : Business = new Business();
        business.id = id;
        business.NEQ = neq;
        if (typeof businessType === 'string') {
            business.businessType = BusinessTypeDataProvider.getBusinessType(null, businessType);
        } else {
            business.businessType = businessType;
        }
        return business;
    }
}

export { BusinessDataProvider };
