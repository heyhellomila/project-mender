import { ObjectMapper } from './ObjectMapper';
import { Sector } from '../entities/Sector';
import { SectorDTO } from '../dtos/SectorDTO';
import { SectorType as SectorTypeEnum } from '../enums/SectorType';
import { SectorKind as SectorKindEnum } from '../enums/SectorKind';
import { BadRequestError } from '../errors/BadRequestError';

class SectorMapper implements ObjectMapper<Sector, SectorDTO> {

    toDTO(sectorType: Sector) : SectorDTO {
        const sectorDTO : SectorDTO = new SectorDTO();
        sectorDTO.type = sectorType.type;
        sectorDTO.kind = sectorType.kind;
        return sectorDTO;
    }

    fromDTO(sectorDTO: SectorDTO) : Sector {
        const sector : Sector = new Sector();
        if (!(sectorDTO.kind in SectorKindEnum)) {
            throw new BadRequestError('Invalid Sector Kind. Allowed Types: [' +
                `${Object.keys(SectorKindEnum)}]`);
        }
        sector.kind = sectorDTO.kind;
        return sector;
    }
}

export { SectorMapper };
