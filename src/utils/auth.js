const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    return token;
}

module.exports = {
    generateToken
};