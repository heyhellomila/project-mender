import { WorkOrderStatus } from '../../entities/WorkOrderStatus';

class WorkOrderStatusDataProvider {

    static getWorkOrderStatus() : WorkOrderStatus {
        const workOrderStatus : WorkOrderStatus = new WorkOrderStatus();
        return workOrderStatus;
    }
}

export { WorkOrderStatusDataProvider };
