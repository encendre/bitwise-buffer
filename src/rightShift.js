function mutateRightShift (a, n, fillWith = 0) {
  const padding = fillWith ? 0xff : 0x00
  const mod = n & 7 // n % 8
  const div = n >> 3 // Math.floor(n / 8)

  let i = a.length - 1

  while (i - div - 1 >= 0) {
    a[i] = (a[i - div] >> mod) | (a[i - div - 1] << (8 - mod))
    i -= 1
  }

  a[i] = (a[i - div] >> mod) | (padding << (8 - mod))
  i -= 1

  while (i >= 0) {
    a[i] = padding
    i -= 1
  }

  return a
}

function rightShift (a, n, fillWith = 0) {
  const padding = fillWith ? 0xff : 0x00
  const mod = n & 7 // n % 8
  const div = n >> 3 // Math.floor(n / 8)

  const dest = Buffer.allocUnsafe(a.length)

  let i = a.length - 1

  while (i - div - 1 >= 0) {
    dest[i] = (a[i - div] >> mod) | (a[i - div - 1] << (8 - mod))
    i -= 1
  }

  dest[i] = (a[i - div] >> mod) | (padding << (8 - mod))
  i -= 1

  while (i >= 0) {
    dest[i] = padding
    i -= 1
  }

  return dest
}

module.exports = {
  aliases: ['rshift'],
  mutate: mutateRightShift,
  pure: rightShift
}
