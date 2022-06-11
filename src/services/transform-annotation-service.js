/**
 * transforms annotation's data
 */

const DUMMY_DATA =
`<?xml version="1.0" encoding="utf-8"?>
<InvoiceRegisters>
  <Invoices>
    <Payable>
      <InvoiceNumber>143453775</InvoiceNumber>
      <InvoiceDate>2019-03-01T00:00:00</InvoiceDate>
      <DueDate>2019-03-31T00:00:00</DueDate>
      <TotalAmount>2706.00</TotalAmount>
      <Notes/>
      <Iban>NO6513425245230</Iban>
      <Amount>2595.76</Amount>
      <Currency>NOK</Currency>
      <Vendor>InfoNet Workshop</Vendor>
      <VendorAddress>2423 KONGSVINGER Norway</VendorAddress>
      <Details>
        <Detail>
          <Amount>1936.59</Amount>
          <AccountId/>
          <Quantity>3</Quantity>
          <Notes>HPi Battery 4C 40WHr 2 BAH LI LA098241</Notes>
        </Detail>
        <Detail>
          <Amount>8308.56</Amount>
          <AccountId/>
          <Quantity>4</Quantity>
          <Notes>HP 11.6-inch HD WLED UWVA touchscreen display ass</Notes>
        </Detail>
    <Detail>
          <Amount>137.90</Amount>
          <AccountId/>
          <Quantity>1</Quantity>
          <Notes>Line item 2</Notes>
        </Detail>
      </Details>
    </Payable>
  </Invoices>
</InvoiceRegisters>`

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
        // reject(new Error('[transformAnnotation]: XML transformation not implemented'))
        resolve(DUMMY_DATA)
      })
    }
  }
}

module.exports = {
  create
}
