import { getConnection, Connection } from "typeorm";
import { User } from "../entities/User";

class BaseRepository<Model> {

    getRepositoryConnection(Model: new () => Model) {
        const connection : Connection = getConnection();
        return connection.getRepository(Model);
    }
}

export { BaseRepository };
