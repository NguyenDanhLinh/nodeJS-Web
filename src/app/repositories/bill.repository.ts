import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Bill from '@models/entities/bill.entity'
import { BilltRepositoryInterface } from '@repositories/interfaces/bill.repository.interface'
import ProductCard from '@models/entities/product_card.entity'
import Product from '@models/entities/product.entity'
import Category from '@models/entities/category.entity'

@Service({ global: true })
class BillRepository extends BaseRepository<Bill> implements BilltRepositoryInterface<Bill> {
  constructor(@ModelContainer(Bill.tableName) Bill: ModelCtor<Bill>) {
    super(Bill)
  }

  async getBill(bill_id: number): Promise<Bill> {
    return this.findByCondition({
      where: {
        id: bill_id,
      },
      include: [
        {
          model: ProductCard,
          where: {
            status: false,
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: Product,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
              include: [
                {
                  model: Category,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                  },
                },
              ],
            },
          ],
        },
      ],
    })
  }

  async getAllBill(card_id: number): Promise<Array<Bill>> {
    return this.getAllWhere({
      where: {
        card_id,
      },
      include: [
        {
          model: ProductCard,
          where: {
            status: false,
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: Product,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
              include: [
                {
                  model: Category,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                  },
                },
              ],
            },
          ],
        },
      ],
    })
  }
}

export default BillRepository
