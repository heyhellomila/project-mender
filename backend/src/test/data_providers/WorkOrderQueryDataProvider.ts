import { WorkOrderQuery } from '../../enums/WorkOrderQueryEnum';

class WorkOrderQueryDataProvider {

    static getWorkOrderQuery(pageSize: string, pageNumber: string) : Map<string, string> {
        const queryMap = new Map<string, string>();
        queryMap.set(WorkOrderQuery.PAGESIZE, pageSize);
        queryMap.set(WorkOrderQuery.PAGENUMBER, pageNumber);
        queryMap.set(WorkOrderQuery.ORDERING, 'DESC');
        return queryMap;
    }
}

export { WorkOrderQueryDataProvider };
