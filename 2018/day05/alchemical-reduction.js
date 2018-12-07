const compose = require('ramda/src/compose')
const defaultTo = require('ramda/src/defaultTo')
const head = require('ramda/src/head')
const ifElse = require('ramda/src/ifElse')
const invoker = require('ramda/src/invoker')
const length = require('ramda/src/length')
const map = require('ramda/src/map')
const prepend = require('ramda/src/prepend')
const reduce = require('ramda/src/reduce')
const split = require('ramda/src/split')
const trim = require('ramda/src/trim')
const tail = require('ramda/src/tail')
const { readFile } = require('../helpers')

const splitChar = split('')
const getCharCode = invoker(0, 'charCodeAt')
const defaultEmptyString = defaultTo('')

// -- getCharCodeSafe :: Char -> Number
const getCharCodeSafe = compose(
  getCharCode,
  defaultEmptyString
)

// -- doAdjectPairsReact :: (Number Number) -> Boolean
const doAdjectPairsReact = (x, y) =>
  Math.abs(getCharCodeSafe(x) - getCharCodeSafe(y)) === 32 ? true : false

// -- reactor :: [Char] -> [Chars]
const reactor = reduce((acc, item) =>
  ifElse(acc => doAdjectPairsReact(item, head(acc)),
    tail,
    prepend(item)
  )(acc)
  , '')

const printAnswer = units => `The number of remaining units: ${units}`

alchemicalReduction = compose(
  map(printAnswer),
  map(length),
  map(reactor),
  map(splitChar),
  map(trim),
  readFile
)

alchemicalReduction('input.txt').fork(console.error, console.log)
