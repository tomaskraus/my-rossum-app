const logger = require('./../../../src/middlewares/logging')
const tas = require('./../../../src/services/transform-annotation-service').create(logger)

// TODO: complete
test('example test', () => {
  return tas.transformAnnotation('abcd').then(data => {
    expect(data).toBe('abcd')
  })
})


