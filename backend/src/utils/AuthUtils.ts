import * as jwt from 'jsonwebtoken';
import { User } from 'src/entities/User';
require('dotenv/config');

class AuthUtils {

    async generateAuthToken(user: User) {
        const token = await new Promise((resolve, reject) => {
            jwt.sign(
                { userId: user.id },
                process.env.JWT_KEY,
                { expiresIn: '24h' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    return resolve(token);
                },
            );
        });
        return token;
    }
}

export { AuthUtils };
