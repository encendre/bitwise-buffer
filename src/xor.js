function mutateXor (a, b) {
  let i = Math.max(a.length, b.length)

  while (i--) {
    a[i] ^= b[i]
  }

  return a
}

function xor (a, b) {
  let i = Math.max(a.length, b.length)

  const dest = Buffer.allocUnsafe(i)

  while (i--) {
    dest[i] = a[i] ^ b[i]
  }
  return dest
}

module.exports = {
  mutate: mutateXor,
  pure: xor
}
