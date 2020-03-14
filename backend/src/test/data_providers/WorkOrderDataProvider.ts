import { WorkOrder } from '../../entities/WorkOrder';
import { SectorDataProvider } from './SectorDataProvider';
import { SectorType } from '../../enums/SectorType';
import { SectorKind } from '../../enums/SectorKind';
import { PriorityTypeDataProvider } from './PriorityTypeDataProvider';
import { PriorityType } from '../../enums/PriorityType';
import { WorkOrderTypeDataProvider } from './WorkOrderTypeDataProvider';
import { WorkOrderStatusDataProvider } from './WorkOrderStatusDataProvider';
import { WorkOrderType } from '../../enums/WorkOrderType';
import { BusinessUser } from '../../entities/BusinessUser';
import { Business } from '../../entities/Business';

class WorkOrderDataProvider {

    static getWorkOrder(id: number) : WorkOrder {
        const workOrder : WorkOrder = new WorkOrder();
        workOrder.id = id;
        return workOrder;
    }
    static getWorkOrderPopulated(id: number) : WorkOrder {
        const workOrder : WorkOrder = new WorkOrder();
        workOrder.id = id;
        workOrder.sector = SectorDataProvider.getSector(1, SectorType.EXTERIOR, SectorKind.ROOF);
        workOrder.priorityType = PriorityTypeDataProvider.getPriorityType(1, PriorityType.HIGH);
        workOrder.workOrderType = WorkOrderTypeDataProvider.getWorkOrderType();
        workOrder.workOrderType.type = WorkOrderType.PM;
        workOrder.workOrderStatus = WorkOrderStatusDataProvider.getWorkOrderStatus();
        workOrder.contractedBy = new BusinessUser();
        workOrder.contractedBy.id = 1;
        workOrder.contractedBy.business = new Business();
        workOrder.contractedBy.business.id = 1;
        workOrder.title = 'test title';
        workOrder.cause = 'test cause';
        workOrder.serviceNeeded = false;
        workOrder.dueDate = new Date();
        workOrder.dateCompleted = new Date();
        workOrder.priceEstimate = 1;
        workOrder.actualCost = 1;
        workOrder.bookmarked = false;
        workOrder.location = 'test location';
        workOrder.emergency = false;
        workOrder.notification = 'test notification';
        return workOrder;
    }
}

export { WorkOrderDataProvider };
