const Sum = require('crocks/Sum')
const mconcat = require('crocks/helpers/mconcat')
const { compose, map } = require('ramda')
const { readFile, splitLines } = require('../helpers')

// -- convertToNumbers :: [String] -> [Numbers]
const convertToNumbers = map(parseInt)

// -- addValues :: [Number] -> Sum Number
const addValues = xs => mconcat(Sum, xs)

// -- chronalCalibration :: String -> Sum Number
const chronalCalibration = compose(
  map(addValues),
  map(convertToNumbers),
  map(splitLines),
  readFile
)

chronalCalibration('input.txt')
  .fork(console.error, console.log)
