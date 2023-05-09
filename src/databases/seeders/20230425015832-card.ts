const wrapValuesWithDateTimeCard = require('../utils/wrapValuesWithDateTime.ts')

const cards = [
  {
    id: 1,
    user_id: 1,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('cards', wrapValuesWithDateTimeCard(cards))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('cards', {
        id: cards.map((collection) => collection.id),
      }),
    ]
  },
}
