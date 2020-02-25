import { WorkOrderQuery } from '../../enums/WorkOrderQueryEnum';
import { SectorType } from '../../enums/SectorType';
import { SectorKind } from '../../enums/SectorKind';
import { WorkOrderType } from '../../enums/WorkOrderType';
import { PriorityType } from '../../enums/PriorityType';
import { WorkOrderStatus } from '../../enums/WorkOrderStatusEnum';

class WorkOrderQueryDataProvider {

    static getWorkOrderQuery(pageSize: string, pageNumber: string) : Map<string, string> {
        const queryMap = new Map<string, string>();
        queryMap.set(WorkOrderQuery.PAGESIZE, pageSize);
        queryMap.set(WorkOrderQuery.PAGENUMBER, pageNumber);
        queryMap.set(WorkOrderQuery.ORDERING, 'DESC');
        queryMap.set(WorkOrderQuery.PROPERTYID, '1');
        queryMap.set(WorkOrderQuery.SECTORTYPE, SectorType.APPLIANCES);
        queryMap.set(WorkOrderQuery.SECTORKIND, SectorKind.DISHWASHER);
        queryMap.set(WorkOrderQuery.WORKORDERTYPE, WorkOrderType.PM);
        queryMap.set(WorkOrderQuery.SERVICENEEDED, 'true');
        queryMap.set(WorkOrderQuery.PRIORITYTYPE, PriorityType.MEDIUM);
        queryMap.set(WorkOrderQuery.PRICEESTIMATE, '0');
        queryMap.set(WorkOrderQuery.BOOKMARKED, 'false');
        queryMap.set(WorkOrderQuery.WORKORDERSTATUS, WorkOrderStatus.OPEN_FOR_QUOTE);
        queryMap.set(WorkOrderQuery.GREATERTHAN, 'priceEstimate');
        queryMap.set(WorkOrderQuery.GREATERTHANVALUE, '0');
        queryMap.set(WorkOrderQuery.LOWERTHAN, 'priceEstimate');
        queryMap.set(WorkOrderQuery.LOWERTHANVALUE, '50');
        queryMap.set(WorkOrderQuery.SORTBY, 'dueDate');
        return queryMap;
    }
}

export { WorkOrderQueryDataProvider };
