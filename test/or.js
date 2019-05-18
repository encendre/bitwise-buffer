const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { or } = require('../src')

const tests = [
  {
    name: 'a.length === b.length',
    a: 'ff0f000f0f',
    b: 'f0f000ff00',
    expected: 'ffff00ff0f',
    mutated: 'ffff00ff0f'
  },
  {
    name: 'a.length > b.length',
    a: '0ff00f',
    b: '0f0f0fff0f',
    expected: '0fff0fff0f',
    mutated: '0fff0f'
  },
  {
    name: 'a.length < b.length',
    a: '0f0f0fff0f',
    b: '0fff00',
    expected: '0fff0fff0f',
    mutated: '0fff0fff0f'
  }
]

describe('#or', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const b = Buffer.from(test.b, 'hex')
      const expected = Buffer.from(test.expected, 'hex')
      const result = or(a, b)

      assert.equalBytes(result, expected, `#or(${test.a}, ${test.b}) should equal ${test.expected}`)
    })
  }
})

describe('#or.mut', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const b = Buffer.from(test.b, 'hex')
      const mutated = Buffer.from(test.mutated, 'hex')
      const result = or.mut(a, b)

      assert.strictEqual(result, a, `#or.mut(a, b) should return a reference of a`)
      assert.equalBytes(result, mutated, `#or.mut${test.a}, ${test.b}) should equal ${test.mutated}`)
    })
  }
})
