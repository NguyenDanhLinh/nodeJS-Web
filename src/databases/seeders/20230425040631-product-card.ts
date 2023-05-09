const wrapValuesWithDateTimeProductCard = require('../utils/wrapValuesWithDateTime.ts')

const products_cards = [
  {
    id: 1,
    amount: 2,
    card_id: 1,
    product_id: 1,
    status: true,
  },
  {
    id: 2,
    amount: 1,
    card_id: 1,
    product_id: 2,
    status: true,
  },
]

module.exports = {
  async up(queryInterface) {
    return [
      await queryInterface.bulkInsert(
        'product_card',
        wrapValuesWithDateTimeProductCard(products_cards),
      ),
    ]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('product_card', {
        id: products_cards.map((collection) => collection.id),
      }),
    ]
  },
}
