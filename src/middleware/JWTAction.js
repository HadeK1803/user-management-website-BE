import jwt from 'jsonwebtoken';
require('dotenv').config();

const createJWT = () => {
    let payload = {
        name: 'Tran Khang',
        address: 'Dong Nai',
    }
    let key = process.env.JWT_SECRET;

    let token = null;
    try {
        token = jwt.sign(payload, key);

    } catch (err) {
        console.log(err);
    }
    console.log(token);
    return token;
}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decoded;
}
module.exports = {
    createJWT,
    verifyToken

}