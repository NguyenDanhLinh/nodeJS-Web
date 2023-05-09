const wrapValuesWithDateTimeBill = require('../utils/wrapValuesWithDateTime.ts')

const bills = [
  {
    id: 1,
    date: new Date(),
    payment_method: 'online',
    total_price: 200,
    ship_ment: 'abc',
    card_id: 1,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('bills', wrapValuesWithDateTimeBill(bills))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('bills', {
        id: bills.map((collection) => collection.id),
      }),
    ]
  },
}
