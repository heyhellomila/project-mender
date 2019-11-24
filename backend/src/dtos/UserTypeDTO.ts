export class UserTypeDTO {
    
    id: number;
    type: string;

    constructor(type? : string) {
        if (type) {
            this.type = type;
        }
    }
}
