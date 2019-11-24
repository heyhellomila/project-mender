import { SectorTypeRepository } from '../repositories/SectorTypeRepository';
import { SectorType as SectorTypeEnum } from '../enums/SectorType';
import { SectorType } from '../entities/SectorType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class SectorTypeService {

    private sectorTypeRepository : SectorTypeRepository = new SectorTypeRepository();

    async getSectorType(type: string) {
        const sectorType: SectorType = await this.sectorTypeRepository.getSectorType(type);
        if (!sectorType) {
            throw new ResourceNotFoundError('Invalid Sector type. Allowed Types: [' 
                + Object.keys(SectorTypeEnum) +']');
        }
        return sectorType;
    }
}

export { SectorTypeService };
