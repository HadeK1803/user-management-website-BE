import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const mysql = require('mysql2/promise');

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

    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'user_management', Promise: bluebird });

    try {
        // query database
        const [rows, fields] =
            await connection.execute('INSERT INTO users (email, username, password) VALUES (?,?,?)',
                [email, username, hashedUserPassword]);
        console.log("Created a new user successfully!");
    } catch (err) {
        console.log(">>> Error message: " + err.message);
    }
}
const getUserList = async () => {
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
}
const deleteUser = async (idUser) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'user_management', Promise: bluebird });

    try {
        // query database
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [idUser]);
        console.log("Deleted a new user successfully!");

    } catch (err) {
        console.log(">>> Error message: " + err.message);
    }
}

const getUserById = async (idUser) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'user_management', Promise: bluebird });

    try {
        // query database
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [idUser]);
        console.log("Got a user by Id successfully!");

        return rows;
    } catch (err) {
        console.log(">>> Error message: " + err.message);
    }
}

const updateUser = async (email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'user_management', Promise: bluebird });


    try {
        // query database
        const [rows, fields] = await connection.execute('UPDATE users SET email = ? , username = ? WHERE id = ?', [email, username, id]);
        console.log("Updated a user successfully!");
    } catch (err) {
        console.log(">>> Error message: " + err.message);
    }
}
module.exports = {
    createNewUser: createNewUser,
    getUserList: getUserList,
    deleteUser: deleteUser,
    getUserById: getUserById,
    updateUser: updateUser
}