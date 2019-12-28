export class LicenseTypeDTO {
    
    id: number;
    type: string;

    constructor(type? : string) {
        if (type) {
            this.type = type;
        }
    }
}
