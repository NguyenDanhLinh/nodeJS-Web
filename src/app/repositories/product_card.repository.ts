import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import ProductCard from '@models/entities/product_card.entity'
import { ProductCardRepositoryInterface } from '@repositories/interfaces/product_card.repository.interface'
import { WhereAttributeHashValue } from 'sequelize'

@Service({ global: true })
class ProductCardRepository
  extends BaseRepository<ProductCard>
  implements ProductCardRepositoryInterface<ProductCard>
{
  constructor(@ModelContainer(ProductCard.tableName) ProductCard: ModelCtor<ProductCard>) {
    super(ProductCard)
  }

  async increment(
    field: keyof ProductCard,
    id: WhereAttributeHashValue<number>,
    amount: number,
  ): Promise<[affectedRows: ProductCard[], affectedCount?: number]> {
    return this.model.increment(
      {
        [field]: amount,
      },
      {
        where: {
          id,
        },
      },
    )
  }
}

export default ProductCardRepository
