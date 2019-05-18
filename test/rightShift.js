const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { rightShift } = require('../src')

const tests = [
  {
    name: 'n % 8 = 0',
    a: 'ff0f000f0f',
    n: 16,
    fillWith: 0,
    expected: '0000ff0f00',
    mutated: '0000ff0f00'
  },
  {
    name: 'n === 4',
    a: 'ff0f00ff0f',
    n: 4,
    fillWith: 0,
    expected: '0ff0f00ff0',
    mutated: '0ff0f00ff0'
  },
  {
    name: 'n === 19',
    a: '95e25da2a5', // BigInt('0b1001010111100010010111011010001010100101').toString(16),
    n: 19,
    fillWith: 0,
    expected: '000012bc4b', // BigInt('0b0000000000000000000100101011110001001011').toString(16),
    mutated: '000012bc4b' // BigInt('0b0000000000000000000100101011110001001011').toString(16)
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
    expected: 'ffe5789768', // BigInt('0b1111111111100101011110001001011101101000').toString(16),
    mutated: 'ffe5789768' // BigInt('0b1111111111100101011110001001011101101000').toString(16)
  }
]

describe('#rightShift', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const n = test.n
      const fillWith = test.fillWith
      const expected = Buffer.from(test.expected, 'hex')
      const result = rightShift(a, n, fillWith)

      assert.equalBytes(result, expected, `#rightShift(${test.a}, ${test.n}, ${test.fillWith}) should equal ${test.expected}`)
    })
  }
})

describe('#rightShift.mut', () => {
  for (let test of tests) {
    it(test.name, () => {
      const a = Buffer.from(test.a, 'hex')
      const n = test.n
      const fillWith = test.fillWith
      const mutated = Buffer.from(test.mutated, 'hex')
      const result = rightShift.mut(a, n, fillWith)

      assert.strictEqual(result, a, `#rightShift.mut(a, ...) should return a reference of a`)
      assert.equalBytes(result, mutated, `#rightShift.mut(${test.a}, ${test.n}, ${test.fillWith}) should equal ${test.mutated}`)
    })
  }
})
