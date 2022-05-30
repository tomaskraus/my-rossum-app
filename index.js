/**
 * main module
 */

require('dotenv').config()

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
        console.log(err.response.data)
        res.setHeader('Content-Type', 'text/html')
        logger.error(err.response.data)
        res.end(err.message)
      })
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    logger.info(`Server running at port ${port}`)
  })
} catch (err) {
  logger.error(err.message)
}
