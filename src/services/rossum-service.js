/**
 * interacts with a Rossum web API
 */

const axios = require('axios')

const _ROSSUM_REQUEST_CONFIG = {
  baseURL: 'https://elis.rossum.ai/api'
}

const create = (credentials, logger) => {
  return {

    getData: (queueId, annotationId) => {
      return axios
        .request({
          ..._ROSSUM_REQUEST_CONFIG,
          url: `/v1/queues/${queueId}/export`,
          auth: {
            username: credentials.username,
            password: credentials.password
          },
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
