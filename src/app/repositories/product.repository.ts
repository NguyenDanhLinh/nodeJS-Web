import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Product from '@models/entities/product.entity'
import { ProductRepositoryInterface } from './interfaces/product.repository.interface'
import Category from '@models/entities/category.entity'
import { Op } from 'sequelize'

@Service({ global: true })
class ProductRepository
  extends BaseRepository<Product>
  implements ProductRepositoryInterface<Product>
{
  constructor(@ModelContainer(Product.tableName) Product: ModelCtor<Product>) {
    super(Product)
  }

  async search(dataSearch: any) {
    return this.getAllWhere({
      where: {
        product_name: dataSearch.product_name ? dataSearch.product_name : { [Op.not]: null },
      },
      include: [
        {
          model: Category,
          where: {
            brand: dataSearch.brand ? dataSearch.brand : { [Op.not]: null },
          },
        },
      ],
    })
  }
}

export default ProductRepository
