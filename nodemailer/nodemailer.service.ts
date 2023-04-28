import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { logger } from '../logger/logger.service'
dotenv.config()
const trasnsporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILPASS
  }
})

export function sendMail (to: string, subject: string, message: string): void {
  const from = process.env.MAIL ?? ''
  trasnsporter.sendMail({ from, to, subject, text: message }, (error: any, info: any) => {
    if (error !== undefined) {
      logger.error({
        function: 'nodemailer.service', error
      })
    } else logger.info({ function: 'nodemailer.service', info })
  }
  )
}
