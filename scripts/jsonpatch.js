const fs = require('fs')
const jsonpatch = require('fast-json-patch')

const chunks = []

process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  chunks.push(chunk)
})

process.stdin.on('end', () => {
  const document = JSON.parse(chunks.join())
  const patch = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
  const result = jsonpatch.applyPatch(document, patch, {
    mutateDocument: false
  }).newDocument
  console.log(JSON.stringify(result, null, 2))
})
