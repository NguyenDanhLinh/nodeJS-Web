export interface DataAddToCard {
  product_id: number
  amount: number
  user_id: number
  card_id: number
}

export interface DataCreateProduct {
  product_name: string
  price: string | number
  type: string
  des: string
  category_id: string | number
  img?: string
}

export interface DataUpdateProduct {
  id: number
  price?: number
  type?: string
  des?: string
}

export interface DataSearchProduct {
  product_name?: string
  brand?: string
}
