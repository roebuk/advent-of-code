const { readFile } = require('fs')

const calcFuel = mass => Math.floor(mass / 3) - 2

const calcFuelWithExtra = (mass, total = 0) => {
  const fuel = Math.max(calcFuel(mass), 0)

  return fuel > 0 ? calcFuelWithExtra(fuel, total + fuel) : total
}

readFile('./input.txt', 'utf-8', (_err, data) => {
  console.log(
    data
      .trim()
      .split('\n')
      .map(Number)
      .map(mass => calcFuelWithExtra(mass))
      .reduce((sum, fuel) => sum + fuel, 0)
  )
})
