import { ActivityStatusDTO } from "./ActivityStatusDTO";
import { PropertyTypeDTO } from "./PropertyTypeDTO";
import { UserDTO } from "./UserDTO";

export class PropertyDTO {
    
    id: number;
    user: UserDTO;
    propertyType: PropertyTypeDTO | string;
    name: string;
    address: string;
    activityStatus: ActivityStatusDTO | string;
}
