export interface ProductType {
  id: string
  name: string
  description: string
  quantity: number
  price: number
  stock: number
  rate: number
  category: string
}
export interface Address {
  street: string
  number: number
  city: string
  zipCode: string
}
export interface UserType {
  name: string
  lastName: string
  username: string
  phoneNumber: number
  address: Address
  id: string
}
