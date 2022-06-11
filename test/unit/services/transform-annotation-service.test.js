const Dom = require('xmldom').DOMParser
const xpath = require('xpath')

const logger = require('./../../../src/middlewares/logging')
const tas = require('./../../../src/services/transform-annotation-service').create(logger)

// const RESOURCE_LOCATION = './test/unit/resources/downloaded.xml'

let INPUT_XML_STRING
let INPUT_XML_STRING_EMPTY
let INPUT_XML_STRING_INVALID

describe('XML tests', () => {
  beforeAll(() => {
    INPUT_XML_STRING =
      `<?xml version="1.0" encoding="utf-8"?>
<export>
    <results>
        <annotation url="https://elis.rossum.ai/api/v1/annotations/2451971">
            <status>exported</status>
            <arrived_at>2020-07-15T06:43:23.028579Z</arrived_at>
            <exported_at>2021-03-08T06:18:30.682878Z</exported_at>
            <document url="https://elis.rossum.ai/api/v1/documents/2453838">
                <file_name>EU Marketing Invoice (Norway).pdf</file_name>
                <file>https://elis.rossum.ai/api/v1/documents/2453838/content</file>
            </document>
            <modifier url="https://elis.rossum.ai/api/v1/users/13564">
                <username>test_578459@elis.rossum.ai</username>
            </modifier>
            <schema url="https://elis.rossum.ai/api/v1/schemas/176091"></schema>
            <metadata></metadata>
            <content>
                <section schema_id="invoice_info_section">
                    <datapoint rir_confidence="0.9771588350454424" schema_id="invoice_id" type="string">143453775</datapoint>
                    <datapoint rir_confidence="0.9633343080893669" schema_id="date_issue" type="date">2019-03-01</datapoint>
                    <datapoint rir_confidence="0.9276531531670439" schema_id="date_due" type="date">2019-03-31</datapoint>
                    <datapoint rir_confidence="0.8970364740042044" schema_id="iban" type="string">NO6513425245230</datapoint>
                </section>
                <section schema_id="amounts_section">
                    <datapoint rir_confidence="0.9252583542257525" schema_id="amount_total" type="number">12978.81</datapoint>
                    <datapoint rir_confidence="0.960040642328732" schema_id="amount_total_tax" type="number">2595.76</datapoint>
                    <datapoint schema_id="amount_total_base" type="number"></datapoint>
                    <datapoint rir_confidence="0.6738755702972412" schema_id="currency" type="enum">nok</datapoint>
                    <multivalue schema_id="vat_details"></multivalue>
                </section>
                <section schema_id="vendor_section">
                    <datapoint rir_confidence="0.5393862589945768" schema_id="sender_name" type="string">InfoNet Workshop</datapoint>
                    <datapoint rir_confidence="0.9061709945951922" schema_id="sender_address" type="string">2423 KONGSVINGER
Norway</datapoint>
                    <datapoint schema_id="sender_ic" type="string"></datapoint>
                    <datapoint schema_id="sender_dic" type="string"></datapoint>
                    <datapoint schema_id="recipient_name" type="string"></datapoint>
                    <datapoint rir_confidence="0.93205490037382" schema_id="recipient_address" type="string"></datapoint>
                    <datapoint schema_id="recipient_ic" type="string"></datapoint>
                    <datapoint schema_id="recipient_dic" type="string"></datapoint>
                </section>
                <section schema_id="others_section"></section>
                <section schema_id="line_items_section">
                    <multivalue schema_id="line_items">
                        <tuple schema_id="line_item">
                            <datapoint schema_id="item_description" type="string">HPi Battery 4C 40WHr 2 BAH LI LA098241</datapoint>
                            <datapoint schema_id="item_quantity" type="number">3</datapoint>
                            <datapoint schema_id="item_amount_base" type="number"></datapoint>
                            <datapoint schema_id="item_rate" type="number"></datapoint>
                            <datapoint schema_id="item_amount" type="number">645.53</datapoint>
                            <datapoint schema_id="item_amount_total_base" type="number"></datapoint>
                            <datapoint schema_id="item_amount_total" type="number">1936.59</datapoint>
                        </tuple>
                        <tuple schema_id="line_item">
                            <datapoint schema_id="item_description" type="string">HP 11.6-inch HD WLED UWVA touchscreen display ass</datapoint>
                            <datapoint schema_id="item_quantity" type="number">4</datapoint>
                            <datapoint schema_id="item_amount_base" type="number"></datapoint>
                            <datapoint schema_id="item_rate" type="number"></datapoint>
                            <datapoint schema_id="item_amount" type="number">2077.14</datapoint>
                            <datapoint schema_id="item_amount_total_base" type="number"></datapoint>
                            <datapoint schema_id="item_amount_total" type="number">8308.56</datapoint>
                        </tuple>
                        <tuple schema_id="line_item">
                            <datapoint schema_id="item_description" type="string">fre-ghti</datapoint>
                            <datapoint schema_id="item_quantity" type="number">1</datapoint>
                            <datapoint schema_id="item_amount_base" type="number"></datapoint>
                            <datapoint schema_id="item_rate" type="number"></datapoint>
                            <datapoint schema_id="item_amount" type="number">137.90</datapoint>
                            <datapoint schema_id="item_amount_total_base" type="number"></datapoint>
                            <datapoint schema_id="item_amount_total" type="number">137.90</datapoint>
                        </tuple>
                    </multivalue>
                </section>
            </content>
            <automated>false</automated>
            <modified_at>2021-03-08T06:18:20.940441Z</modified_at>
            <assigned_at>2021-03-08T06:17:17.554572Z</assigned_at>
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
    const doc = new Dom().parseFromString(INPUT_XML_STRING)
    const nodes = xpath.select("/export/results/annotation/content/section/datapoint[@schema_id='invoice_id']", doc)
    expect(nodes[0].firstChild.data).not.toBeNull()
    expect(nodes[0].firstChild.data).toBe('143453775')
  })

  test('Transformed document contains an "invoiceNumber" element, with a value that matches the value of "//datapoint[@schema_id=\'invoice_id\']" of the input xml.', () => {
    return tas.transformAnnotation(INPUT_XML_STRING).then(data => {
      const doc = new Dom().parseFromString(data)
      const nodes = xpath.select('/InvoiceRegisters/Invoices/Payable/InvoiceNumber', doc)
      expect(nodes[0].firstChild.data).not.toBeNull()
      expect(nodes[0].firstChild.data).toBe('143453775')
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
