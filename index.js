/**
 * main module
 */

require('dotenv').config()

const http = require('http')
const logger = require('./src/middlewares/logging')

try {
  const credentialsManager = require('./src/middlewares/rossum-credentials-manager').create(logger)

  const rossumService = require('./src/services/rossum-service')
    .create(credentialsManager.getCredentials(), logger)

  const port = process.env.PORT || 3000

  const server = http.createServer((req, res) => {
    rossumService.getData(process.env.ROSSUM_QUEUE_ID, process.env.ROSSUM_ANNOTATION_ID)
      .then(rRes => {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = rRes.status
        res.end(JSON.stringify(rRes.data))
      })
      .catch(err => {
        console.log(err.response.data)
        res.setHeader('Content-Type', 'text/html')
        logger.error(err.response.data)
        res.end(err.message)
      })
  })

  server.listen(port, () => {
    logger.info(`Server running at port ${port}`)
  })
} catch (err) {
  logger.error(err.message)
}
