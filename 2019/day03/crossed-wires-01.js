const { readFile } = require('fs')

const parseData = data =>
  data.split(',').map(rawInstruction => {
    const { direction, distance } = /(?<direction>[A-Z])(?<distance>[0-9]+)/
      .exec(rawInstruction)
      .groups
    return [direction, Number(distance)];
  })

const convertToCoords = data => {
  var currentPosition = { x: 0, y: 0 }

  return data.map(instruction => {
    const newPosition = move(instruction, currentPosition)
    currentPosition = newPosition

    return newPosition
  })
}

const move = (instruction, currentPosition) => {
  const [direction, distance] = instruction

  switch (direction) {
    case 'U':
      return { ...currentPosition, y: currentPosition.y - distance }

    case 'D':
      return { ...currentPosition, y: currentPosition.y + distance }

    case 'L':
      return { ...currentPosition, x: currentPosition.x - distance }

    case 'R':
      return { ...currentPosition, x: currentPosition.x + distance }
  }
}


readFile('./input.txt', 'utf-8', (_err, data) => {
  const [wireOneRaw, wireTwoRaw] = data
    .trim()
    .split('\n')

  const wireOne = convertToCoords(parseData(wireOneRaw))
  const wireTwo = convertToCoords(parseData(wireTwoRaw))



  // console.log(wireOne)
  console.log(wireTwo)
})
