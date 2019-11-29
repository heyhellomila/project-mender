import { PropertyDTO } from './PropertyDTO';
import { SectorDTO } from './SectorDTO';

export class PropertySectorDTO {

    id: number;
    property: PropertyDTO;
    sector: SectorDTO;
    sectorKind: string;
}
