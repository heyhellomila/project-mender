import { StatusRepository } from '../repositories/StatusRepository';
import { Status as StatusEnum } from '../enums/Status';
import { Status } from '../entities/Status';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class StatusService {

    private statusRepository : StatusRepository = new StatusRepository();

    async getStatus(status: string) {
        const statusObj: Status = await this.statusRepository.getStatus(status);
        if (!statusObj) {
            throw new ResourceNotFoundError('Invalid Status. Allowed Types: [' 
                + Object.keys(StatusEnum) +']');
        }
        return statusObj;
    }
}

export { StatusService };
