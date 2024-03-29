import { PropertyDTO } from './PropertyDTO';
import { SectorDTO } from './SectorDTO';
import { WorkOrderTypeDTO } from './WorkOrderTypeDTO';
import { PriorityTypeDTO } from './PriorityTypeDTO';
import { WorkOrderStatusDTO } from './WorkOrderStatusDTO';
import { UserDTO } from './UserDTO';
import { BusinessUserDTO } from './BusinessUserDTO';

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
    emergency: Boolean;
    priorityType: PriorityTypeDTO | string;
    location: string;
    notification: string;
    dueDate: Date;
    createdDate: Date;
    createdBy: UserDTO;
    contractedBy: BusinessUserDTO;
    lastModifiedDate: Date;
    lastModifiedBy: UserDTO;
    dateCompleted: Date;
    priceEstimate: number;
    actualCost: number;
    bookmarked: Boolean;
    workOrderStatus: WorkOrderStatusDTO | string;
}
