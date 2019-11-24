import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderDTO } from '../dtos/WorkOrderDTO';
import { ObjectMapper } from './ObjectMapper';
import { PropertyMapper } from './PropertyMapper';
import { UserMapper } from './UserMapper';
import { SectorTypeMapper } from './SectorTypeMapper';
import { WorkOrderTypeMapper } from './WorkOrderTypeMapper';
import { PriorityTypeMapper } from './PriorityTypeMapper';

class WorkOrderMapper implements ObjectMapper<WorkOrder, WorkOrderDTO> {

    private propertyMapper : PropertyMapper = new PropertyMapper();
    private sectorTypeMapper : SectorTypeMapper = new SectorTypeMapper();
    private workOrderTypeMapper : WorkOrderTypeMapper = new WorkOrderTypeMapper();
    private priorityTypeMapper : PriorityTypeMapper = new PriorityTypeMapper();
    private userMapper : UserMapper = new UserMapper();

    toDTO(workOrder: WorkOrder) : WorkOrderDTO {
        var workOrderDTO : WorkOrderDTO = new WorkOrderDTO();
        workOrderDTO.id = workOrder.id;
        if (workOrder.property) {
            workOrderDTO.property = this.propertyMapper.toDTO(workOrder.property)
        }
        if (workOrder.sectorType) {
            workOrderDTO.sectorType = this.sectorTypeMapper.toDTO(workOrder.sectorType);
        }
        if (workOrder.workOrderType) {
            workOrderDTO.workOrderType = this.workOrderTypeMapper.toDTO(workOrder.workOrderType);
        }
        workOrderDTO.title = workOrder.title;
        workOrderDTO.cause = workOrder.cause;
        workOrderDTO.serviceNeeded = workOrder.serviceNeeded;
        if (workOrder.priorityType) {
            workOrderDTO.priorityType = this.priorityTypeMapper.toDTO(workOrder.priorityType);
        }
        workOrderDTO.description = workOrder.description;
        workOrderDTO.dueDate = workOrder.dueDate;
        workOrderDTO.createdDate = workOrder.createdDate;
        if (workOrder.createdBy) {
            workOrderDTO.createdBy = this.userMapper.toDTO(workOrder.createdBy)
        }       
        workOrderDTO.lastModifiedDate = workOrder.lastModifiedDate;
        if (workOrder.lastModifiedBy) {
            workOrderDTO.lastModifiedBy = this.userMapper.toDTO(workOrder.lastModifiedBy);
        }
        workOrderDTO.dateCompleted = workOrder.dateCompleted;
        workOrderDTO.priceEstimate = workOrder.priceEstimate;
        workOrderDTO.actualCost = workOrder.actualCost;
        return workOrderDTO;
    }
}

export { WorkOrderMapper };
