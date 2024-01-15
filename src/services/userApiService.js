import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

import { Op } from 'sequelize';

const getAllUsers = async () => {
    try {
        let users = [];
        users = await db.User.findAll({
            attributes: ["id", "email", "username", "address", "phone", "sex"],
            include: {
                model: db.Group,
                attributes: ["name", "description"],

            },
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
            EM: 'Something is wrong at service',
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
                attributes: ["name", "description"],
            },
            offset: offset,
            limit: limit

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
            EM: 'Something is wrong at service',
            EC: -2,
            DT: '',
        }
    }
}

const createNewUser = async (data) => {
    try {
        await db.User.create({

        })
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong at service',
            EC: -2,
            DT: '',
        }
    }
}

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id },
        })
        if (user) {
            //update
        } else {
            //not found
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong at service',
            EC: -2,
            DT: '',
        }
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: { id: id }
        })
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong at service',
            EC: -2,
            DT: '',
        }
    }
}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser, getUsersWithPagination
}