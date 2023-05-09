const wrapValuesWithDateTimeCategory = require('../utils/wrapValuesWithDateTime.ts')

const categories = [
  {
    id: 1,
    brand: 'gia dung',
  },
  {
    id: 2,
    brand: 'quan ao',
  },
]

module.exports = {
  async up(queryInterface) {
    return [
      await queryInterface.bulkInsert('categories', wrapValuesWithDateTimeCategory(categories)),
    ]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('categories', {
        id: categories.map((collection) => collection.id),
      }),
    ]
  },
}
