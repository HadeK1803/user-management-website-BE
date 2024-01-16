'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
        await queryInterface.bulkInsert('user', [
            {
                email: 'test1@gmail.com',
                username: 'test1',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },
            {
                email: 'test2@gmail.com',
                username: 'test2',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },
            {
                email: 'test3@gmail.com',
                username: 'test3',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },
            {
                email: 'test4@gmail.com',
                username: 'test4',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },
            {
                email: 'test5@gmail.com',
                username: 'test5',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },
            {
                email: 'test6@gmail.com',
                username: 'test6',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },
            {
                email: 'test7@gmail.com',
                username: 'test7',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },
            {
                email: 'test8@gmail.com',
                username: 'test8',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },
            {
                email: 'test9@gmail.com',
                username: 'test9',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },
            {
                email: 'test10@gmail.com',
                username: 'test10',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni'
            },

        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
