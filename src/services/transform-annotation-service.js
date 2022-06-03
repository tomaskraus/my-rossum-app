/**
 * transforms annotation's data
 */

const create = logger => {
  return {
    /**
     *
     * @param {string} annotStr annotation XML string
     * @returns {string} transformed annotation
     */
    transformAnnotation: (annotStr) => {
      logger.debug('-- calling transformAnnotation')
      logger.silly(annotStr)
      return new Promise((resolve, reject) => {
        // reject(new Error('[transformAnnotation]: XML transformation not implemented'))
        resolve(annotStr)
      })
    }
  }
}

module.exports = {
  create
}
