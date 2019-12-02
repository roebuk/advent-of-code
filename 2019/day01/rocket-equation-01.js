const { readFile } = require('fs')

const calcFuel = mass => Math.floor(mass / 3) - 2

readFile('./input.txt', 'utf-8', (_err, data) => {
  console.log(
    data.
      trim()
      .split('\n')
      .map(Number)
      .reduce((sum, mass) => sum + calcFuel(mass), 0)
  )
})
