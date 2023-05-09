import { ModelCtor } from 'sequelize-typescript'

import DB from '@models/index'
import User from '@models/entities/users.entity'
import Card from '@models/entities/cards.entity'
import Bill from '@models/entities/bill.entity'
import Category from '@models/entities/category.entity'
import Product from '@models/entities/product.entity'
import ProductCard from '@models/entities/product_card.entity'

export function getModelFromTableName(tableName: string): ModelCtor | undefined {
  let item = undefined
  switch (tableName) {
    case User.tableName:
      item = DB.sequelize.model(User)
      break
    case Card.tableName:
      item = DB.sequelize.model(Card)
      break
    case Bill.tableName:
      item = DB.sequelize.model(Bill)
      break
    case Category.tableName:
      item = DB.sequelize.model(Category)
      break
    case Product.tableName:
      item = DB.sequelize.model(Product)
      break
    case ProductCard.tableName:
      item = DB.sequelize.model(ProductCard)
      break
    default:
      item = undefined
      break
  }
  return item
}
