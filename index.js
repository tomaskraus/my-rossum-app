/**
 * main module
 */

const logger = require('./src/middlewares/logging')
const express = require('express')
const app = express()

try {
  const credentialsManager = require('./src/middlewares/rossum-credentials-manager').create(logger)
  const rossumService = require('./src/services/rossum-service')
    .create(credentialsManager.getCredentials(), logger)

  app.get('/export/:queueid/annotations/:annotationid', (req, res) => {
    rossumService.getAnnotationData(req.params.queueid, req.params.annotationid)
      .then(rRes => {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = rRes.status
        res.end(JSON.stringify(rRes.data))
      })
      .catch(err => {
        logger.error(rossumService.getSafeErrorResponseData(err))
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          success: false,
          message: rossumService.getSafeShortErrorResponse(err)
        }
        ))
      })
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    logger.info(`Server running at port ${port}`)
  })
} catch (err) {
  logger.error(err.message)
}
