
import { logger } from './logger/logger.service'
import { app } from './app.config'
import dotenv from 'dotenv'
dotenv.config()
const PORT = (process.env.PORT != null) ? process.env.PORT : 8080
export const server = app.listen(PORT, () => { logger.info({ message: `Listening on port ${PORT}` }) })
