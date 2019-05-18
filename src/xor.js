function mutateXor (dest, src) {
  let i = dest.length < src.length ? src.length : dest.length

  while (i--) {
    dest[i] ^= src[i]
  }

  return dest
}

function xor (a, b) {
  if (a.length < b.length) [b, a] = [a, b]

  const dest = Buffer.from(a)

  return mutateXor(dest, b)
}

module.exports = {
  mutate: mutateXor,
  pure: xor
}
