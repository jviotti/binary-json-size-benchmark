const fs = require('fs')
const jsonstats = require('jsonbinpack/dist/contrib/jsonstats')

const DOCUMENT = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))

const taxonomy = jsonstats.qualify(
  jsonstats.summarize(
    jsonstats.analyze(DOCUMENT)))

console.log(taxonomy.join(' '))
