import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface CardRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  getCardInfo(user_id: number): Promise<M>
}
