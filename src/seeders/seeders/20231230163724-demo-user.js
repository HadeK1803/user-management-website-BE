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
        await queryInterface.bulkInsert('users', [
            {
                email: 'khang@gmail.com',
                username: 'Khang',
                password: 'admin'
            },
            {
                email: 'hadek@gmail.com',
                username: 'HadeK',
                password: 'admin'
            },
            {
                email: 'hades@gmail.com',
                username: 'Hades',
                password: 'admin'
            }
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
