import { Service } from 'typedi'
import FacebookTokenStrategy from 'passport-facebook-token'
import passport from 'passport'
import UserServices from '@services/users.service'
import UserRepository from '@repositories/user.repository'

@Service()
class PassportService {
  constructor(protected userServices: UserServices, protected userRepository: UserRepository) {}

  async FaceBookService() {
    passport.use(
      new FacebookTokenStrategy(
        {
          clientID: '3006420076156942',
          clientSecret: '8823588d1033b58da6b3daf75f3666a8',
        },
        async (accessToken, refreshToken, profile, done) => {
          const data_user = await this.userRepository.findByCondition({
            where: { facebook_id: profile.id },
          })

          if (!data_user) {
            const dataCreateUser = {
              email: `facebook${profile.id}@gmail.com`,
              user_name: profile.displayName,
              password: 'facebook',
              full_name: profile.displayName,
              role: 'user',
              tel: parseInt(profile.id),
              address: profile.provider,
              facebook_id: profile.id,
            }

            const createUser = await this.userServices.createUser(dataCreateUser)

            return done(null, createUser)
          }

          return done(null, data_user)
        },
      ),
    )
  }
}

export default PassportService
