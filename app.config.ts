import express from 'express'
import { userRoutes } from './users/users.routes'
import { productRouter } from './products/products.routes'
export const app = express()

app.use(express.json())
app.use('/user', userRoutes)
app.use('/products', productRouter)
