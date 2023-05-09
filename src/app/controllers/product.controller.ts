import {
  Get,
  JsonController,
  Req,
  Res,
  Post,
  UseBefore,
  UploadedFiles,
  Put,
  Delete,
} from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import ProductsServices from '@services/product.service'
import { UserMiddleware } from '@middlewares/checkUser.middleware'
import { createFileUploadOption } from '@lib/file'
import { FileEnum } from '@enum/file.enum'
import { File } from '@interfaces/file.interface'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'

@JsonController('/product')
@Service()
export class ProductsController extends BaseController {
  constructor(protected productsServices: ProductsServices) {
    super()
  }

  @Get('/all')
  async getAllProducts(@Res() res: any) {
    const findAllProductData = await this.productsServices.getAllProducts()
    return this.setData(findAllProductData).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(UserMiddleware)
  @Post('/add_to_cart')
  async addToCard(@Req() req: any, @Res() res: any) {
    const dataAddToCard = await this.productsServices.addToCard(req.body, req.user.id)
    return this.setData(dataAddToCard).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(AdminMiddleware)
  @Post('/create')
  async createProduct(
    @UploadedFiles('file', {
      options: createFileUploadOption(
        /\/(jpg|jpeg|png|gif)$/,
        FileEnum.MAX_SIZE_IMAGE,
        FileEnum.MAX_QTY_IMAGE,
      ),
    })
    file: File,
    @Req() req: any,
    @Res() res: any,
  ) {
    const { product_name, price, type, des, category_id } = req.body
    const dataProduct = { product_name, price, type, des, category_id }
    const dataCreateProduct = await this.productsServices.createProduct(file, dataProduct)

    return this.setData(dataCreateProduct).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(AdminMiddleware)
  @Put('/update')
  async updateProduct(@Req() req: any, @Res() res: any) {
    const dataCreateProduct = await this.productsServices.updateProduct(req.body)

    return this.setData(dataCreateProduct).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(AdminMiddleware)
  @Delete('/delete')
  async deleteProduct(@Req() req: any, @Res() res: any) {
    const dataDeleteProduct = await this.productsServices.deleteProduct(req.body.productId)

    return this.setData(dataDeleteProduct).setMessage('Success').responseSuccess(res)
  }

  @Get('/getById')
  async getByIdProducts(@Req() req: any, @Res() res: any) {
    const getByIdProductsData = await this.productsServices.getByIdProducts(req.query.productId)
    return this.setData(getByIdProductsData).setMessage('Success').responseSuccess(res)
  }

  @Get('/search')
  async searchProducts(@Req() req: any, @Res() res: any) {
    const searchProductsData = await this.productsServices.searchProducts(req.query)
    return this.setData(searchProductsData).setMessage('Success').responseSuccess(res)
  }
}

export default ProductsController
