const assert = require('assert').strict
const fs = require('fs')
const jsonbinpack = require('../../../jsonbinpack')

const DOCUMENT = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const SCHEMA = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'))

jsonbinpack.compileSchema(SCHEMA).then((encoding) => {
  const buffer = jsonbinpack.encode(encoding, DOCUMENT)
  fs.writeFileSync(process.argv[4], buffer)
  assert(fs.statSync(process.argv[4]).size === buffer.length)
}).catch((error) => {
  throw error
})
