/**
 * interacts with a Rossum web API
 */

const axios = require('axios')

const _ROSSUM_REQUEST_CONFIG = {
  baseURL: 'https://elis.rossum.ai/api'
}

const create = (credentials, logger) => {
  const authData = {
    username: credentials.username,
    password: credentials.password
  }

  return {

    /**
     * gets the annotation data
     */
    getData: (queueId, annotationId) => {
      logger.debug(`getData: getting data for queueId: [${queueId}], annotoationId: [${annotationId}]`)
      return axios
        .request({
          ..._ROSSUM_REQUEST_CONFIG,
          url: `/v1/queues/${queueId}/export`,
          auth: authData,
          method: 'get',
          params: {
            format: 'json',
            id: annotationId
          }
        })
    }

  }
}

module.exports = {
  create
}
