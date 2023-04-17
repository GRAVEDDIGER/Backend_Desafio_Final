
import { logger } from './logger/logger.service'
import { app } from './app.config'

app.listen(8080, () => { logger.info({ message: 'Listening on port 8080' }) })
