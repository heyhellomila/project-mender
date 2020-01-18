import { WorkOrder } from '../../entities/WorkOrder';

class WorkOrderDataProvider {

    static getWorkOrder() : WorkOrder {
        const workOrder : WorkOrder = new WorkOrder();
        return workOrder;
    }
}

export { WorkOrderDataProvider };
