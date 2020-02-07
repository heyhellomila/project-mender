import { BusinessType } from '../../entities/BusinessType';

class BusinessTypeDataProvider {

    static getBusinessType(id: number, type: string) : BusinessType {
        const businessType : BusinessType = new BusinessType();
        businessType.id = id;
        businessType.type = type;
        return businessType;
    }
}

export { BusinessTypeDataProvider };
