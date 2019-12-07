const { readFile } = require('fs')

readFile('./input.txt', 'utf-8', (_err, data) => {
  const [wireOneRaw, wireTwoRaw] = data
    .trim()
    .split('\n')

  const wireOne = getPath(parseData(wireOneRaw))
  const wireTwo = getPath(parseData(wireTwoRaw))
  // This is horrendously slow. Gets the job done though :P
  const intersection = wireTwo.reduce((acc, x) => {
    const match = wireOne.find(one => one.x === x.x && one.y === x.y)

    if (match) {
      const distance = x.step + match.step
      return distance < acc ? distance : acc
    }

    return acc
  }, Infinity);
  console.log(intersection)
  // const intersection = new Set(
  //   [...wireTwo].filter(x => wireOne.has(x)));

  // const shortestDistance = [...intersection].reduce((acc, item) => {
  //   const [item1, item2] = item.split(',')
  //   const distance = Math.abs(Number(item1)) + Math.abs(Number(item2))
  //   return distance < acc ? distance : acc
  // }, Infinity)


  // console.log(wireTwo)
})


const parseData = data =>
  data.split(',').map(rawInstruction => {
    const { direction, distance } = /(?<direction>[A-Z])(?<distance>[0-9]+)/
      .exec(rawInstruction)
      .groups
    return [direction, Number(distance)];
  })


const getDirectionAndMag = {
  'R': ['x', 1],
  'D': ['y', 1],
  'U': ['y', -1],
  'L': ['x', -1]
}


const getPath = (wire) => {
  const coords = []
  var step = 1
  var position = { x: 0, y: 0 }

  for (var x = 0; x < wire.length; ++x) {
    const [direction, distance] = wire[x]
    const [axis, mag] = getDirectionAndMag[direction]

    for (var i = 0; i < distance; ++i) {
      const newPos = position[axis] + mag
      position = { ...position, [axis]: newPos }
      coords.push({ x: position.x, y: position.y, step: step })
      ++step
    };
  }

  return coords
}
