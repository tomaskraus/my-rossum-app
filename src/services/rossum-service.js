/**
 * interacts with a Rossum web API
 */

const axios = require('axios')

const _ROSSUM_REQUEST_CONFIG = {
  baseURL: 'https://elis.rossum.ai/api'
}

const _formatErrStr = (errStr, methodName) => {
  if (methodName) {
    return `[${methodName}]: ${errStr}`
  }
  return errStr
}

const getSafeErrorResponseData = (err, methodName = '') => {
  if (err.response !== undefined) {
    return err.response.data
  }
  return _formatErrStr(err.message, methodName)
}

const getSafeShortErrorResponse = (err, methodName = '') => {
  if (err.response !== undefined) {
    return `${err.message} ; ${err.response.data.detail}`
  }
  return _formatErrStr(err.message, methodName)
}

/**
 *
 * @param {object} credentials { username: string, password: string }
 * @param {object} logger logger object with npm style logging levels methods
 * @returns rossum service object
 */
const create = (credentials, logger) => {
  const authData = {
    username: credentials.username,
    password: credentials.password
  }

  return {
    /**
     * gets the Rossum's annotation data
     *
     * (annotation[], err)
     */
    getAnnotationData: (queueId, annotationId) => {
      logger.debug(`getAnnotationData: getting data for queueId: [${queueId}], annotoationId: [${annotationId}]`)
      return new Promise((resolve, reject) => {
        axios.request({
          ..._ROSSUM_REQUEST_CONFIG,
          url: `/v1/queues/${queueId}/export`,
          auth: authData,
          method: 'get',
          params: {
            format: 'xml',
            id: annotationId
          }
        })
          .then(res => {
            logger.silly(res)
            logger.debug(`data length: [${res.data.length}] for queueId: [${queueId}], annotoationId: [${annotationId}]`)
            resolve(res.data)
          })
          .catch(err => {
            logger.silly(err)
            logger.error(getSafeErrorResponseData(err), 'getAnnotationData')
            reject(new Error(getSafeShortErrorResponse(err, 'getAnnotationData')))
          })
      })
    }

  }
}

module.exports = {
  getSafeErrorResponseData,
  getSafeShortErrorResponse,
  create
}
