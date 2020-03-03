import { WorkOrderType } from '../../entities/WorkOrderType';

class WorkOrderTypeDataProvider {

    static getWorkOrderType() : WorkOrderType {
        return new WorkOrderType();
    }
}

export { WorkOrderTypeDataProvider };
