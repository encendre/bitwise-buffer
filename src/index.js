function buildExports (list, obj) {
  obj || (obj = {})
  obj.mut || (obj.mut = {})

  for (let file of list) {
    const { mutate, pure, aliases = [] } = require(file)

    aliases.push(pure.name)

    Object.defineProperty(pure, 'mut', { value: mutate })
    for (let alias of aliases) {
      Object.assign(obj, { [alias]: pure })
      Object.assign(obj.mut, { [alias]: mutate })
    }
  }

  return obj
}

buildExports([
  './and',
  './xor',
  './or',
  './nor',
  './not',
  './leftShift',
  './rightShift'
], module.exports)
