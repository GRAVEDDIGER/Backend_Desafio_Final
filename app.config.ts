import express from 'express'
import { userRoutes } from './users/users.routes'
import { productRouter } from './products/products.routes'
import { cartRouter } from './carts/cart.routes'
export const app = express()

app.use(express.json())
app.use('/user', userRoutes)
app.use('/products', productRouter)
app.use('/carts', cartRouter)
