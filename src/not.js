function mutateNot (dest) {
  let i = dest.length

  while (i--) {
    dest[i] = ~dest[i]
  }

  return dest
}

function not (buff) {
  let i = buff.length
  const dest = Buffer.allocUnsafe(i)

  while (i--) {
    dest[i] = ~buff[i]
  }

  return dest
}

module.exports = {
  mutate: mutateNot,
  pure: not
}
