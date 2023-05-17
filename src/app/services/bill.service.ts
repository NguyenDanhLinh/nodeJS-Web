import { Service } from 'typedi'
import BillRepository from '@repositories/bill.repository'
import { createBillData, DataUpdateStatusBill } from '@interfaces/bill.interface'
import BaseService from '@common/services/base.service'
import ProductCardRepository from '@repositories/product_card.repository'
import CardRepository from '@repositories/card.repository'
import { HttpException } from '@exceptions/http.exception'

@Service()
class BillServices {
  constructor(
    protected billRepository: BillRepository,
    protected productCardRepository: ProductCardRepository,
    protected cardRepository: CardRepository,
  ) {}

  async createBill(createBillData: createBillData, user_id: number) {
    const dataCard = await this.cardRepository.findByCondition({ where: { user_id } })

    const dataProductCard = await this.productCardRepository.findByCondition({
      where: { status: true, card_id: dataCard.id },
    })

    if (!dataProductCard) {
      throw new HttpException(400, 'cart is empty')
    }

    createBillData.date = new Date().toISOString()
    createBillData.card_id = dataCard.id
    const dataCreateBill: any = await this.billRepository.create(createBillData)
    await this.productCardRepository.update(
      { status: false, bill_id: dataCreateBill.id },
      { where: { card_id: dataCard.id, bill_id: null } },
    )
    return this.billRepository.getBill(dataCreateBill.id)
  }

  async getBillInfo(bill_id, user_id) {
    const dataCard = await this.cardRepository.findByCondition({ where: { user_id } })
    const dataBill = await this.billRepository.findByCondition({
      where: { id: bill_id, card_id: dataCard.id },
    })

    if (!dataBill) {
      throw new HttpException(400, 'you cannot view this invoice')
    }

    return this.billRepository.getBill(bill_id)
  }

  async updateStatusBill(dataUpdateStatusBill: DataUpdateStatusBill) {
    if (!['pending', 'delivering', 'delivered', 'cancel'].includes(dataUpdateStatusBill.status)) {
      throw new HttpException(400, 'wrong status format')
    }
    return this.billRepository.update(
      { status: dataUpdateStatusBill.status },
      { where: { id: dataUpdateStatusBill.id } },
    )
  }

  async getALLBillInfo(user_id: number) {
    const dataCard = await this.cardRepository.findByCondition({ where: { user_id } })
    return this.billRepository.getAllBill(dataCard.id)
  }

  async getALLBill() {
    return this.billRepository.getAllBillByAdmin()
  }
}

export default BillServices
