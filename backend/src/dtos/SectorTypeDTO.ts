export class SectorTypeDTO {
    
    id: number;
    type: string;

    constructor(type? : string) {
        if (type) {
            this.type = type;
        }
    }
}
