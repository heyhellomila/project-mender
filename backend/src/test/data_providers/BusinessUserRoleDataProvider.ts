import { BusinessUserRole } from '../../entities/BusinessUserRole';

class BusinessUserRoleDataProvider {

    static getBusinessUserRole(id: number, role: string) : BusinessUserRole {
        const businessUserRole : BusinessUserRole = new BusinessUserRole();
        businessUserRole.id = id;
        businessUserRole.role = role;
        return businessUserRole;
    }
}

export { BusinessUserRoleDataProvider };
