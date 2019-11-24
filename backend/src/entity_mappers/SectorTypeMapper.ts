import { ObjectMapper } from './ObjectMapper';
import { SectorType } from '../entities/SectorType';
import { SectorTypeDTO } from '../dtos/SectorTypeDTO';
import { SectorType as SectorTypeEnum } from '../enums/SectorType';
import { BadRequestError } from '../errors/BadRequestError';

class SectorTypeMapper implements ObjectMapper<SectorType, SectorTypeDTO> {

    toDTO(sectorType: SectorType) : SectorTypeDTO {
        var sectorTypeDTO : SectorTypeDTO = new SectorTypeDTO();
        sectorTypeDTO.type = sectorType.type;
        return sectorTypeDTO;
    }

    fromDTO(sectorTypeDTO: SectorTypeDTO) : SectorType {
        var sectorType : SectorType = new SectorType();
        if (!(sectorTypeDTO.type in SectorTypeEnum)) {
            throw new BadRequestError('Invalid Sector Type. Allowed Types: [' 
                + Object.keys(SectorTypeEnum) +']');
        }
        sectorType.type = sectorTypeDTO.type;
        return sectorType;
    }
}

export { SectorTypeMapper };
