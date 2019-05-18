const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { and } = require('../src')

const tests = [
  {
    name: 'a.length === b.length',
    a: 'ff0f000f0f',
    b: 'f0f000ff00',
    expected: 'f000000f00',
    mutated: 'f000000f00'
  },
  {
    name: 'a.length > b.length',
    a: '0ff00f',
    b: '0f0f0fff0f',
    expected: '0f000f0000',
    mutated: '0f000f'
  },
  {
    name: 'a.length < b.length',
    a: '0f0f0fff0f',
    b: '0fff00',
    expected: '0f0f000000',
    mutated: '0f0f000000'
  }
]

describe('#and', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const b = Buffer.from(test.b, 'hex')
      const expected = Buffer.from(test.expected, 'hex')
      const result = and(a, b)

      assert.equalBytes(result, expected, `#and(${test.a}, ${test.b}) should equal ${test.expected}`)
    })
  }
})

describe('#and.mut', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const b = Buffer.from(test.b, 'hex')
      const mutated = Buffer.from(test.mutated, 'hex')
      const result = and.mut(a, b)

      assert.strictEqual(result, a, `#and.mut(a, b) should return a reference of a`)
      assert.equalBytes(result, mutated, `#and.mut${test.a}, ${test.b}) should equal ${test.mutated}`)
    })
  }
})
