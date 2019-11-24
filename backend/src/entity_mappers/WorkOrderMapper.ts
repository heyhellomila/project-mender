import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderDTO } from '../dtos/WorkOrderDTO';
import { ObjectMapper } from './ObjectMapper';
import { PropertyMapper } from './PropertyMapper';
import { UserMapper } from './UserMapper';
import { SectorTypeMapper } from './SectorTypeMapper';
import { WorkOrderTypeMapper } from './WorkOrderTypeMapper';
import { PriorityTypeMapper } from './PriorityTypeMapper';
import { SectorTypeDTO } from '../dtos/SectorTypeDTO';
import { WorkOrderTypeDTO } from '../dtos/WorkOrderTypeDTO';
import { PriorityTypeDTO } from '../dtos/PriorityTypeDTO';
import { exists } from 'fs';

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

    fromDTO(workOrderDTO: WorkOrderDTO) : WorkOrder {
        var workOrder : WorkOrder = new WorkOrder();

        workOrder.id = workOrderDTO.id;
        workOrder.title = workOrderDTO.title;
        workOrder.cause = workOrderDTO.cause;
        workOrder.serviceNeeded = workOrderDTO.serviceNeeded;
        workOrder.description = workOrderDTO.description;
        workOrder.dueDate = new Date(Number(workOrderDTO.dueDate));
        workOrder.createdDate = workOrderDTO.createdDate;
        workOrder.dateCompleted = workOrderDTO.dateCompleted;
        workOrder.priceEstimate = workOrderDTO.priceEstimate;
        workOrder.actualCost = workOrderDTO.actualCost;

        if (workOrderDTO.sectorType) {
            workOrder.sectorType = this.sectorTypeMapper.fromDTO(
                new SectorTypeDTO(workOrderDTO.sectorType as string));
        }
        if (workOrderDTO.workOrderType) {
            workOrder.workOrderType = this.workOrderTypeMapper.fromDTO(
                new WorkOrderTypeDTO(workOrderDTO.workOrderType as string));
        }
        if (workOrderDTO.priorityType) {
            workOrder.priorityType = this.priorityTypeMapper.fromDTO(
                new PriorityTypeDTO(workOrderDTO.priorityType as string));
        }  

        return workOrder;
    }
}

export { WorkOrderMapper };
