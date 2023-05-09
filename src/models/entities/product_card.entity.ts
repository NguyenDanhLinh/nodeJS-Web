import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import Product from './product.entity'
import Card from './cards.entity'
import Bill from './bill.entity'

@Table({
  tableName: 'product_card',
})
export default class ProductCard extends Model<ProductCard> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  amount!: number

  @ForeignKey(() => Product)
  @Column
  product_id!: number

  @BelongsTo(() => Product)
  product!: Product

  @ForeignKey(() => Card)
  @Column
  card_id!: number

  @BelongsTo(() => Card)
  card!: Card

  @ForeignKey(() => Bill)
  @Column
  bill_id!: number

  @BelongsTo(() => Bill)
  bill!: Bill

  @Column
  status!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
