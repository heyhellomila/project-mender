import { PropertyDTO } from "./PropertyDTO";
import { SectorTypeDTO } from "./SectorTypeDTO";
import { WorkOrderTypeDTO } from "./WorkOrderTypeDTO";
import { PriorityTypeDTO } from "./PriorityTypeDTO";
import { UserDTO } from "./UserDTO";

export class WorkOrderDTO {
    
    id: number;
    property: PropertyDTO;
    sectorType: SectorTypeDTO | string;
    workOrderType: WorkOrderTypeDTO | string;
    title: string;
    cause: string;
    serviceNeeded: Boolean;
    priorityType: PriorityTypeDTO | string;
    description: string;
    dueDate: Date;
    createdDate: Date;
    createdBy: UserDTO;
    lastModifiedDate: Date
    lastModifiedBy: UserDTO;
    dateCompleted: Date;
    priceEstimate: number;
    actualCost: number;

}
