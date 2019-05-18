function mutateNot (dest) {
  let i = dest.length

  while (i--) {
    dest[i] = ~dest[i]
  }

  return dest
}

function not (buff) {
  const dest = Buffer.from(buff)

  return mutateNot(dest)
}

module.exports = {
  mutate: mutateNot,
  pure: not
}
