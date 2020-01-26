import * as bcrypt from 'bcryptjs';

class HashUtils {
    private saltRounds : number = 10;

    async generateHash(password: string) {
        return await new Promise((resolve, reject) => {
            bcrypt.hash(password, this.saltRounds, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    }

    async compare(unHashed: string, hashed: string) {
        return await new Promise((resolve, reject) => {
            bcrypt.compare(unHashed, hashed, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
}

export { HashUtils };
