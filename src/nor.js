function mutateNor (a, b) {
  let i = Math.max(a.length, b.length)

  while (i--) {
    a[i] = ~(a[i] | b[i])
  }

  return a
}

function nor (a, b) {
  let i = Math.max(a.length, b.length)

  const dest = Buffer.allocUnsafe(i)

  while (i--) {
    dest[i] = ~(a[i] | b[i])
  }
  return dest
}

module.exports = {
  mutate: mutateNor,
  pure: nor
}
