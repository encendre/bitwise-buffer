function mutateAnd (dest, src) {
  let i = dest.length < src.length ? src.length : dest.length

  while (i--) {
    dest[i] &= src[i]
  }

  return dest
}

function and (a, b) {
  if (a.length < b.length) [b, a] = [a, b]

  const dest = Buffer.from(a)

  return mutateAnd(dest, b)
}

module.exports = {
  mutate: mutateAnd,
  pure: and
}
