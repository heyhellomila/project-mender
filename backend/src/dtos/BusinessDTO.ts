import { BusinessTypeDTO } from "./BusinessTypeDTO";

export class BusinessDTO {
    
    id: number;
    NEQ: number;
    name: string;
    businessType: BusinessTypeDTO | string;
}