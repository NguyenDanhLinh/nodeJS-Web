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
} from 'sequelize-typescript'
import Category from './category.entity'
import ProductCard from './product_card.entity'

@Table({
  tableName: 'products',
})
export default class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  product_name!: string

  @Column
  img!: string

  @Column
  price!: number

  @Column
  type!: string

  @Column
  des!: string

  @ForeignKey(() => Category)
  @Column
  category_id!: number

  @BelongsTo(() => Category)
  category!: Category

  @HasMany(() => ProductCard)
  productCard!: ProductCard[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
