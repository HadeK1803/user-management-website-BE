import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

import { Op } from 'sequelize';

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
const getAllUsers = async () => {
    try {
        let users = [];
        users = await db.User.findAll({
            attributes: ["id", "email", "username", "address", "phone", "sex"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
                where: {
                    [Op.not]: [
                        { id: 7 },
                    ]
                },
            },
            order: [['id', 'DESC']],
            // raw: true,
            // nest: true
        });
        return {
            EM: "Get all users successfully",
            EC: 0,
            DT: users
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: '',
        }
    }
}

const getUsersWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        let { count, rows } = await db.User.findAndCountAll({
            attributes: ["id", "email", "username", "address", "phone", "sex"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
                where: {
                    [Op.not]: [
                        { id: 7 },
                    ]
                },
            },
            offset: offset,
            limit: limit,
            order: [['id', 'DESC']],

        });
        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: "Get users with pagination successfully",
            EC: 0,
            DT: data
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: '',
        }
    }
}

const createNewUser = async (data) => {
    try {
        // Check missing parameters
        if (!data.email || !data.phone || !data.password) {
            return {
                EM: 'Missed required parameters',
                EC: 1,
                DT: [],
            }
        }
        //check email/phone are existed
        let isEmailExisted = await checkEmailExist(data.email);
        if (isEmailExisted === true) {
            return {
                EM: 'The email already exists',
                EC: 2,
                DT: 'email',
            }
        }
        // check email is correct format
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(data.email)) {
            return {
                EM: 'The email is incorrect format',
                EC: 3,
                DT: 'email',
            }
        }
        let isPhoneExisted = await checkPhoneExist(data.phone);
        if (isPhoneExisted === true) {
            return {
                EM: 'The phone already exists',
                EC: 2,
                DT: 'phone',
            }
        }
        if (!data.password || data.password.length < 8) {
            return {
                EM: 'Password must have at least 8 characters',
                EC: 4,
                DT: 'password',
            }
        }
        //hash user password
        let hashedPassword = hashUserPassword(data.password);

        //create a new user 
        await db.User.create({
            ...data,
            password: hashedPassword,
        });
        return {
            EM: 'Created new user successfully',
            EC: 0,
            DT: [],
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: [],
        }
    }
}

const updateUser = async (data) => {
    try {
        //Check group 
        if (!data.groupId) {
            return {
                EM: 'Empty group',
                EC: 5,
                DT: 'group',
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id },
        })
        if (user) {
            //update
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
            })
            return {
                EM: 'Updated user successfully',
                EC: 0,
                DT: '',
            }
        } else {
            //not found
            return {
                EM: 'User not found',
                EC: 5,
                DT: 'group',
            }
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: '',
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await db.User.destroy({
                where: { id: id }
            })
            return {
                EM: "User deleted successfully",
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: "User not found",
                EC: 5,
                DT: '',
            }
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: '',
        }
    }
}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser, getUsersWithPagination
}