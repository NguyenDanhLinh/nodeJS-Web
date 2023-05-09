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
  HasOne,
  HasMany,
} from 'sequelize-typescript'
import User from './users.entity'
import Bill from './bill.entity'
import ProductCard from './product_card.entity'

@Table({
  tableName: 'cards',
})
export default class Card extends Model<Card> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => User)
  @Column
  user_id!: number

  @BelongsTo(() => User)
  user!: User

  @HasMany(() => Bill)
  bill!: Bill[]

  @HasMany(() => ProductCard)
  productCard!: ProductCard[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
