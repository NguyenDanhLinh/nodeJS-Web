import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  AutoIncrement,
  HasOne,
} from 'sequelize-typescript'
import Card from './cards.entity'

@Table({
  tableName: 'users',
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  email!: string

  @Column
  user_name!: string

  @Column
  password!: string

  @Column
  full_name!: string

  @Column
  role!: string

  @Column
  card_num!: number

  @Column
  card_type!: string

  @Column
  address!: string

  @Column
  tel!: string

  @Column
  facebook_id!: string

  @HasOne(() => Card)
  card!: Card

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
