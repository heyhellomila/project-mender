import { Sector } from '../../entities/Sector';

class SectorDataProvider {

    static getSector(id: number, type: string, kind: string) : Sector {
        const sector : Sector = new Sector();
        sector.id = id;
        sector.type = type;
        sector.kind = kind;
        return sector;
    }
}

export { SectorDataProvider };
