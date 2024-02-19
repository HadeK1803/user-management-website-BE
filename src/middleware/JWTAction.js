import jwt from 'jsonwebtoken';
require('dotenv').config();

const nonSecurePaths = ['/', '/register', '/login'];

const createToken = (payload) => {
    let key = process.env.JWT_SECRET;

    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

    } catch (err) {
        console.log(err);
    }
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

// Decode the token
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next();
    }
    let cookies = req.cookies;
    if (cookies && cookies.jwt_token) {
        let token = cookies.jwt_token;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated user',
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated user',
        })
    }
}

const checkUserPermission = async (req, res, next) => {
    // By pass the user if the path is non Secure path or '/account'
    if (nonSecurePaths.includes(req.path) || req.path === '/account') {
        return next();
    }

    if (req.user) {
        let email = req.user.email;
        let currentUrl = req.path;
        let roles = req.user.groupWithRoles.Roles;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't have permission to access this resource`,
            })
        }

        let canAccess = roles.some(item => item.url === currentUrl);
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't have permission to access this resource`,
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated user',
        })
    }

}
module.exports = {
    createToken,
    verifyToken,
    checkUserJWT,
    checkUserPermission
}