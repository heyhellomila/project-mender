import { Business } from '../../entities/Business';
import { User } from '../../entities/User';
import { BusinessUser } from '../../entities/BusinessUser';
import { BusinessUserRole } from '../../entities/BusinessUserRole';

class BusinessUserDataProvider {

    static getBusinessUser(id: number, business: Business, user: User) : BusinessUser;
    static getBusinessUser(id: number, business: Business, user: User,
                           businessUserRole: BusinessUserRole) : BusinessUser;

    static getBusinessUser(id: number, business: Business, user: User,
                           businessUserRole?: BusinessUserRole) : BusinessUser {
        const businessUser : BusinessUser = new BusinessUser();
        businessUser.id = id;
        businessUser.business = business;
        businessUser.user = user;
        businessUser.businessUserRole = businessUserRole;
        return businessUser;
    }

    static getBusinessUserWithoutId(business: Business, user: User,
                                    businessUserRole?: BusinessUserRole) : BusinessUser {
        const businessUser : BusinessUser = new BusinessUser();
        businessUser.business = business;
        businessUser.user = user;
        businessUser.businessUserRole = businessUserRole;
        return businessUser;
    }
}

export { BusinessUserDataProvider };
