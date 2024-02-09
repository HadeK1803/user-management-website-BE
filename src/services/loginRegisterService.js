require("dotenv").config();

import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

import { Op } from 'sequelize';

import { getGroupWithRoles } from './JWTService';

import { createToken } from '../middleware/JWTAction';

const hashUserPassword = (password) => {
    let hashedPassword = bcrypt.hashSync(password, salt);
    // let isHashed = bcrypt.compareSync(password, hashedPassword); // true
    // console.log(isHashed);
    return hashedPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}

const handleRegister = async (rawUserData) => {
    try {
        //check email/phone are existed
        let isEmailExisted = await checkEmailExist(rawUserData.email);
        if (isEmailExisted === true) {
            return {
                EM: 'The email already exists',
                EC: 3,
                DT: '',
            }
        }
        let isPhoneExisted = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExisted === true) {
            return {
                EM: 'The phone already exists',
                EC: 3,
                DT: '',
            }
        }
        //hash user password
        let hashedPassword = hashUserPassword(rawUserData.password);

        //create a new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashedPassword,
            groupId: 6 // default group is guess
        });
        return {
            EM: 'A new user has been created',
            EC: 0,
            DT: '',
        }

    }
    catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong at service',
            EC: -2,
            DT: '',
        }
    }
}

const checkHashPassword = (inputPassword, hashedPassword) => {
    return bcrypt.compareSync(inputPassword, hashedPassword); // true or false
}
const handleLoginUser = async (rawUserData) => {
    try {
        //Check email/phone are existed
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawUserData.valueLogin },
                    { phone: rawUserData.valueLogin }
                ]
            },
            raw: true
        })

        if (user) {
            // console.log(">>> Found user with email/phone: ", rawUserData.valueLogin);
            //check password
            let isCorrectPassword = checkHashPassword(rawUserData.password, user.password);

            if (isCorrectPassword) {
                // console.log(" >>> Login sucessfully with password: ", rawUserData.password);

                //Get roles of this user

                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN,
                }

                //Create token
                let token = createToken(payload);
                return {
                    EM: 'Login succesfully',
                    EC: 0,
                    DT: {
                        accessToken: token,
                        // Add group with roles into data return to make React handle this easily. 
                        // Even it is included of payload (token)
                        groupWithRoles
                    },
                }
            }
            else {
                console.log(" >>> Login failed with password: ", rawUserData.password);
            }
        }
        else {
            console.log("User not found with email/phone: ", rawUserData.valueLogin);
        }
        return {
            EM: 'Your email/phone or password is incorrect!',
            EC: 4,
            DT: '',
        }
        //Login user

    }
    catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong at service',
            EC: -2,
            DT: '',
        }
    }
}
module.exports = {
    handleRegister: handleRegister,
    handleLoginUser: handleLoginUser
}