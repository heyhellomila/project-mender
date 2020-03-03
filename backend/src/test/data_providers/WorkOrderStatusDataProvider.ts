import { WorkOrderStatus } from '../../entities/WorkOrderStatus';

class WorkOrderStatusDataProvider {

    static getWorkOrderStatus() : WorkOrderStatus {
        return new WorkOrderStatus();
    }
}

export { WorkOrderStatusDataProvider };
