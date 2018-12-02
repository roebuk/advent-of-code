const fs = require('fs')
const Async = require('crocks/Async')
const { split } = require('ramda')

// -- readFile :: String -> Async Error String
const readFile = fileName =>
  Async((reject, resolve) =>
    fs.readFile(fileName, 'utf-8', (err, data) => err ? reject(err) : resolve(data))
  )

// -- splitLines :: String -> [String]
const splitLines = split('\n')

module.exports = {
  readFile,
  splitLines
}
