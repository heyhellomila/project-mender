import { PropertySectorRepository } from '../repositories/PropertySectorRepository';
import { PropertySector } from '../entities/PropertySector';
import { Property } from '../entities/Property';
import { SectorService } from './SectorService';
import { ActivityStatus } from '../enums/ActivityStatus';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { PropertyService } from './PropertyService';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { Sector } from '../entities/Sector';

class PropertySectorService {

    private propertySectorRepository : PropertySectorRepository = new PropertySectorRepository();
    private sectorService : SectorService = new SectorService();
    private propertyService : PropertyService = new PropertyService();

    async createPropertySectors(propertyId: number, propertySectors: PropertySector[]) {
        const property : Property = await this.propertyService.getPropertyById(propertyId);
        const sectors : Sector[] = [];
        if (!property) {
            throw new ResourceNotFoundError(`Property with id ${propertyId} does not exist.`);
        }

        for (const propertySector of propertySectors) {
            propertySector.property = property;
            propertySector.sector = await this.sectorService.getSectorByKind(
                propertySector.sector.kind);
            propertySector.status = ActivityStatus.ACTIVE;
            sectors.push(propertySector.sector);
        }
        const savedPropertySectors : PropertySector[] = await this.propertySectorRepository
            .getPropertySectorsByPropertyAndSectors(property, sectors);

        if (savedPropertySectors.length > 0) {
            throw new ResourceExistsError(`The property with id ${property.id} ` +
                `already has the following sectors: [${savedPropertySectors.map(
                    savedPropertySector => savedPropertySector.sector.kind)}]`);
        }

        return await this.propertySectorRepository.save(propertySectors);
    }

    async getSectorsByPropertyId(propertyId: number) {
        const property : Property = await this.propertyService.getPropertyById(propertyId);
        return await this.propertySectorRepository.getSectorsByProperty(property);
    }

    // Assumes same property id for all sectors.
    async update(propertyId: number, propertySectors: PropertySector[]) {
        const property : Property = await this.propertyService.getPropertyById(propertyId);
        if (!property) {
            throw new ResourceNotFoundError(`Property with id ${propertyId} does not exist.`);
        }
        // Map of sector kind to property sector
        const propertySectorsMap : Map<string, PropertySector> = new Map();
        for (const propertySector of propertySectors) {
            propertySector.property = property;
            propertySector.sector = await this.sectorService.getSectorByKind(
                propertySector.sector.kind);
            propertySectorsMap.set(propertySector.sector.kind, propertySector);
        }

        const savedPropertySectors : PropertySector[] = await this.propertySectorRepository
            .getPropertySectorsByPropertyAndSectors(property, Array.from(propertySectorsMap
                .values()).map(propertySector => propertySector.sector));

        /*
        Cannot patch more objects than there actually are, so throw
        an error displaying missing sectors.
         */
        if (savedPropertySectors.length < propertySectors.length) {
            const missingSectorKinds : string[] = [];
            const savedSectorKinds : string[] = savedPropertySectors.map(savedPropertySector =>
                savedPropertySector.sector.kind);
            Array.from(propertySectorsMap.keys()).map((sectorKind) => {
                if (!savedSectorKinds.includes(sectorKind)) {
                    missingSectorKinds.push(sectorKind);
                }
            });
            throw new ResourceNotFoundError(`Sector kinds [${missingSectorKinds.toString()}] ` +
                `do not exist for property id ${propertyId}.`);
        }

        const updatedPropertySectors : PropertySector[] = savedPropertySectors
            .map((savedPropertySector) => {
                return this.merge(
                    savedPropertySector, propertySectorsMap.get(savedPropertySector.sector.kind));
            });
        return await this.propertySectorRepository.update(updatedPropertySectors);
    }

    private merge(savedPropertySector: PropertySector, updatedPropertySector : PropertySector) {
        return { ...savedPropertySector, ...updatedPropertySector };
    }
}

export { PropertySectorService };
