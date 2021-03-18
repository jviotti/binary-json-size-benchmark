// TODO: Use a JSON Patch implementation from jsontoolkit
const fs = require('fs')
const jsonpatch = require('fast-json-patch')

const chunks = []

process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  chunks.push(chunk)
})

const applyPatch = (document, patch) => {
  if (patch.length === 0) {
    return document
  }

  if (patch.length === 1) {
    // A hack to extend JSON Patch to be able to convert an array
    // into an object, something that this implementation doesn't
    // seem to support.
    if (Array.isArray(document) && patch[0].op === 'move' && patch[0].from === '/') {
      const destination = patch[0].path.split('/').slice(1)
      if (destination.length === 1) {
        return {
          [destination[0]]: document
        }
      }
    } else if (!Array.isArray(document) && patch[0].op === 'move' && patch[0].path === '/') {
      const destination = patch[0].from.split('/').slice(1)
      if (destination.length === 1 && Array.isArray(document[destination[0]])) {
        return document[destination[0]]
      }
    }

    return jsonpatch.applyPatch(document, patch, false, false).newDocument
  }

  return applyPatch(applyPatch(document, [ patch[0] ]), patch.slice(1))
}

process.stdin.on('end', () => {
  const document = JSON.parse(chunks.join())
  const patch = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
  console.log(JSON.stringify(applyPatch(document, patch), null, 2))
})
