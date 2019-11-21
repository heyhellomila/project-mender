export class PropertyDTO {
    
    id: number;
    userId: number;
    propertyType: string;
    name: string;
    address: string;
    status: string;

    constructor(propertyType: string, name: string, address: string, 
        status: string, id?: number, userId?: number) {

        this.id = id;
        this.userId = userId;
        this.propertyType = propertyType;
        this.name = name;
        this.address  = address;
        this.status = status;
    }
}
