import { ObjectMapper } from './ObjectMapper';
import { SectorDTO } from '../dtos/SectorDTO';
import { PropertySector } from '../entities/PropertySector';
import { PropertySectorDTO } from '../dtos/PropertySectorDTO';
import { PropertyMapper } from './PropertyMapper';
import { SectorMapper } from './SectorTypeMapper';
import { ActivityStatusMapper } from './ActivityStatusMapper';
import { ActivityStatusDTO } from '../dtos/ActivityStatusDTO';

class PropertySectorMapper implements ObjectMapper<PropertySector, PropertySectorDTO> {

    private propertyMapper : PropertyMapper = new PropertyMapper();
    private sectorMapper : SectorMapper = new SectorMapper();
    private activityStatusMapper : ActivityStatusMapper = new ActivityStatusMapper();

    toDTO(propertySector: PropertySector) : PropertySectorDTO {

        const propertySectorDTO : PropertySectorDTO = new PropertySectorDTO();
        propertySectorDTO.id = propertySector.id;
        if (propertySector.property) {
            propertySectorDTO.property = this.propertyMapper.toDTO(propertySector.property);
        }
        if (propertySector.sector) {
            propertySectorDTO.sector = this.sectorMapper.toDTO(propertySector.sector);
        }
        propertySectorDTO.status = propertySector.status;
        return propertySectorDTO;
    }

    fromDTO(propertySectorDTO: PropertySectorDTO) : PropertySector {
        const propertySector : PropertySector = new PropertySector();
        if (propertySectorDTO.sectorKind) {
            propertySector.sector = this.sectorMapper.fromDTO(
                new SectorDTO(propertySectorDTO.sectorKind));
        }
        if (propertySectorDTO.status) {
            propertySector.status = this.activityStatusMapper.fromDTO(
                new ActivityStatusDTO(propertySectorDTO.status)).status;
        }
        return propertySector;
    }
}

export { PropertySectorMapper };
