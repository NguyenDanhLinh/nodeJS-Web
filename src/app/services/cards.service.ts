import { Service } from 'typedi'
import CardRepository from '@repositories/card.repository'

@Service()
class CardServices {
  constructor(protected cardRepository: CardRepository) {}

  async getCardInfo(user_id: number) {
    return this.cardRepository.getCardInfo(user_id)
  }
}

export default CardServices
