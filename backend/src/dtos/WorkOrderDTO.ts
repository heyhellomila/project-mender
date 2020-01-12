import { PropertyDTO } from './PropertyDTO';
import { SectorDTO } from './SectorDTO';
import { WorkOrderTypeDTO } from './WorkOrderTypeDTO';
import { PriorityTypeDTO } from './PriorityTypeDTO';
import { WorkOrderStatusDTO } from './WorkOrderStatusDTO';
import { UserDTO } from './UserDTO';

export class WorkOrderDTO {
    id: number;
    property: PropertyDTO;
    sector: SectorDTO;
    sectorType: string;
    sectorKind: string;
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
    bookmarked: Boolean;
    workOrderStatus: WorkOrderStatusDTO | string;
}
