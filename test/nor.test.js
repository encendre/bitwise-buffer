const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { nor } = require('../src')

const tests = [
  {
    name: 'a.length === b.length',
    a: 'ff0f000f0f',
    b: 'f0f000ff00',
    expected: '0000ff00f0',
    mutated: '0000ff00f0'
  },
  {
    name: 'a.length > b.length',
    a: '0ff00f',
    b: '0f0f0fff0f',
    expected: 'f000f000f0',
    mutated: 'f000f0'
  },
  {
    name: 'a.length < b.length',
    a: '0f0f0fff0f',
    b: '0fff00',
    expected: 'f000f000f0',
    mutated: 'f000f000f0'
  }
]

describe('#nor', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const b = Buffer.from(test.b, 'hex')
      const expected = Buffer.from(test.expected, 'hex')
      const result = nor(a, b)

      assert.equalBytes(result, expected, `#nor(${test.a}, ${test.b}) should equal ${test.expected}`)
    })
  }
})

describe('#nor.mut', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const b = Buffer.from(test.b, 'hex')
      const mutated = Buffer.from(test.mutated, 'hex')
      const result = nor.mut(a, b)

      assert.strictEqual(result, a, `#nor.mut(a, b) should return a reference of a`)
      assert.equalBytes(result, mutated, `#nor.mut${test.a}, ${test.b}) should equal ${test.mutated}`)
    })
  }
})
