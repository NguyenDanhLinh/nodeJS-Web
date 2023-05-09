import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { CardRepositoryInterface } from './interfaces/card.repository.interface'
import Card from '@models/entities/cards.entity'
import ProductCard from '@models/entities/product_card.entity'
import Product from '@models/entities/product.entity'
import Category from '@models/entities/category.entity'

@Service({ global: true })
class CardRepository extends BaseRepository<Card> implements CardRepositoryInterface<Card> {
  constructor(@ModelContainer(Card.tableName) Card: ModelCtor<Card>) {
    super(Card)
  }

  async getCardInfo(user_id: number): Promise<Card> {
    return this.findByCondition({
      where: { user_id },
      include: [
        {
          model: ProductCard,
          where: {
            status: true,
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

export default CardRepository
