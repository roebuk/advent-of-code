const { readFile } = require('fs')

readFile('./input.txt', 'utf-8', (_err, data) => {
  const input = data
    .trim()
    .split(',')
    .map(Number)

  input[1] = 12
  input[2] = 2

  console.log(parse(input, 0))
})

const add = (x, y) => x + y
const mult = (x, y) => x * y

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
