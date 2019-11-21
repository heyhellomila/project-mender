import { SectorType } from '../entities/SectorType';
import { Connection, getConnection } from 'typeorm';
import { BaseRepository } from './BaseRepository';

class SectorTypeRepository extends BaseRepository<SectorType> {

    async getSectorType(type: string) {
        return await this.getRepositoryConnection(SectorType).findOne({type: type});
    }
}

export { SectorTypeRepository };
