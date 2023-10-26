'use strict';
const { generateRandom } = require('../helpers/helper')

/** @type {import('sequelize-cli').Migration} */
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
    const cards = []
    for(let i = 0; i < 10; i++) {
      const card = {}
      card.name = 'Barbie'
      card.description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
      card.price = generateRandom(1_000, 10_000)
      
      card.image = `/images/${generateRandom(1, 17)}.jpg`
      card.atk = generateRandom(1, 50)
      card.def = generateRandom(1, 50)
      card.stock = generateRandom(1, 10)
      card.createdAt = new Date()
      card.updatedAt = new Date()

      cards.push(card)
    }

    await queryInterface.bulkInsert('Cards', cards)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Cards', null, {})
  }
};
