import { StatusEnum } from '@enum/bill.enum'

export interface createBillData {
  date?: string
  payment_method: string
  total_price: number
  ship_ment: string
  card_id?: number
}

export interface DataUpdateStatusBill {
  id: number
  status: StatusEnum
}
