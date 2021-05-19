const fs = require('fs')
const jsonbinpack = require('../../../jsonbinpack')

const BUFFER = fs.readFileSync(process.argv[2])
const SCHEMA = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'))
const result = jsonbinpack.decode(jsonbinpack.compileEncodingSchema(SCHEMA), BUFFER)
console.log(JSON.stringify(result, null, 2))
