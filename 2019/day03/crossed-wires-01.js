const { readFile } = require('fs')

const parseData = data =>
  data.split(',').map(rawInstruction => {
    const { direction, distance } = /(?<direction>[A-Z])(?<distance>[0-9]+)/
      .exec(rawInstruction)
      .groups
    return [direction, Number(distance)];
  })


const getMag = {
  U: ['y', -1],
  D: ['y', 1],
  L: ['x', -1],
  R: ['x', 1]
}

readFile('./input.txt', 'utf-8', (_err, data) => {
  const [wireOneRaw, wireTwoRaw] = data
    .trim()
    .split('\n')

  const wireOne = parseData(wireOneRaw)
  const wireTwo = parseData(wireTwoRaw)
  const wireSetOne = getPoints(wireOne)
  const wireSetTwo = getPoints(wireTwo)

  const matchingCoords = getMatchingCoords(wireSetOne, wireSetTwo);
  const xxx = matchingCoords
    .map(x => x.split(',')
      .map(x => Number(Math.abs(x))))
    .map(([x, y]) => x + y)
  console.log(xxx)
})


const getMatchingCoords = (one, two) => {
  var matches = []
  one.forEach(item => {
    if (two.has(item)) {
      matches.push(item);
    }
  })

  return matches
}

const getPoints = (wireOne) => {
  var position = { x: 0, y: 0 }
  return wireOne.reduce((set, item) => {
    const [direction, distance] = item
    const [axis, mag] = getMag[direction]

    for (var i = 0; i <= distance; ++i) {
      position[axis] = position[axis] + mag
      set.add(`${position.x},${position.y}`)
    }

    return set
  }, new Set)
}