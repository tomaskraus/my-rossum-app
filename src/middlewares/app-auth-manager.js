/**
 * provides credentials to this web app
 */

require('dotenv').config()
const assert = require('node:assert/strict')

const basicAuth = require('express-basic-auth')

const create = logger => {
  assert.notEqual(process.env.APP_USER_NAME, undefined, 'APP_USER_NAME env variable is mandatory to run this app')
  const username = process.env.APP_USER_NAME
  assert.notEqual(process.env.APP_PASSWORD, undefined, 'APP_PASSWORD env variable is mandatory to run this app')
  const password = process.env.APP_PASSWORD
  logger.debug('App credentials sets successfully')
  return {

    /**
     * returns Express request handler for user authorization
     */
    getRequestHandler: () => {
      const userRecords = {}
      userRecords[username] = password
      return basicAuth({ users: userRecords })
    }
  }
}

module.exports = {
  create
}
