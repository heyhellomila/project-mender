import { Sector } from '../entities/Sector';
import { BaseRepository } from './BaseRepository';

class SectorRepository extends BaseRepository<Sector> {

    async getSectorByKind(kind: string) {
        return await this.getRepositoryConnection(Sector).findOne({
            kind,
        });
    }
}

export { SectorRepository };
