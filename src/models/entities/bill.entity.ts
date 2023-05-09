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
  HasMany,
  Default,
  DataType,
} from 'sequelize-typescript'
import Card from './cards.entity'
import ProductCard from './product_card.entity'
import { StatusEnum } from '@enum/bill.enum'

@Table({
  tableName: 'bills',
})
export default class Bill extends Model<Bill> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  date!: Date

  @Column
  payment_method!: string

  @Column
  total_price!: number

  @Column
  ship_ment!: string

  @Column(DataType.ENUM({ values: Object.values(StatusEnum) }))
  status: StatusEnum

  @ForeignKey(() => Card)
  @Column
  card_id!: number

  @BelongsTo(() => Card)
  card!: Card

  @HasMany(() => ProductCard)
  productCard: ProductCard[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
