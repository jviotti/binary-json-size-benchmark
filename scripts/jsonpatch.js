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

  // A hack to extend JSON Patch to be able to convert an array
  // into an object, something that this implementation doesn't
  // seem to support.
  if (patch.length === 1 && Array.isArray(document) &&
    patch[0].op === 'move' && patch[0].from === '/') {
    const destination = patch[0].path.split('/').slice(1)
    if (destination.length === 1) {
      console.log(JSON.stringify({
        [destination[0]]: document
      }, null, 2))
      return
    }
  } else if (patch.length === 1 && !Array.isArray(document) &&
    patch[0].op === 'move' && patch[0].path === '/') {
    const destination = patch[0].from.split('/').slice(1)
    if (destination.length === 1 && Array.isArray(document[destination[0]])) {
      console.log(JSON.stringify(document[destination[0]], null, 2))
      return
    }
  }

  const result = jsonpatch.applyPatch(document, patch, {
    mutateDocument: false
  }).newDocument

  console.log(JSON.stringify(result, null, 2))
})
