import { PropertySectorRepository } from '../repositories/PropertySectorRepository';
import { PropertySector } from '../entities/PropertySector';
import { BadRequestError } from '../errors/BadRequestError';
import { Property } from '../entities/Property';
import { SectorService } from './SectorService';
import { ActivityStatus } from '../enums/ActivityStatus';
import { Sector } from '../entities/Sector';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { PropertyService } from './PropertyService';

class PropertySectorService {

    private propertySectorRepository : PropertySectorRepository = new PropertySectorRepository();
    private sectorService : SectorService = new SectorService();
    private propertyService : PropertyService = new PropertyService();

    async createPropertySectors(propertyId: number, propertySectors: PropertySector[]) {
        try {
            const property : Property = await this.propertyService.getPropertyById(propertyId);
            if (!property) {
                throw new ResourceNotFoundError(`Property with id ${propertyId} does not exist.`);
            }

            for (const propertySector of propertySectors) {
                propertySector.property = property;
                propertySector.sector = await this.sectorService.getSectorByKind(
                    propertySector.sector.kind);
                propertySector.status = ActivityStatus.ACTIVE;
            }

            const filteredList : PropertySector[] = await this
                .removeExistentPropertySectorsFromList(propertySectors);

            if (filteredList.length === 0) {
                throw new BadRequestError('Property already includes all listed sectors.');
            }
            return await this.propertySectorRepository.save(filteredList);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }


    async getSectorsByProperty(property: Property) {
        return await this.propertySectorRepository.getSectorsByProperty(property);
    }

    async update(id: number, propertySector: PropertySector) {

        if (Object.keys(propertySector).length === 0) {
            throw new BadRequestError('Object must include at least one parameter.');
        }

        const savedPropertySector : PropertySector = await this.getPropertySectorById(id);
        if (!savedPropertySector) {
            throw new ResourceNotFoundError(`Property sector id ${id} does not exist.`);
        }

        return await this.propertySectorRepository.update(id, propertySector);
    }

    async getPropertySectorById(id: number) {
        return await this.propertySectorRepository.getPropertySectorById(id);
    }

    // Assumes the property is same for each property sector in the list.
    private async removeExistentPropertySectorsFromList(propertySectors: PropertySector[]) {
        const savedPropertySectors : PropertySector[] = await this
            .getSectorsByProperty(propertySectors[0].property);
        console.log(savedPropertySectors);
        const savedSectors : number[] = [];

        savedPropertySectors.forEach((savedPropertySector) => {
            savedSectors.push(savedPropertySector.sector.id);
        });

        const filteredList : PropertySector[] = [];

        propertySectors.forEach((propertySector) => {
            if (savedSectors.indexOf(propertySector.sector.id) === -1) {
                filteredList.push(propertySector);
            }
        });

        return filteredList;
    }
}

export { PropertySectorService };
