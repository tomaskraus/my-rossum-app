// @ts-check
/**
 * provides credentials to this web app
 */

require('dotenv').config()
const assert = require('node:assert/strict')

const basicAuth = require('express-basic-auth')

const create = logger => {
  assert.notEqual(process.env.APP_USER_NAME, undefined, 'APP_USER_NAME env variable is mandatory to run this app')
  /** @type {string} */
  const USER_NAME = process.env.APP_USER_NAME || ''
  assert.notEqual(process.env.APP_PASSWORD, undefined, 'APP_PASSWORD env variable is mandatory to run this app')
  /** @type {string} */
  const PASSWORD = process.env.APP_PASSWORD || ''
  logger.debug('App credentials sets successfully')

  /** @param {string} usrName */
  const customAuthorizer = (usrName, passw) => {
    const userMatches = basicAuth.safeCompare(usrName, USER_NAME)
    const passwordMatches = basicAuth.safeCompare(passw, PASSWORD)
    if (userMatches && passwordMatches) {
      logger.debug('AppAuthManager authorizer: credentials OK')
      return true
    }
    logger.warn('AppAuthManager authorizer: wrong credentials')
    return false
  }

  return {

    /**
     * returns Express request handler for user authorization
     */
    getRequestHandler: () => {
      return basicAuth({
        authorizer: customAuthorizer,
        unauthorizedResponse: '401 Unauthorized'
      })
    }
  }
}

module.exports = {
  create
}
