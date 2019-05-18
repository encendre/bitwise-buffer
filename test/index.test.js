const chai = require('chai')

const { assert } = chai

const bb = require('../src')

describe('aliases', () => {
  it('leftShift', () => {
    assert.strictEqual(bb.leftShift, bb.lshift, '#lshift should be an aliases of #leftShift')
  })

  it('rightShift', () => {
    assert.strictEqual(bb.rightShift, bb.rshift, '#rshift should be an aliases of #rightShift')
  })
})

describe('mutAliases', () => {
  for (let prop in bb) {
    if (bb[prop].constructor === Function) {
      it(`#mut.${prop} - #${prop}.mut`, () => {
        assert.strictEqual(bb.mut[prop], bb[prop].mut, `#mut.${prop} should be an aliases of #${prop}.mut`)
      })
    }
  }
})
