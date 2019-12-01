import { WorkOrderTypeRepository } from '../repositories/WorkOrderTypeRepository';
import { WorkOrderType as WorkOrderTypeEnum } from '../enums/WorkOrderType';
import { WorkOrderType } from '../entities/WorkOrderType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class WorkOrderTypeService {

    private workOrderTypeRepository : WorkOrderTypeRepository = new WorkOrderTypeRepository();

    async getWorkOrderType(type: string) {
        const workOrderType: WorkOrderType = await this.workOrderTypeRepository.getWorkOrderType(type);
        if (!workOrderType) {
            throw new ResourceNotFoundError('Invalid Work Order Type. Allowed Types: [' 
                + Object.keys(WorkOrderTypeEnum) +']');
        }
        return workOrderType;
    }
}

export { WorkOrderTypeService };
