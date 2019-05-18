function mutateNor (dest, src) {
  let i = dest.length < src.length ? src.length : dest.length

  while (i--) {
    dest[i] = ~(dest[i] | src[i])
  }

  return dest
}

function nor (a, b) {
  if (a.length < b.length) [b, a] = [a, b]

  const dest = Buffer.from(a)

  return mutateNor(dest, b)
}

module.exports = {
  mutate: mutateNor,
  pure: nor
}
