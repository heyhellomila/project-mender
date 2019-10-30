const jwt = require('jsonwebtoken')
require('dotenv/config');

async function generateAuthToken(user) {
    const token = await new Promise((resolve, reject) => {
        jwt.sign({_id: user.get("_id")}, process.env.JWT_KEY, { expiresIn: '24h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            return resolve(token);
        });
    });
    return token;
}

async function validateToken(token) {
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