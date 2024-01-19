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
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1111',
                sex: 0,
                groupId: 1
            },
            {
                email: 'test2@gmail.com',
                username: 'test2',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1112',
                sex: 0,
                groupId: 2
            },
            {
                email: 'test3@gmail.com',
                username: 'test3',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1113',
                sex: 1,
                groupId: 2
            },
            {
                email: 'test4@gmail.com',
                username: 'test4',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1114',
                sex: 1,
                groupId: 1
            },
            {
                email: 'test5@gmail.com',
                username: 'test5',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1115',
                sex: 0,
                groupId: 3
            },
            {
                email: 'test6@gmail.com',
                username: 'test6',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1116',
                sex: 0,
                groupId: 4
            },
            {
                email: 'test7@gmail.com',
                username: 'test7',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1117',
                sex: 0,
                groupId: 5
            },
            {
                email: 'test8@gmail.com',
                username: 'test8',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1118',
                sex: 0,
                groupId: 1
            },
            {
                email: 'test9@gmail.com',
                username: 'test9',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1119',
                sex: 0,
                groupId: 5
            },
            {
                email: 'test10@gmail.com',
                username: 'test10',
                password: '$2a$10$MrBRjhlwvosTCL24.StMyuQV0DUjL0OBQDbijl9P4p5B.hzkphYni',
                address: 'Dong Nai',
                phone: '1111',
                sex: 1,
                groupId: 5
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
