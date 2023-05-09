import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface ProductRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
