const fs = require('fs')

const DATA_PATH = process.argv[2]
if (!DATA_PATH) {
  console.error('The first argument must be the data file')
  process.exit(1)
}

const PIVOT = process.argv[3]
if (!PIVOT) {
  console.error('The second argument must be the pivot identifier')
  process.exit(1)
}

const DIRECTION = process.argv[4]
if (DIRECTION !== 'left' && DIRECTION !== 'right') {
  console.error('The thirf argument must be the direction')
  process.exit(1)
}

const contents = fs.readFileSync(DATA_PATH, 'utf8')
  .split('\n').slice(1).filter((line) => {
    return line.trim().length > 0
  }).map((line) => {
    const fragments = line.split(',').slice(1)
    return {
      id: fragments[0],
      uncompressed: parseInt(fragments[2], 10),
      gzip: parseInt(fragments[3], 10),
      lz4: parseInt(fragments[4], 10),
      lzma: parseInt(fragments[5], 10)
    }
  })

const pivotIndex = contents.findIndex((entry) => {
  return entry.id === PIVOT
})

const entries = DIRECTION === 'left'
  ? contents.slice(0, pivotIndex)
  : contents.slice(pivotIndex + 1)

const DELIMITER = ','

const average = (values) => {
  return values.reduce((accumulator, value) => {
    return accumulator + value
  }, 0) / values.length
}

const median = (numbers) => {
  const sorted = numbers.slice().sort((a, b) => {
    return a - b
  })

  const middle = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  }

  return sorted[middle]
}

const range = (numbers) => {
  const sorted = numbers.slice().sort((a, b) => {
    return a - b
  })

  return sorted[sorted.length - 1] - sorted[0]
}

const stddev = (array) => {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2))
    .reduce((a, b) => a + b) / n)
}

const toFixed = (value) => {
  return Number.isInteger(value) ? value : value.toFixed(3)
}

const titles = fs.readFileSync(DATA_PATH, 'utf8')
  .split('\n')[0].split(',').slice(3)

console.log([ 'category', 'average', 'median', 'range', 'stddev' ].join(DELIMITER))
for (const [ index, dimension ] of [ 'uncompressed', 'gzip', 'lz4', 'lzma' ].entries()) {
  console.log([
    titles[index],
    toFixed(average(entries.map((entry) => {
      return entry[dimension]
    }))),
    toFixed(median(entries.map((entry) => {
      return entry[dimension]
    }))),
    toFixed(range(entries.map((entry) => {
      return entry[dimension]
    }))),
    toFixed(stddev(entries.map((entry) => {
      return entry[dimension]
    })))
  ].join(DELIMITER))
}
