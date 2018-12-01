const fs = require('fs')
const Sum = require('crocks/Sum')
const mconcat = require('crocks/helpers/mconcat')
const Async = require('crocks/Async')
const { compose, map, split } = require('ramda')

// -- readFile :: String -> Async Error String
const readFile = fileName =>
  Async((reject, resolve) =>
    fs.readFile(fileName, 'utf-8', (err, data) => err ? reject(err) : resolve(data))
  )

// -- splitLines :: String -> [String]
const splitLines = split('\n')

// -- convertToNumbers :: [String] -> [Numbers]
const convertToNumbers = map(parseInt)

// -- addValues :: [Numbers] -> Sum Number
const addValues = xs => mconcat(Sum, xs)

// -- chronalCalibration :: String ->
const chronalCalibration = compose(
  map(addValues),
  map(convertToNumbers),
  map(splitLines),
  readFile
)

chronalCalibration('input.txt')
  .fork(console.error, console.log)
