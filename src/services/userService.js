import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const mysql = require('mysql2/promise');

import db from '../models/index.js';

// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');

const hashUserPassword = (password) => {
    let hashedPassword = bcrypt.hashSync(password, salt);
    // let isHashed = bcrypt.compareSync(password, hashedPassword); // true
    // console.log(isHashed);
    return hashedPassword;
}

const createNewUser = async (email, username, password) => {

    let hashedUserPassword = hashUserPassword(password);
    try {
        await db.User.create({
            email: email,
            username: username,
            password: hashedUserPassword
        })
        console.log("Created a new user successfully!");
    } catch (err) {
        console.log(">>> Error message: " + err.message);
    }
}
const getUserList = async () => {
    /**
     // create the connection, specify bluebird as Promise
     const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'user_management', Promise: bluebird });
 
     try {
         // query database
         const [rows, fields] = await connection.execute('SELECT * FROM users');
         console.log("Got all users successfully!");
 
         return rows;
     } catch (err) {
         console.log(">>> Error message: " + err.message);
         return [];
     }
    */
    // ----------- Test eager loading --------
    // try {
    //     /**
    //      * Normally we have group 1 and we will find all roles in that group
    //      * => But when we code, we will find all role from group 1
    //      */
    //     // From Group 1 to find all roles 
    //     // let roles = await db.Group.findAll({
    //     //     where: { id: 1 },
    //     //     include: {
    //     //         model: db.Role,
    //     //     },
    //     //     raw: true,
    //     //     nest: true,
    //     // });
    //     // Find all roles from group 1
    //     let roles = await db.Role.findAll({
    //         include: {
    //             model: db.Group,
    //             where: { id: 1 },
    //             attributes: ["id", "name", "description"],

    //         },
    //         attributes: ["id", "url", "description"],
    //         raw: true,
    //         nest: true,
    //     });

    //     let arr = await db.User.findAll({
    //         include: {
    //             model: db.Group,
    //             where: { id: 1 },
    //             attributes: ["id", "name", "description"],
    //         },
    //         attributes: ["id", "username", "email"],
    //         raw: true,
    //         nest: true,
    //     });
    //     // console.log(">>>Check users: ", arr);

    //     console.log(">>>Check roles: ", roles);
    // }
    // catch (err) {
    //     console.log(">>>Error: ", err);
    // }

    //----------------------------------------------------------------
    let users = [];

    users = await db.User.findAll();

    return users;
}
const deleteUser = async (userId) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'user_management', Promise: bluebird });

    // try {
    //     // query database
    //     const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [userId]);
    //     console.log("Deleted a new user successfully!");

    // } catch (err) {
    //     console.log(">>> Error message: " + err.message);
    // }
    await db.User.destroy({
        where: {
            id: userId
        },
    });
}

const getUserById = async (userId) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'user_management', Promise: bluebird });

    // try {
    //     // query database
    //     const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [userId]);
    //     console.log("Got a user by Id successfully!");

    //     return rows;
    // } catch (err) {
    //     console.log(">>> Error message: " + err.message);
    // }
    let user = await db.User.findOne({
        where: { id: userId }
    });
    return user;
}

const updateUser = async (email, username, id) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'user_management', Promise: bluebird });


    // try {
    //     // query database
    //     const [rows, fields] = await connection.execute('UPDATE users SET email = ? , username = ? WHERE id = ?', [email, username, id]);
    //     console.log("Updated a user successfully!");
    // } catch (err) {
    //     console.log(">>> Error message: " + err.message);
    // }
    await db.User.update(
        {
            email: email,
            username: username
        },
        {
            where: {
                id: id
            }
        }
    );
}
module.exports = {
    createNewUser: createNewUser,
    getUserList: getUserList,
    deleteUser: deleteUser,
    getUserById: getUserById,
    updateUser: updateUser
}