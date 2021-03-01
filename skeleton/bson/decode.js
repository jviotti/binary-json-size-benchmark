const fs = require('fs')
const BSON = require('bson')

const buffer = fs.readFileSync(process.argv[2])

const deserialize = (buffer) => {
  const object = BSON.deserialize(buffer)
  const keys = Object.keys(object)

  if (keys.every((key) => {
    return !isNaN(parseInt(key, 10))
  })) {
    const result = []

    for (const [ key, value ] of Object.entries(object)) {
      result[parseInt(key, 10)] = value
    }

    return result
  }

  return object
}

console.log(JSON.stringify(deserialize(buffer), null, 2))
