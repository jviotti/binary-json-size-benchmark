const assert = require('assert').strict
const fs = require('fs')
const jsonbinpack = require('../../vendor/jsonbinpack')

const BUFFER = fs.readFileSync(process.argv[2])
assert(fs.statSync(process.argv[2]).size === BUFFER.length)
const SCHEMA = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'))

jsonbinpack.compileSchema(SCHEMA).then((encoding) => {
  const result = jsonbinpack.decode(encoding, BUFFER)
  console.log(JSON.stringify(result, null, 2))
}).catch((error) => {
  throw error
})
