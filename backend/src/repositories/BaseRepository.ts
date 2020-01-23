import { getConnection, Connection } from 'typeorm';

class BaseRepository<Model> {

    getRepositoryConnection(MODEL: new () => Model) {
        const connection : Connection = getConnection();
        return connection.getRepository(MODEL);
    }
}

export { BaseRepository };
