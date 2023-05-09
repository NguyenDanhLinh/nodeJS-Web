import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript'
import Product from './product.entity'

@Table({
  tableName: 'categories',
})
export default class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  brand!: string

  @HasMany(() => Product)
  product!: Product[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
