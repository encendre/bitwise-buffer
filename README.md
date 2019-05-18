# buffer-bitwise

A simple module for bitwise operations on buffers.

## Install

```bash
npm i buffer-bitwise
```

## Example

```javascript
const bitwiseBuffer = require('bitwise-buffer)
const { xor, and, or, nor, not, leftShift, rightShift, lshift, rshift } = bitwiseBuffer

const a = Buffer.from('0f0f', 'hex')
const b = Buffer.from('ff00', 'hex')

xor(a, b).toString('hex') // 'f00f'
or(a, b).toString('hex') // 'ff0f'
and(a, b).toString('hex') // '0f00'
nor(a, b).toString('hex') // '00f0'
not(a).toString('hex') // 'f0f0'

leftShift(a, 4).toString('hex') // 'f0f0'
rightShift(a, 4).toString('hex') // '00f0'

// for shift operator you can chose to fill with 1
leftShift(a, 4, 1).toString('hex') // 'f0ff'

// lshift is an alias of leftShift
lshift === leftShift // true

// rshift is an alias of rightShift
rshift === rightShift // true

// for binary operator when operand length are differents
const c = Buffer.from('ff00fff0f', 'hex')

xor(a, c).toString('hex') // 'f00ffff0f'
xor(c, a).toString('hex') // 'f00ffff0f'

// all operator allocate new buffer
// for mutable operator use operator.mut
const d = not.mut(a)
a === d // true
a.toString('hex') // 'f0f0'

// for binary operator
const e = Buffer.from('0ff0', 'hex')
const f = Buffer.from('f0f0ff0f00', 'hex')

const g = xor.mut(e, f)
g === e // true
e.toString('hex') // 'ff00'

// #method.mut is an alias of #mut.method

bitwiseBuffer.xor.mut === bitwiseBuffer.mut.xor // true

```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
[travis-image]: https://img.shields.io/travis/live-js/live-xxx/master.svg
[travis-url]: https://travis-ci.org/live-js/live-xxx
[coveralls-image]: https://img.shields.io/coveralls/live-js/live-xxx/master.svg
[coveralls-url]: https://coveralls.io/r/live-js/live-xxx?branch=master