function mutateOr (a, b) {
  let i = Math.max(a.length, b.length)

  while (i--) {
    a[i] |= b[i]
  }

  return a
}

function or (a, b) {
  let i = Math.max(a.length, b.length)

  const dest = Buffer.allocUnsafe(i)

  while (i--) {
    dest[i] = a[i] | b[i]
  }
  return dest
}
module.exports = {
  mutate: mutateOr,
  pure: or
}
