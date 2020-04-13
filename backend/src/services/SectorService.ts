import { SectorRepository } from '../repositories/SectorTypeRepository';
import { SectorKind as SectorKindEnum } from '../enums/SectorKind';
import { Sector } from '../entities/Sector';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const sectorServiceLogger = getNewLogger('SectorService');

class SectorService {

    private sectorRepository : SectorRepository = new SectorRepository();

    constructor(sectorRepository?: SectorRepository) {
        this.sectorRepository = sectorRepository
            ? sectorRepository : new SectorRepository();
    }

    async getSectorByKind(kind: string) {
        const sector: Sector = await this.sectorRepository.getSectorByKind(kind);
        if (!sector) {
            sectorServiceLogger.error(`404 ResourceNotFoundError - Invalid Sector Kind. Allowed Types: [
                ${Object.keys(SectorKindEnum)}]`);
            throw new ResourceNotFoundError(`Invalid Sector Kind. Allowed Types: [
                ${Object.keys(SectorKindEnum)}]`);
        }
        return sector;
    }
}

export { SectorService };
