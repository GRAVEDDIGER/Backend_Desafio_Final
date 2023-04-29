import express, { type Request, type Response } from 'express'
import { userRoutes } from './users/users.routes'
import { productRouter } from './products/products.routes'
import { cartRouter } from './carts/cart.routes'
import { salesRouter } from './sales/sales.routes'
import { chatRouter } from './chat/chat.routes'
import { engine } from 'express-handlebars'
import passport from 'passport'
import './auth/auth.localStrategy'
import Session from 'express-session'
import Store from 'connect-mongo'
import dotenv from 'dotenv'
import { authRoutes } from './auth/auth.routes'
import flash from 'connect-flash'
dotenv.config()
export const app = express()
const store = new Store({ mongoUrl: process.env.DATABASE_URL, ttl: parseInt(process.env.SESSION_TIMEOUT ?? '1296000') })
const sessionMiddleware = Session({
  store,
  secret: 'clave',
  cookie: { maxAge: 60 * 60 * 24 * 10 },
  resave: false,
  saveUninitialized: false
})
app.use(flash())
app.use(express.json())
app.use(express.static('public'))
// SESSIONS AND PASSPORT
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())
// VIEW ENGINE
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
// ROUTES
app.use('/user', userRoutes)
app.use('/products', productRouter)
app.use('/carts', cartRouter)
app.use('/sales', salesRouter)
app.use('/chat', chatRouter)
app.use('/auth', authRoutes)
app.get('/', (_req: Request, res: Response) => {
  res.redirect('/products')
})
