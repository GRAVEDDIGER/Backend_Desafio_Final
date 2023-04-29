import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { logger } from '../logger/logger.service'
dotenv.config()
const trasnsporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})
console.log('mAIL Y CLAVE', process.env.MAIL_USER, process.env.MAIL_PASS)
export function sendMail (subject: string, message: string): void {
  const from = process.env.MAIL ?? ''
  trasnsporter.sendMail({ from, to: process.env.MAIL_ADMIN, subject, text: message }, (error: any, info: any) => {
    if (error !== undefined && error !== null) {
      logger.error({
        function: 'nodemailer.service', error
      })
    } else logger.info({ function: 'nodemailer.service', info })
  }
  )
}
