const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { not } = require('../src')

const tests = [
  {
    name: 'basic test',
    a: 'ff0f000f0f',
    expected: '00f0fff0f0',
    mutated: '00f0fff0f0'
  }
]

describe('#not', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const expected = Buffer.from(test.expected, 'hex')
      const result = not(a)

      assert.equalBytes(result, expected, `#not(${test.a}) should equal ${test.expected}`)
    })
  }
})

describe('#not.mut', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const mutated = Buffer.from(test.mutated, 'hex')
      const result = not.mut(a)

      assert.strictEqual(result, a, `#not.mut(a) should return a reference of a`)
      assert.equalBytes(result, mutated, `#not.mut${test.a}) should equal ${test.mutated}`)
    })
  }
})
