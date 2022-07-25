'use strict';

const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = JSON.parse(fs.readFileSync("./data/product.json")).map(el => {
      return {
        name: el.name,
        description: el.description,
        price: el.price,
        stock: el.stock,
        imgUrl: el.imgUrl,
        categoryId: el.categoryId,
        authorId: el.authorId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return queryInterface.bulkInsert("Products", data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete("Products", null, {})
  }
};
