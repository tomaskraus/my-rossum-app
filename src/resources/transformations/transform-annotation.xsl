<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <InvoiceRegisters>
      <Invoices>
        <Payable>
          <xsl:apply-templates select="/export/results/annotation/content" />
        </Payable>
      </Invoices>
    </InvoiceRegisters>
  </xsl:template>

  <xsl:template match="//section[@schema_id='line_items_section']">
    <Details></Details>
  </xsl:template>

  <xsl:template match="content">
    <InvoiceNumber>
      <xsl:value-of select="//datapoint[@schema_id='invoice_id']" />
    </InvoiceNumber>
    <InvoiceDate>
      <xsl:value-of select="format-date(//datapoint[@schema_id='date_issue'], '[Y001]-[M01]-[D01]T00:00:00')" />
    </InvoiceDate>
    <DueDate>
      <xsl:value-of select="format-date(//datapoint[@schema_id='date_due'], '[Y001]-[M01]-[D01]T00:00:00')" />
    </DueDate>
    <TotalAmount>
      <xsl:value-of select="//datapoint[@schema_id='amount_total']" />
    </TotalAmount>
    <Notes>
      <xsl:value-of select="//datapoint[@schema_id='notes']" />
    </Notes>
    <Iban>
      <xsl:value-of select="//datapoint[@schema_id='iban']" />
    </Iban>
    <Amount>
      <xsl:value-of select="//datapoint[@schema_id='amount_total_tax']" />
    </Amount>
    <Currency>
      <xsl:value-of select="//datapoint[@schema_id='currency']" />
    </Currency>
    <Vendor>
      <xsl:value-of select="//datapoint[@schema_id='sender_name']" />
    </Vendor>
    <VendorAddress>
      <xsl:value-of select="//datapoint[@schema_id='sender_address']" />
    </VendorAddress>

    <Details>
      <xsl:for-each select="section[@schema_id='line_items_section']/multivalue/tuple[@schema_id='line_item']">
        <Detail>
          <Amount>
            <xsl:value-of select="datapoint[@schema_id='item_total_base']" />
          </Amount>
          <AccountId>
            <!-- TODO: find the original value -->
          </AccountId>
          <Quantity>
            <xsl:value-of select="datapoint[@schema_id='item_quantity']" />
          </Quantity>
          <Notes>
            <xsl:value-of select="datapoint[@schema_id='item_description']" />
          </Notes>
        </Detail>
      </xsl:for-each>
    </Details>
  </xsl:template>


</xsl:stylesheet>