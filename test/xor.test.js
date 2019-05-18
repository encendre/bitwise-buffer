const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { xor } = require('../src')

const tests = [
  {
    name: 'a.length === b.length',
    a: 'ff0f000f0f',
    b: 'f0f000ff00',
    expected: '0fff00f00f',
    mutated: '0fff00f00f'
  },
  {
    name: 'a.length > b.length',
    a: '0ff00f',
    b: '0f0f0fff0f',
    expected: '00ff00ff0f',
    mutated: '00ff00'
  },
  {
    name: 'a.length < b.length',
    a: '0f0f0fff0f',
    b: '0fff00',
    expected: '00f00fff0f',
    mutated: '00f00fff0f'
  }
]

describe('#xor', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const b = Buffer.from(test.b, 'hex')
      const expected = Buffer.from(test.expected, 'hex')
      const result = xor(a, b)

      assert.equalBytes(result, expected, `#xor(${test.a}, ${test.b}) should equal ${test.expected}`)
    })
  }
})

describe('#xor.mut', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const b = Buffer.from(test.b, 'hex')
      const mutated = Buffer.from(test.mutated, 'hex')
      const result = xor.mut(a, b)

      assert.strictEqual(result, a, `#xor.mut(a, b) should return a reference of a`)
      assert.equalBytes(result, mutated, `#xor.mut${test.a}, ${test.b}) should equal ${test.mutated}`)
    })
  }
})
