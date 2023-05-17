import { Service } from 'typedi'
import UserRepository from '@repositories/user.repository'
import { CreateUser, UserLogin } from '@interfaces/users.interface'
import { HttpException } from '@exceptions/http.exception'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import BaseService from '@common/services/base.service'
import jwt from 'jsonwebtoken'
import { env } from '@env'
import CardRepository from '@repositories/card.repository'
import { MailService } from '@common/services/mail.service'

@Service()
class UserServices {
  constructor(
    protected userRepository: UserRepository,
    protected cardRepository: CardRepository,
    protected mailService: MailService,
  ) {}

  async getUser() {
    return this.userRepository.getAll()
  }

  async createUser(dataUser: CreateUser) {
    const baseService = new BaseService()

    if (!baseService.ValidateEmail([dataUser.email])) {
      throw new HttpException(400, 'email not valid')
    }

    const dataFindUser = await this.userRepository.findByCondition({
      where: {
        [Op.or]: [
          {
            email: dataUser.email,
          },
          {
            user_name: dataUser.user_name,
          },
          {
            tel: dataUser.tel,
          },
        ],
      },
    })
    if (dataFindUser) {
      throw new HttpException(400, 'email or userName or tel is exist')
    }

    dataUser.password = bcrypt.hashSync(dataUser.password, 10)

    const dataCreateUser = await this.userRepository.create(dataUser)

    await this.cardRepository.create({ user_id: dataCreateUser.id })

    const subject = `You have successfully registered your account. \n
    email: ${dataCreateUser.email} \n
    password: ${dataCreateUser.password}`

    await this.mailService
      .from(env.mail.email)
      .to(dataCreateUser.email)
      .html(subject)
      .send()
      .catch((err) => {
        console.log(err)
      })

    return dataCreateUser
  }

  async userLogin(dataLogin: UserLogin) {
    const dataUser = await this.userRepository.findByCondition({
      where: { user_name: dataLogin.user_name },
      raw: true,
    })

    if (!dataUser || !bcrypt.compareSync(dataLogin.password, dataUser.password)) {
      throw new HttpException(400, 'wrong username or password')
    }

    delete dataUser.password

    return jwt.sign(dataUser, env.auth.jwtSecret)
  }

  async getByIdUser(userId: number) {
    return this.userRepository.findById(userId)
  }

  async deleteByIdUser(userId) {
    return this.userRepository.deleteById(userId)
  }
}

export default UserServices
