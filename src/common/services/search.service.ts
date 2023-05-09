import { Service } from 'typedi'
import { Op } from 'sequelize'

@Service()
class SearchService {
  constructor() {}

  createDataSearch(filter: object): any {
    if (!filter) {
      return {}
    }

    return Object.fromEntries(
      Object.keys(filter).map((key) => [key, { [Op.like]: `%${filter[key]}%` }]),
    )
  }
}

export default SearchService
