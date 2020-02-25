export class PropertyTypeDTO {

    id: number;
    type: string;

    constructor(type? : string) {
        if (type) {
            this.type = type;
        }
    }
}
