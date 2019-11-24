import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderDTO } from '../dtos/WorkOrderDTO';
import { ObjectMapper } from './ObjectMapper';

class WorkOrderMapper implements ObjectMapper<WorkOrder, WorkOrderDTO> {

    toDTO(workOrder: WorkOrder) : WorkOrderDTO {
        var workOrderDTO : WorkOrderDTO = new WorkOrderDTO();
        workOrderDTO.id = workOrder.id;
        workOrderDTO.propertyId = workOrder.propertyId;
        workOrderDTO.sectorType = workOrder.sectorType.type;
        workOrderDTO.workOrderType = workOrder.workOrderType.type;
        workOrderDTO.title = workOrder.title;
        workOrderDTO.cause = workOrder.cause;
        workOrderDTO.serviceNeeded = workOrder.serviceNeeded;
        workOrderDTO.priorityType = workOrder.priorityType.type;
        workOrderDTO.description = workOrder.description;
        workOrderDTO.dueDate = workOrder.dueDate;
        workOrderDTO.createdDate = workOrder.createdDate;
        workOrderDTO.createdByUserId = workOrder.createdByUserId;
        workOrderDTO.lastModifiedDate = workOrder.lastModifiedDate;
        workOrderDTO.lastModifiedByUserId = workOrder.lastModifiedByUserId;
        workOrderDTO.dateCompleted = workOrder.dateCompleted;
        workOrderDTO.priceEstimate = workOrder.priceEstimate;
        workOrderDTO.actualCost = workOrder.actualCost;
        return workOrderDTO;
    }
}

export { WorkOrderMapper };
