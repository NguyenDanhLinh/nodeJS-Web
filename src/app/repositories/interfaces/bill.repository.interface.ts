import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface BilltRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  getBill(bill_id: number): Promise<M>
}
