import * as jwt from 'jsonwebtoken';
import { User } from 'src/entities/User';
require('dotenv/config');

async function generateAuthToken(user: User) {
    const token = await new Promise((resolve, reject) => {
        jwt.sign({userId: user.id}, process.env.JWT_KEY, { expiresIn: '24h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            return resolve(token);
        });
    });
    return token;
}

async function validateToken(token: string) {
    const validated = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(decoded);
        });
    })
    return validated;
}

module.exports = generateAuthToken, validateToken;
