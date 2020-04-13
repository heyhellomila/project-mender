import { WorkOrderTypeRepository } from '../repositories/WorkOrderTypeRepository';
import { WorkOrderType as WorkOrderTypeEnum } from '../enums/WorkOrderType';
import { WorkOrderType } from '../entities/WorkOrderType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const workOrderTypeServiceLogger = getNewLogger('WorkOrderTypeService');

class WorkOrderTypeService {

    private workOrderTypeRepository : WorkOrderTypeRepository = new WorkOrderTypeRepository();

    constructor(workOrderTypeRepository ?: WorkOrderTypeRepository) {
        this.workOrderTypeRepository = workOrderTypeRepository
            ? workOrderTypeRepository : new WorkOrderTypeRepository();
    }

    async getWorkOrderType(type: string) {
        const workOrderType: WorkOrderType = await this.workOrderTypeRepository.
            getWorkOrderType(type);
        if (!workOrderType) {
            workOrderTypeServiceLogger.error(`404 ResourceNotFoundError - Invalid Work Order Type. Allowed Types: [
                ${Object.keys(WorkOrderTypeEnum)}]`);
            throw new ResourceNotFoundError(`Invalid Work Order Type. Allowed Types: [
                ${Object.keys(WorkOrderTypeEnum)}]`);
        }
        return workOrderType;
    }
}

export { WorkOrderTypeService };
