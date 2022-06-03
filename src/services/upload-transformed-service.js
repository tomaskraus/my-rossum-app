/**
 * uploads transformed annotation's data
 */

const create = logger => {
  return {
    /**
     *
     * @param {string} annotStr annotation XML string
     * @returns {boolean} True if upload was succesful. False otherwise.
     */
    uploadData: (annotStr) => {
      logger.debug('-- calling uploadData')
      logger.silly(annotStr)
      return new Promise((resolve, reject) => {
        reject(new Error('[uploadData]: not implemented'))

        // resolve(true)
      })
    }
  }
}

module.exports = {
  create
}
