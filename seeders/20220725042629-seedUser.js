'use strict';

const fs = require('fs');
const { hashedPass } = require('../helpers/hashing');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = JSON.parse(fs.readFileSync("./data/user.json")).map(el => {
      return {
        userName: el.userName,
        email: el.email,
        password: hashedPass(el.password),
        role: el.role,
        phoneNumber: el.phoneNumber,
        address: el.address,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return queryInterface.bulkInsert("Users", data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete("Users", null, {})
  }
};