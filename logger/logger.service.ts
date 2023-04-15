import winston from "winston";
import dotenv from "dotenv"
import fs from "fs"
dotenv.config()
const path=process.env.LOG_DIRECTORY
console.log(path)
if (path !==undefined && !fs.existsSync(path)) fs.mkdirSync(path)
export const logger=winston.createLogger({level:"debug",   format:winston.format.combine(winston.format.prettyPrint(),winston.format.timestamp()),
transports:[new winston.transports.File({filename:path ||""+"/errors.log",level:"error"}),new winston.transports.File({filename:path ||""+"/debug.log"})],

})

if (process.env.NODE_ENV !== 'PRODUCTION') {
    logger.add(new winston.transports.Console({
      format:winston.format.combine(winston.format.simple(),winston.format.colorize(),winston.format.timestamp())
    }));
  }