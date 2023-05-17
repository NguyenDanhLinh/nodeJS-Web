import { Get, JsonController, Req, Res, UseBefore, Put, Delete, Post } from 'routing-controllers'
import { Service, Container } from 'typedi'
import { BaseController } from './base.controller'
import PassportService from '@common/passport/passport'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { env } from '@env'

const passportService = Container.get(PassportService)
passportService.FaceBookService()

@JsonController('')
@Service()
export class FacebookController extends BaseController {
  constructor() {
    super()
  }

  @UseBefore(passport.authenticate('facebook-token', { session: false }))
  @Post('/auth/facebook')
  async loginFacebook(@Req() req: any, @Res() res: any) {
    return this.setData(jwt.sign(req.user.dataValues, env.auth.jwtSecret))
      .setMessage('Success')
      .responseSuccess(res)
  }
}

export default FacebookController
