import { SectorType } from '../entities/SectorType';
import { Connection, getConnection } from 'typeorm';

class SectorTypeRepository {

    async getSectorType(type: string) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(SectorType);
        return await repository.findOne({type: type});
    }
}

export { SectorTypeRepository };
