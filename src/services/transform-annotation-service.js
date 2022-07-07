// @ts-check
/**
 * transforms annotation's data
 */

const SaxonJS = require('saxon-js')

const STYLESHEET_PATH = './src/resources/transformations/transform-annotation.sef.json'

const create = logger => {
  return {
    /**
     *
     * @param {string} annotStr annotation XML string
     * @returns {Promise<string>} Promise with transformed annotation
     */
    transformAnnotation: (annotStr) => {
      logger.debug('-- calling transformAnnotation')
      logger.silly(annotStr)
      return new Promise((resolve, reject) => {
        SaxonJS.getResource({
          text: annotStr,
          type: 'xml',
          encoding: 'utf8'
        })
          .then(xml => {
            // lightweight validity check (unlike the xsd validation)
            const isResultsNodePresent = SaxonJS.XPath.evaluate('/export/results', xml)
            if (isResultsNodePresent === null) {
              throw new Error('Well formed, invalid XML.')
            }
            const isAnnontationNodePresent = SaxonJS.XPath.evaluate('/export/results/annotation', xml)
            if (isAnnontationNodePresent === null) {
              throw new Error('XML contains no Annotation node. Annotation not found.')
            }
            return SaxonJS.transform({
              sourceNode: xml,
              stylesheetFileName: STYLESHEET_PATH,
              destination: 'serialized'
            }, 'async')
          }).then(output => {
            logger.silly(output.principalResult)
            resolve(output.principalResult)
          })
          .catch(err => {
            logger.error(err)
            reject(err)
          })
      })
    }
  }
}

module.exports = {
  create
}
