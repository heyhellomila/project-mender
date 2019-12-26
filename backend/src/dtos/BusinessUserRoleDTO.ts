export class BusinessUserRoleDTO {
    
    id: number;
    role: string;

    constructor(role? : string) {
        if (role) {
            this.role = role;
        }
    }
}
