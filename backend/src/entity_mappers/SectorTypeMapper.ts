import { ObjectMapper } from './ObjectMapper';
import { SectorType } from '../entities/SectorType';
import { SectorTypeDTO } from '../dtos/SectorTypeDTO';

class SectorTypeMapper implements ObjectMapper<SectorType, SectorTypeDTO> {

    toDTO(sectorType: SectorType) : SectorTypeDTO {
        var sectorTypeDTO : SectorTypeDTO = new SectorTypeDTO();
        sectorTypeDTO.type = sectorType.type;
        return sectorTypeDTO;
    }
}

export { SectorTypeMapper };
