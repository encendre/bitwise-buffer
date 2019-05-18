function mutateOr (dest, src) {
  let i = dest.length < src.length ? src.length : dest.length

  while (i--) {
    dest[i] |= src[i]
  }

  return dest
}

function or (a, b) {
  if (a.length < b.length) [b, a] = [a, b]

  const dest = Buffer.from(a)

  return mutateOr(dest, b)
}

module.exports = {
  mutate: mutateOr,
  pure: or
}
