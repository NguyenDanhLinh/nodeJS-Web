export interface CreateUser {
  email: string
  user_name: string
  password: string
  full_name: string
  card_num?: number
  card_type?: string
  address: string
  tel: number
}

export interface UserLogin {
  user_name: string
  password: string
}
