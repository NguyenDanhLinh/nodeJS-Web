const wrapValuesWithDateTime = require('../utils/wrapValuesWithDateTime.ts')

const users = [
  {
    id: 1,
    email: 'nguyendanhlinh2001@gmail.com',
    user_name: 'nguyendanhlinh',
    password: '$2b$10$yToY/6nOI2.pcZHSXukPGOHEdezZPsmv7sMIdKZ4k459HSSoGPDHy',
    full_name: 'nguyen danh linh',
    role: 'admin',
    card_num: 20,
    card_type: 'xxx',
    address: 'HN',
    tel: 329323119,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('users', wrapValuesWithDateTime(users))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('users', {
        id: users.map((collection) => collection.id),
      }),
    ]
  },
}

/*
import { hash } from 'bcrypt';
Promise.all(
    [
        'password01',
        'password02',
        'password03',
    ].map( it =>  hash(it, 10))
).then(it => console.log('>>>>>>>>>>>>>>>>>', it))
*/
