const fs = require('fs')
const jsonbinpack = require('../../../jsonbinpack')

const DOCUMENT = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const SCHEMA = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'))
const buffer = jsonbinpack.encode(jsonbinpack.compileEncodingSchema(SCHEMA), DOCUMENT)
fs.writeFileSync(process.argv[4], buffer)
