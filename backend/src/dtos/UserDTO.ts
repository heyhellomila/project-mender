import { UserTypeDTO } from './UserTypeDTO';

export class UserDTO {

    id: number;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    userType: UserTypeDTO | string;

    constructor(id? : number) {
        if (id) {
            this.id = id;
        }
    }
}
