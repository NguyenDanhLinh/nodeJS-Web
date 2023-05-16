import { Get, JsonController, Req, Res, UseBefore, Put, Delete, Post } from 'routing-controllers'
import { NextFunction } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import { HttpException } from '@exceptions/http.exception'
import jwt from 'jsonwebtoken'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import CategoryServices from '@services/category.service'

@JsonController('/category')
@Service()
export class CategoryController extends BaseController {
  constructor(protected categoryervices: CategoryServices) {
    super()
  }

  @UseBefore(AdminMiddleware)
  @Post('/create')
  async createCategory(@Req() req: any, @Res() res: any) {
    const dataCreateCategory = await this.categoryervices.createCategory(req.body)

    return this.setData(dataCreateCategory).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(AdminMiddleware)
  @Put('/update')
  async updateCategory(@Req() req: any, @Res() res: any) {
    const dataUpdateCategory = await this.categoryervices.updateCategory(req.body)

    return this.setData(dataUpdateCategory).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(AdminMiddleware)
  @Delete('/delete')
  async deleteCategory(@Req() req: any, @Res() res: any) {
    const dataDeleteCategory = await this.categoryervices.deleteCategory(req.body.CategoryId)

    return this.setData(dataDeleteCategory).setMessage('Success').responseSuccess(res)
  }

  @Get('/all')
  async getAllCategory(@Res() res: any) {
    const datagetAllCategory = await this.categoryervices.getAllCategory()

    return this.setData(datagetAllCategory).setMessage('Success').responseSuccess(res)
  }

  @Get('/get-list-product')
  async getProductByCategory(@Req() req: any, @Res() res: any) {
    const dataGetProductByCategory = await this.categoryervices.getProductByCategory(
      req.query.categoryId,
    )

    return this.setData(dataGetProductByCategory).setMessage('Success').responseSuccess(res)
  }
}

export default CategoryController
