import { Get, JsonController, Req, Res, Post, UseBefore, Put } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import BillServices from '@services/bill.service'
import { HttpException } from '@exceptions/http.exception'
import { UserMiddleware } from '@middlewares/checkUser.middleware'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'

@JsonController('/bill')
@Service()
export class BillController extends BaseController {
  constructor(protected billServices: BillServices) {
    super()
  }

  @UseBefore(UserMiddleware)
  @Post('/create')
  async createBill(@Req() req: any, @Res() res: any) {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
      throw new HttpException(401, 'Unauthorised')
    }

    const crateBillData = await this.billServices.createBill(req.body, req.user.id)
    return this.setData(crateBillData).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(UserMiddleware)
  @Get('/info')
  async getBillInfo(@Req() req: any, @Res() res: any) {
    const dataGetBillInfo = await this.billServices.getBillInfo(req.query.id, req.user.id)
    return this.setData(dataGetBillInfo).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(AdminMiddleware)
  @Put('/update-status')
  async updateStatusBill(@Req() req: any, @Res() res: any) {
    const updateStatusBillData = await this.billServices.updateStatusBill(req.body)

    return this.setData(updateStatusBillData).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(UserMiddleware)
  @Get('/all')
  async getALLBillInfo(@Req() req: any, @Res() res: any) {
    const dataGetAllBillInfo = await this.billServices.getALLBillInfo(req.user.id)
    return this.setData(dataGetAllBillInfo).setMessage('Success').responseSuccess(res)
  }

  @UseBefore(AdminMiddleware)
  @Get('/all-by-admin')
  async getALLBill(@Req() req: any, @Res() res: any) {
    const dataGetALLBill = await this.billServices.getALLBill()
    return this.setData(dataGetALLBill).setMessage('Success').responseSuccess(res)
  }
}

export default BillController
