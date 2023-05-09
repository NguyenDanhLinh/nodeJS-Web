const wrapValuesWithDateTimeProduct = require('../utils/wrapValuesWithDateTime.ts')

const products = [
  {
    id: 1,
    product_name: 'chao chong dinh',
    img: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/350/142/products/chao-nhom-chong-dinh-28cm.jpg',
    price: 100,
    type: 'xxx',
    des: 'sieu chong dinh',
    category_id: 1,
  },
  {
    id: 2,
    product_name: 'ao coc nam',
    img: 'https://cf.shopee.vn/file/b20360ee9b8d9062a869dee0b6f014b8',
    price: 200,
    type: 'yyy',
    des: 'chat sieu mat',
    category_id: 2,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('products', wrapValuesWithDateTimeProduct(products))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('products', {
        id: products.map((collection) => collection.id),
      }),
    ]
  },
}
