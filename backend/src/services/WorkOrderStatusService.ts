import { WorkOrderStatusRepository } from '../repositories/WorkOrderStatusRepository';
import { WorkOrderStatusEnum } from '../enums/WorkOrderStatusEnum';
import { WorkOrderStatus } from '../entities/WorkOrderStatus';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

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
            throw new ResourceNotFoundError(`Invalid Work Order Status. Allowed Statuses: [
                ${Object.keys(WorkOrderStatusEnum)}]`);
        }
        return workOrderStatus;
    }
}

export { WorkOrderStatusService };
