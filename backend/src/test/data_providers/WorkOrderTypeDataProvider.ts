import { WorkOrderType } from '../../entities/WorkOrderType';

class WorkOrderTypeDataProvider {

    static getWorkOrderType() : WorkOrderType {
        const workOrderType : WorkOrderType = new WorkOrderType();
        return workOrderType;
    }
}

export { WorkOrderTypeDataProvider };
