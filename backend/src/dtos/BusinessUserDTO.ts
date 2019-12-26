import { BusinessUserRoleDTO } from "./BusinessUserRoleDTO";
import { UserDTO } from "./UserDTO";
import { BusinessDTO } from "./BusinessDTO";

export class BusinessUserDTO {
    
    id: number;
    userRole: BusinessUserRoleDTO | string;
    user: UserDTO;
    business: BusinessDTO;
}
