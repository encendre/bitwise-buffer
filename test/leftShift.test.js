const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { leftShift } = require('../src')

const tests = [
  {
    name: 'n % 8 = 0',
    a: 'ff0f000f0f',
    n: 16,
    fillWith: 0,
    expected: '000f0f0000',
    mutated: '000f0f0000'
  },
  {
    name: 'n === 4',
    a: 'ff0f00ff0f',
    n: 4,
    fillWith: 0,
    expected: 'f0f00ff0f0',
    mutated: 'f0f00ff0f0'
  },
  {
    name: 'n === 19',
    a: '95e25da2a5', // BigInt('0b1001010111100010010111011010001010100101').toString(16),
    n: 19,
    fillWith: 0,
    expected: 'ed15280000', // BigInt('0b1110110100010101001010000000000000000000').toString(16),
    mutated: 'ed15280000' // BigInt('0b1110110100010101001010000000000000000000').toString(16)
  },
  {
    name: 'n === 0',
    a: 'ff0f00ff0f',
    n: 0,
    fillWith: 0,
    expected: 'ff0f00ff0f',
    mutated: 'ff0f00ff0f'
  },
  {
    name: 'n >= a.length * 8',
    a: 'ff0f00ff0f',
    n: 40,
    fillWith: 0,
    expected: '0000000000',
    mutated: '0000000000'
  },
  {
    name: 'fillWith = 1',
    a: '95e25da2a5', // BigInt('0b1001010111100010010111011010001010100101').toString(16),
    n: 10,
    fillWith: 1,
    expected: '89768a97ff', // BigInt('0b1000100101110110100010101001011111111111').toString(16),
    mutated: '89768a97ff' // BigInt('0b1000100101110110100010101001011111111111').toString(16)
  }
]

describe('#leftShift', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const n = test.n
      const fillWith = test.fillWith
      const expected = Buffer.from(test.expected, 'hex')
      const result = leftShift(a, n, fillWith)

      assert.equalBytes(result, expected, `#leftShift(${test.a}, ${test.n}, ${test.fillWith}) should equal ${test.expected}`)
    })
  }
})

describe('#leftShift.mut', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const n = test.n
      const fillWith = test.fillWith
      const mutated = Buffer.from(test.mutated, 'hex')
      const result = leftShift.mut(a, n, fillWith)

      assert.strictEqual(result, a, `#leftShift.mut(a, ...) should return a reference of a`)
      assert.equalBytes(result, mutated, `#leftShift.mut(${test.a}, ${test.n}, ${test.fillWith}) should equal ${test.mutated}`)
    })
  }
})
