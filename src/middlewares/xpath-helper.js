/**
 * eases the use of xpath (xml)
 **/

const Dom = require('xmldom').DOMParser
const xpath = require('xpath')

/**
 * @param {string} xmlString A string containing well-formed XML.
 * @returns {object} An object with methods for easier XPath manipulation on a document created from that xmlString.
 */
const create = (xmlString) => {
  const doc = new Dom().parseFromString(xmlString)

  const result = (xpathExpressionStr, contextNode = doc) => xpath.select(xpathExpressionStr, contextNode)

  return {
    /**
   * @param {string} xpathExpressionStr A valid XPath expression.
   * @param {*} contextNode Optional. If specified, is used as the context node for evaluating the XPath expression.
   * @returns {*} A result of that XPath expression. It can be an array of nodes, single node, boolean, number, string...
   * Exactly what an xpath.select returns. See the 'xpath' npm package.
   */
    result,

    /**
   * @param {string} xpathExpressionStr A valid XPath expression.
   * @param {*} contextNode Optional. If specified, is used as the context node for evaluating the XPath expression.
   * @returns {*} A context node of that XPath expression.
   * Note: can return unexpected result if the XPath expression does not return a node-like value.
   */
    context: (xpathExpressionStr, contextNode = doc) => result(xpathExpressionStr, contextNode)[0],

    /**
     * @param {string} xpathExpressionStr A valid XPath expression.
     * @param {*} contextNode Optional. If specified, is used as the context node for evaluating the XPath expression.
     * @returns {boolean} true, if such node exists. False otherwise.
     */
    exists: (xpathExpressionStr, contextNode = doc) => result(xpathExpressionStr, contextNode).length > 0,

    /**
     * @param {string} xpathExpressionStr A valid XPath node selection expression.
     * @param {*} contextNode Optional. If specified, is used as the context node for evaluating the XPath expression.
     * @returns {*} Value of the node content selected by xpathExpressionStr.
     * Note: can return unexpected result if the node content is not an atomic value.
     */
    valueOf: (xpathExpressionStr, contextNode = doc) => {
      const val = result(xpathExpressionStr, contextNode)
      if (typeof val === 'object') {
        if (val[0].firstChild) {
          return val[0].firstChild.data
        }
        return val[0].firstChild
      }
      return val
    }
  }
}

module.exports = {
  create
}
