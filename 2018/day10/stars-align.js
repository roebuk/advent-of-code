const compose = require('ramda/src/compose')
const map = require('ramda/src/map')
const match = require('ramda/src/match')
const range = require('ramda/src/range')
const prop = require('ramda/src/prop')
const reduceWhile = require('ramda/src/reduceWhile')
const trim = require('ramda/src/trim')
const { readFile, splitLines } = require('../helpers')

// -- coordsRegex :: RegExp
const coordsRegex = /position=<\s?(?<x>-?\d*),\s+(?<y>-?\d*)>.+velocity=<\s*(?<vx>-?\d*),\s*(?<vy>-?\d*)/

// -- moveStars :: [Stars] -> [Stars]
const moveStars = map(({ x, y, vx, vy }) => ({
  x: x + vx,
  y: y + vy,
  vx,
  vy
}))

// -- getMinMax :: [Stars] -> MinMax
const getMinMax = coords => {
  const firstX = coords[0].x
  const firstY = coords[0].y
  return coords.reduce(({ minX, maxX, minY, maxY }, { x, y }) => ({
    minX: Math.min(minX, x),
    maxX: Math.max(maxX, x),
    minY: Math.min(minY, y),
    maxY: Math.max(maxY, y),
  }), { minX: firstX, maxX: firstX, minY: firstY, maxY: firstY })
}

const parseInput = compose(
  map(str => {
    const { x, y, vx, vy } = prop('groups', match(coordsRegex, str))

    return {
      x: parseInt(x),
      y: parseInt(y),
      vx: parseInt(vx),
      vy: parseInt(vy)
    }
  }),
  splitLines,
  trim,
)

// -- getBoundingBoxSize :: MinMax -> Number
const getBoundingBoxSize = ({ minX, maxX, minY, maxY }) => Math.abs(minX - maxX) * Math.abs(minY - maxY)

// -- draw :: (MinMax, [Star]) -> String
const draw = ({ minX, maxX, minY, maxY }, starLocations) => {
  const yRange = range(minY, maxY + 1)
  const xRange = range(minX - 1, maxX + 1)

  return yRange.reduce((grid, yPosition) => {
    xRange.reduce((_, xPosition) => {
      grid += starLocations.find(star => star.x === xPosition & star.y === yPosition) ? '█' : '.'
    })
    return grid += '\n'
  }, '')
}

// -- watchTheSky :: [Stars]
const watchTheSky = stars => {
  var i = 0;
  var starLocations = stars;
  while (i < 10391) {
    var starLocations = moveStars(starLocations)
    var minMax = getMinMax(starLocations)
    var boundingBoxSize = getBoundingBoxSize(minMax)
    if (i === 10390) {
      return draw(minMax, starLocations)
    }
    i++
  }
}

const starsAlign = compose(
  map(watchTheSky),
  map(parseInput),
  readFile
)

starsAlign('input.txt').fork(console.error, console.log)
