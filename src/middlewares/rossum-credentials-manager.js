/**
 * provides credentials
 */

const assert = require('node:assert/strict')

const create = logger => {
  return {
    /**
     * returns { username: string, password: string }
     */
    getCredentials: () => {
      assert.notEqual(process.env.ROSSUM_USER_NAME, undefined, 'ROSSUM_USER_NAME env variable is mandatory to run this app')
      const username = process.env.ROSSUM_USER_NAME
      assert.notEqual(process.env.ROSSUM_PASSWORD, undefined, 'ROSSUM_PASSWORD env variable is mandatory to run this app')
      const password = process.env.ROSSUM_PASSWORD
      const credentials = { username, password }

      logger.debug('Credentials sets successfully')
      return credentials
    }
  }
}

module.exports = {
  create
}
