import { UserTypeDTO } from "./UserTypeDTO";

export class UserDTO {
    
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    userType: UserTypeDTO | string;
}
