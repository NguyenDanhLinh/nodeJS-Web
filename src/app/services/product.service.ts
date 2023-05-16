import { Service } from 'typedi'
import ProductRepository from '@repositories/product.repository'
import {
  DataAddToCard,
  DataCreateProduct,
  DataUpdateProduct,
  DataSearchProduct,
} from '@interfaces/product.interface'
import ProductCardRepository from '@repositories/product_card.repository'
import CardRepository from '@repositories/card.repository'
import { File } from '@interfaces/file.interface'
import { UploadToFilebaseService } from '@common/services/upload_file.service'
import SearchService from '@common/services/search.service'

@Service()
class ProductsServices {
  constructor(
    protected productRepository: ProductRepository,
    protected productCardRepository: ProductCardRepository,
    protected cardRepository: CardRepository,
    protected uploadToFilebaseService: UploadToFilebaseService,
    protected searchService: SearchService,
  ) {}

  async getAllProducts() {
    return this.productRepository.getAll()
  }

  async addToCard(dataAddToCard: DataAddToCard, user_id: number) {
    const dataCard = await this.cardRepository.findByCondition({ where: { user_id } })
    dataAddToCard.card_id = dataCard.id
    const dataProductCard = await this.productCardRepository.findByCondition({
      where: { card_id: dataAddToCard.card_id, product_id: dataAddToCard.product_id, status: true },
    })
    if (dataProductCard) {
      await this.productCardRepository.increment('amount', dataProductCard.id, dataAddToCard.amount)

      return this.productCardRepository.findById(dataProductCard.id)
    }
    return this.productCardRepository.create(dataAddToCard)
  }

  async createProduct(file: File, dataProduct: DataCreateProduct) {
    const img = await this.uploadToFilebaseService.uploadFile(file[0])
    dataProduct.img = img
    if (typeof dataProduct.price == 'string' && typeof dataProduct.category_id == 'string') {
      dataProduct.price = parseInt(dataProduct.price)
      dataProduct.price = parseInt(dataProduct.category_id)
    }
    return this.productRepository.create(dataProduct)
  }

  async updateProduct(dataUpdateProduct: DataUpdateProduct) {
    const idProduct = dataUpdateProduct.id
    delete dataUpdateProduct.id
    return this.productRepository.update(dataUpdateProduct, { where: { id: idProduct } })
  }

  async deleteProduct(productId: number) {
    return this.productRepository.deleteById(productId)
  }

  async getByIdProducts(productId: number) {
    return this.productRepository.findById(productId)
  }

  async searchProducts(dataSearch: DataSearchProduct) {
    return this.productRepository.search(this.searchService.createDataSearch(dataSearch))
  }
}

export default ProductsServices
