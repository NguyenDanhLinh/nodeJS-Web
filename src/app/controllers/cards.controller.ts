import { Get, JsonController, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import CardServices from '@services/cards.service'
import { HttpException } from '@exceptions/http.exception'
import jwt from 'jsonwebtoken'
import { UserMiddleware } from '@middlewares/checkUser.middleware'

@JsonController('/cart')
@Service()
export class CardsController extends BaseController {
  constructor(protected cardServices: CardServices) {
    super()
  }

  @UseBefore(UserMiddleware)
  @Get('/info')
  async getCardInfo(@Req() req: any, @Res() res: any) {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
      throw new HttpException(401, 'Unauthorised')
    }

    const accessToken = bearer.split('Bearer ')[1].trim()
    const dataUser: any = jwt.verify(accessToken, process.env.JWT_SECRET)

    const findCardsData = await this.cardServices.getCardInfo(dataUser.id)
    return this.setData(findCardsData).setMessage('Success').responseSuccess(res)
  }
}

export default CardsController
