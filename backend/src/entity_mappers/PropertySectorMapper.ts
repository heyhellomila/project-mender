import { ObjectMapper } from './ObjectMapper';
import { Sector } from '../entities/Sector';
import { SectorDTO } from '../dtos/SectorDTO';
import { SectorType as SectorTypeEnum } from '../enums/SectorType';
import { SectorKind as SectorKindEnum } from '../enums/SectorKind';
import { BadRequestError } from '../errors/BadRequestError';
import {PropertySector} from "../entities/PropertySector";
import {PropertySectorDTO} from "../dtos/PropertySectorDTO";
import {PropertyMapper} from "./PropertyMapper";
import {SectorMapper} from "./SectorTypeMapper";

class PropertySectorMapper implements ObjectMapper<PropertySector, PropertySectorDTO> {

    private propertyMapper : PropertyMapper = new PropertyMapper();
    private sectorMapper : SectorMapper = new SectorMapper();

    toDTO(propertySector: PropertySector) : PropertySectorDTO {

        const propertySectorDTO : PropertySectorDTO = new PropertySectorDTO();
        propertySectorDTO.id = propertySector.id;
        if (propertySector.property) {
            propertySectorDTO.property = this.propertyMapper.toDTO(propertySector.property);
        }
        if (propertySector.sector) {
            propertySectorDTO.sector = this.sectorMapper.toDTO(propertySector.sector);
        }
        return propertySectorDTO;
    }

    fromDTO(propertySectorDTO: PropertySectorDTO) : PropertySector {
        const propertySector : PropertySector = new PropertySector();
        if (propertySectorDTO.sectorKind) {
            propertySector.sector = this.sectorMapper.fromDTO(
                new SectorDTO(propertySectorDTO.sectorKind));
        }
        return propertySector;
    }
}

export { PropertySectorMapper };
