'use strict';

const products = require("../seedData/products.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataWithTimestamps = products.map((item) => ({
      ...item,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("Products", dataWithTimestamps);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
