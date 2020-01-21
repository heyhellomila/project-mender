import { WorkOrder } from '../../entities/WorkOrder';
import { SectorDataProvider } from './SectorDataProvider';
import { SectorType } from '../../enums/SectorType';
import { SectorKind } from '../../enums/SectorKind';
import { PriorityTypeDataProvider } from './PriorityTypeDataProvider';
import { PriorityType } from '../../enums/PriorityType';
import { WorkOrderTypeDataProvider } from './WorkOrderTypeDataProvider';
import { WorkOrderStatusDataProvider } from './WorkOrderStatusDataProvider';

class WorkOrderDataProvider {

    static getWorkOrder() : WorkOrder {
        const workOrder : WorkOrder = new WorkOrder();
        return workOrder;
    }
    static getWorkOrderPopulated(id: number) : WorkOrder {
        const workOrder : WorkOrder = new WorkOrder();
        workOrder.id = id;
        workOrder.sector = SectorDataProvider.getSector(1, SectorType.EXTERIOR, SectorKind.ROOF);
        workOrder.priorityType = PriorityTypeDataProvider.getPriorityType(1, PriorityType.HIGH);
        workOrder.workOrderType = WorkOrderTypeDataProvider.getWorkOrderType();
        workOrder.workOrderStatus = WorkOrderStatusDataProvider.getWorkOrderStatus();
        return workOrder;
    }
}

export { WorkOrderDataProvider };
