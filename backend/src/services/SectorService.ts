import { SectorRepository } from '../repositories/SectorTypeRepository';
import { SectorKind as SectorKindEnum } from '../enums/SectorKind';
import { Sector } from '../entities/Sector';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class SectorService {

    private sectorRepository : SectorRepository = new SectorRepository();

    async getSectorByKind(kind: string) {
        const sector: Sector = await this.sectorRepository.getSectorByKind(kind);
        if (!sector) {
            throw new ResourceNotFoundError(`Invalid Sector Kind. Allowed Types: [
                ${Object.keys(SectorKindEnum)}]`);
        }
        return sector;
    }
}

export { SectorService };
