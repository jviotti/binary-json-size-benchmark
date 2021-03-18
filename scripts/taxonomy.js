const fs = require('fs')
const jsontoolkit = require('jsontoolkit')

const DOCUMENT = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))

const taxonomy = jsontoolkit.qualify(
  jsontoolkit.summarize(
    jsontoolkit.analyze(DOCUMENT)))

console.log(taxonomy.join(' '))
