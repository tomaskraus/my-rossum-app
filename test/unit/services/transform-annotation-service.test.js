const logger = require('./../../../src/middlewares/logging')
const tas = require('./../../../src/services/transform-annotation-service').create(logger)
const xpathHelper = require('../../../src/middlewares/xpath-helper')

// const RESOURCE_LOCATION = './test/unit/resources/downloaded.xml'

let INPUT_XML_STRING_API
let INPUT_XML_STRING_EMPTY
let INPUT_XML_STRING_INVALID

describe('XML tests', () => {
  beforeAll(() => {
    INPUT_XML_STRING_API =
      `<?xml version="1.0" encoding="utf-8"?>
      <export>
        <results>
          <annotation url="https://elis.rossum.ai/api/v1/annotations/15419348">
            <status>failed_import</status>
            <arrived_at>2022-05-19T12:57:28.712939Z</arrived_at>
            <document url="https://elis.rossum.ai/api/v1/documents/15964845">
              <file_name>Sample Invoice.pdf</file_name>
              <file>https://elis.rossum.ai/api/v1/documents/15964845/content</file>
            </document>
            <modifier url="https://elis.rossum.ai/api/v1/users/136383">
              <username>kitiw81309@cupbest.com</username>
            </modifier>
            <schema url="https://elis.rossum.ai/api/v1/schemas/3182322"></schema>
            <metadata>
              <item key="sampleDocument">true</item>
            </metadata>
            <content>
              <section schema_id="invoice_info_section">
                <datapoint rir_confidence="0.9809681765205903" schema_id="invoice_id" type="string">143453775</datapoint>
                <datapoint rir_confidence="0.9633308578148995" schema_id="date_issue" type="date">2019-03-01</datapoint>
                <datapoint rir_confidence="0.9439578858341987" schema_id="date_due" type="date">2019-03-31</datapoint>
                <datapoint rir_confidence="0.9074813333997684" schema_id="iban" type="string">NO6513425245230</datapoint>
              </section>
              <section schema_id="payment_info_section"></section>
              <section schema_id="amounts_section">
                <datapoint rir_confidence="0.9340719220592579" schema_id="amount_total" type="number">12978.81</datapoint>
                <datapoint rir_confidence="0.810763075581105" schema_id="amount_total_tax" type="number">2595.76</datapoint>
                <datapoint rir_confidence="0.8121191679979197" schema_id="amount_total_base" type="number">10383.05</datapoint>
                <datapoint rir_confidence="0.9901123642921448" schema_id="currency" type="enum">nok</datapoint>
                <multivalue schema_id="tax_details">
                  <tuple schema_id="tax_detail"></tuple>
                </multivalue>
              </section>
              <section schema_id="vendor_section">
                <datapoint rir_confidence="0.39595668249840227" schema_id="sender_name" type="string">InfoNet Workshop</datapoint>
                <datapoint rir_confidence="0.8500041587609529" schema_id="sender_address" type="string">Nygata 43
      2423 KONGSVINGER
      NORVAY</datapoint>
                <datapoint schema_id="sender_ic" type="string"></datapoint>
                <datapoint schema_id="sender_dic" type="string">NO9756463241MTA</datapoint>
                <datapoint schema_id="recipient_name" type="string"></datapoint>
                <datapoint schema_id="recipient_address" type="string">Nygata 43
      2423 KONGSVINGER
      NORVAY</datapoint>
                <datapoint schema_id="recipient_ic" type="string"></datapoint>
                <datapoint schema_id="recipient_dic" type="string"></datapoint>
              </section>
              <section schema_id="other_section">
                <datapoint schema_id="notes" type="string"></datapoint>
              </section>
              <section schema_id="line_items_section">
                <multivalue schema_id="line_items">
                  <tuple schema_id="line_item">
                    <datapoint schema_id="item_description" type="string">HPi Battery 4C 40WHr 2 BAH LI LA098241</datapoint>
                    <datapoint schema_id="item_quantity" type="number">3</datapoint>
                    <datapoint schema_id="item_amount_base" type="number">645.53</datapoint>
                    <datapoint schema_id="item_amount" type="number"></datapoint>
                    <datapoint schema_id="item_total_base" type="number">1936.59</datapoint>
                    <datapoint schema_id="item_amount_total" type="number"></datapoint>
                  </tuple>
                  <tuple schema_id="line_item">
                    <datapoint schema_id="item_description" type="string">HP 11.6-inch HD WLED UWVA touchscreen display</datapoint>
                    <datapoint schema_id="item_quantity" type="number">4</datapoint>
                    <datapoint schema_id="item_amount_base" type="number">2077.14</datapoint>
                    <datapoint schema_id="item_amount" type="number"></datapoint>
                    <datapoint schema_id="item_total_base" type="number">8308.56</datapoint>
                    <datapoint schema_id="item_amount_total" type="number"></datapoint>
                  </tuple>
                  <tuple schema_id="line_item">
                    <datapoint schema_id="item_description" type="string">Freight</datapoint>
                    <datapoint schema_id="item_quantity" type="number">1</datapoint>
                    <datapoint schema_id="item_amount_base" type="number">137.90</datapoint>
                    <datapoint schema_id="item_amount" type="number"></datapoint>
                    <datapoint schema_id="item_total_base" type="number">137.90</datapoint>
                    <datapoint schema_id="item_amount_total" type="number"></datapoint>
                  </tuple>
                </multivalue>
              </section>
            </content>
            <automated>false</automated>
            <modified_at>2022-06-13T10:37:58.892300Z</modified_at>
            <assigned_at>2022-06-13T10:33:16.768738Z</assigned_at>
          </annotation>
        </results>
        <pagination>
          <next></next>
          <previous></previous>
          <total>1</total>
          <total_pages>1</total_pages>
        </pagination>
      </export>`

    INPUT_XML_STRING_EMPTY =
      `<?xml version="1.0" encoding="utf-8"?>
<export>
  <results></results>
  <pagination>
    <next></next>
    <previous></previous>
    <total>0</total>
    <total_pages>1</total_pages>
  </pagination>
</export>`

    INPUT_XML_STRING_INVALID =
      `<?xml version="1.0" encoding="UTF-8"?>
    <catalog>
      <cd>
        <title>ABC</title>
        <price>10.90</price>
      </cd>
      </catalog>`
  })

  test('The input xml string is a valid xml, with a "datapoint" element with "schema_id" attribute with value "document_id".', () => {
    const xh = xpathHelper.create(INPUT_XML_STRING_API)
    expect(xh.valueOf("/export/results/annotation/content/section/datapoint[@schema_id='invoice_id']")).toBe('143453775')
  })

  test('Transformed document contains an "invoiceNumber" element, with a value that matches the value of "//datapoint[@schema_id=\'invoice_id\']" of the input xml.', () => {
    return tas.transformAnnotation(INPUT_XML_STRING_API).then(xmlString => {
      const xh = xpathHelper.create(xmlString)
      expect(xh.exists('/InvoiceRegisters/Invoices/Payable/InvoiceNumber')).toBeTruthy()
      expect(xh.valueOf('/InvoiceRegisters/Invoices/Payable/InvoiceNumber')).toBe('143453775')
    })
  })

  test('Contains all the required nodes, with the right data values.', () => {
    return tas.transformAnnotation(INPUT_XML_STRING_API).then(xmlString => {
      const xh = xpathHelper.create(xmlString)
      const payable = xh.context('/InvoiceRegisters/Invoices/Payable')
      expect(xh.valueOf('./InvoiceNumber', payable)).toBe('143453775')
      expect(xh.valueOf('./InvoiceDate', payable)).toBe('2019-03-01T00:00:00')
      expect(xh.valueOf('./DueDate', payable)).toBe('2019-03-31T00:00:00')
      expect(xh.valueOf('./TotalAmount', payable)).toBe('12978.81')

      expect(xh.exists('./Notes', payable)).toBe(true)
      expect(xh.valueOf('./Iban', payable)).toBe('NO6513425245230')
      expect(xh.valueOf('./Amount', payable)).toBe('2595.76')
      expect(xh.valueOf('./Currency', payable)).toBe('nok')
      expect(xh.valueOf('./Vendor', payable)).toBe('InfoNet Workshop')
      expect(xh.valueOf('./VendorAddress', payable)).toBe(`Nygata 43
      2423 KONGSVINGER
      NORVAY`)

      const details = xh.context('./Details', payable)
      expect(xh.result('count(child::*)', details)).toEqual(3)
      expect(xh.valueOf('./Detail[2]/Amount', details)).toEqual('8308.56')
      expect(xh.exists('./Detail[2]/AccountId', details)).toEqual(true)
      expect(xh.valueOf('./Detail[2]/Quantity', details)).toEqual('4')
      expect(xh.valueOf('./Detail[2]/Notes', details)).toEqual('HP 11.6-inch HD WLED UWVA touchscreen display')
    })
  })

  test('A not-so-well-formed input string throws an exception', () => {
    expect.assertions(1)
    return tas.transformAnnotation('abcd')
      .catch(err => {
        expect(err.message).not.toBeUndefined()
      })
  })

  test('Well formed, invalid xml input string throws an exception', () => {
    expect.assertions(1)
    return tas.transformAnnotation(INPUT_XML_STRING_INVALID)
      .catch(err => {
        expect(err.message).toMatch('invalid')
      })
  })

  test('Valid xml input string with no annotations throws an exception', () => {
    expect.assertions(1)
    return tas.transformAnnotation(INPUT_XML_STRING_EMPTY)
      .catch(err => {
        expect(err.message).toMatch('not found')
      })
  })
})
