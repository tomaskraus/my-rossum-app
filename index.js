// @ts-check
/**
 * main module
 */

const logger = require('./src/middlewares/logging')
const express = require('express')
const app = express()

try {
  const appAuthManager = require('./src/middlewares/app-auth-manager').create(logger)
  const credentialsManager = require('./src/middlewares/rossum-credentials-manager').create(logger)
  const rossumService = require('./src/services/rossum-service')
    .create(credentialsManager.getCredentials(), logger)
  const transformService = require('./src/services/transform-annotation-service').create(logger)

  const authHandler = appAuthManager.getRequestHandler()

  app.get('/export/:queueid/annotations/:annotationid', authHandler, (req, res) => {
    logger.http(`== endpoint: ${req.url}`)
    rossumService.getAnnotationXML(req.params.queueid, req.params.annotationid)
      .then(transformService.transformAnnotation)
      .then(xmlString => {
        res.setHeader('Content-Type', 'application/xml')
        res.end(xmlString)
      })
      .catch(err => {
        logger.error(err.message)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          success: false,
          message: err.message
        })
        )
      })
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    logger.info(`Server running at port ${port}`)
  })
} catch (err) {
  logger.error(err.message)
}
