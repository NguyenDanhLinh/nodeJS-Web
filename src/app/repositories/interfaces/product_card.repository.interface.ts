import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface ProductCardRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
