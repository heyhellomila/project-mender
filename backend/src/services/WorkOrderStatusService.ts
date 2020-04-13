import { WorkOrderStatusRepository } from '../repositories/WorkOrderStatusRepository';
import { WorkOrderStatus as WorkOrderStatusEnum } from '../enums/WorkOrderStatusEnum';
import { WorkOrderStatus } from '../entities/WorkOrderStatus';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const workOrderStatusServiceLogger = getNewLogger('WorkOrderStatusService');

class WorkOrderStatusService {

    private workOrderStatusRepository : WorkOrderStatusRepository = new WorkOrderStatusRepository();

    constructor(workOrderStatusRepository?: WorkOrderStatusRepository) {
        this.workOrderStatusRepository = workOrderStatusRepository
            ? workOrderStatusRepository : new WorkOrderStatusRepository();
    }

    async getWorkOrderStatus(status: string) {
        const workOrderStatus: WorkOrderStatus = await this.workOrderStatusRepository.
            getWorkOrderStatus(status);
        if (!workOrderStatus) {
            workOrderStatusServiceLogger.error(`404 ResourceNotFoundError - Invalid Work Order Status. Allowed Statuses: [
                ${Object.keys(WorkOrderStatusEnum)}]`);
            throw new ResourceNotFoundError(`Invalid Work Order Status. Allowed Statuses: [
                ${Object.keys(WorkOrderStatusEnum)}]`);
        }
        return workOrderStatus;
    }
}

export { WorkOrderStatusService };
