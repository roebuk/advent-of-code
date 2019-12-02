const { readFile } = require('fs')

readFile('./input.txt', 'utf-8', (_err, data) => {
  const input = data
    .trim()
    .split(',')
    .map(Number)

  const nouns = [...Array(100).keys()];
  const verbs = [...Array(100).keys()];

  nouns.map(noun => {
    verbs.map(verb => {
      const freshNClean = [...input]
      freshNClean[1] = noun
      freshNClean[2] = verb
      const result = parse(freshNClean, 0)

      if (result == wantedResult) {
        console.log(100 * noun + verb)
      }
    })
  })
})

const add = (x, y) => x + y
const mult = (x, y) => x * y
const wantedResult = 19690720

const parse = (data, offset) => {
  const opCode = data[offset]
  const dataLocator1 = data[offset + 1]
  const dataLocator2 = data[offset + 2]
  const resultLocation = data[offset + 3]

  if (opCode === 99) {
    return data[0]
  }

  const fn = opCode === 1 ? add : mult

  data[resultLocation] = fn(data[dataLocator1], data[dataLocator2])

  return parse(data, offset + 4)
}
