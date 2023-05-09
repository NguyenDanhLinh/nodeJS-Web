import { Service } from 'typedi'
import CategoryRepository from '@repositories/category.repository'
import { DataCreateCategory, DataUpdateCategory } from '@interfaces/category.interface'

@Service()
class CategoryServices {
  constructor(protected categoryRepository: CategoryRepository) {}

  async createCategory(dataCreateCategory: DataCreateCategory) {
    return this.categoryRepository.create(dataCreateCategory)
  }

  async updateCategory(dataUpdateCategory: DataUpdateCategory) {
    return this.categoryRepository.update(
      { brand: dataUpdateCategory.brand },
      { where: { id: dataUpdateCategory.id } },
    )
  }

  async deleteCategory(CategoryId: number) {
    return this.categoryRepository.deleteById(CategoryId)
  }
}

export default CategoryServices
