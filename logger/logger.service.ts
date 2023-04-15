import winston from "winston";
import dotenv from "dotenv"
dotenv.config()
export const logger=winston.createLogger({level:"debug",  format: winston.format.json(),
transports:[new winston.transports.File({filename:"errors.log",level:"error"}),new winston.transports.File({filename:"debug.log"})]
})

if (process.env.NODE_ENV !== 'PRODUCTION') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }