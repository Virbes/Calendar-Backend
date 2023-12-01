const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    const secretKey = process.env.SECRET_JWT_SEED;
    const payload = { uid, name };
    const options = { expiresIn: '2h' };

    return jwt.sign(payload, secretKey, options); // Token generated
}


module.exports = { generateJWT };