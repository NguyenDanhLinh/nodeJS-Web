import { Get, JsonController, Req, Res, Post, UseBefore } from 'routing-controllers'
import { NextFunction } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import UserServices from '@services/users.service'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'

@JsonController('/user')
@Service()
export class UsersController extends BaseController {
  constructor(protected userServices: UserServices) {
    super()
  }

  @UseBefore(AdminMiddleware)
  @Get('/list')
  async getUser(@Res() res: any) {
    const findAllUsersData = await this.userServices.getUser()
    return this.setData(findAllUsersData).setMessage('Success').responseSuccess(res)
  }

  @Post('/create')
  async createUser(@Req() req: any, @Res() res: any) {
    const createUserData = await this.userServices.createUser(req.body)
    delete createUserData.password
    return this.setData(createUserData).setMessage('Success').responseSuccess(res)
  }

  @Post('/login')
  async userLogin(@Req() req: any, @Res() res: any, next: NextFunction) {
    const token = await this.userServices.userLogin(req.body)
    return this.setData(token).setMessage('Success').responseSuccess(res)
  }
}

export default UsersController
