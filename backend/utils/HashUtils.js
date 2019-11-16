const bcrypt = require('bcrypt');
const saltRounds = 10;

async function generateHash(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err)
            resolve(hash);
        });
    });
    
    return hashedPassword
}

async function compare(unhashed, hashed) {
    const match = await new Promise((resolve, reject) => {
        bcrypt.compare(unhashed, hashed, function(err, res) {
            if (err) reject(err)
            resolve(res)
        });
    });
    
    return match;
}

module.exports = {generateHash, compare};