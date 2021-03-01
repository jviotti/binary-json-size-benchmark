const fs = require('fs')
const BSON = require('bson')

const DOCUMENT = fs.readFileSync(process.argv[2], 'utf8')
const buffer = BSON.serialize(JSON.parse(DOCUMENT))
fs.writeFileSync(process.argv[3], buffer)
