const { compose, equals, filter, groupWith, inc, isEmpty, length, map, not, reduce, sort, split } = require('ramda')
const { readFile, splitLines } = require('../helpers')

// -- hasLengthOf..  :: [Char] -> Boolean
const hasLengthOfTwo = arr => equals(2, length(arr))
const hasLengthOfThree = arr => equals(3, length(arr))

// -- groupChars :: String -> [[Char]]
const groupChars = map(compose(
  groupWith(equals),
  sort((a, b) => a.localeCompare(b)),
  split('')
))

// -- foundAtLeastOneMatchingItem = (a -> Boolean, Number) -> Boolean
const foundAtLeastOneMatchingItem = (predicate, id) => compose(
  not,
  isEmpty,
  filter(predicate)
)(id)

// -- addMatchingBoxIDs :: [] -> [Number, Number]
const addMatchingBoxIDs = reduce(([twos, threes], id) => [
  foundAtLeastOneMatchingItem(hasLengthOfTwo, id) ? inc(twos) : twos,
  foundAtLeastOneMatchingItem(hasLengthOfThree, id) ? inc(threes) : threes
], [0, 0])

// -- makeResult :: [Number, Number] -> String
const makeResult = ([twos, threes]) => `The checksum is: ${twos * threes}`

const inventoryManagementSystem = compose(
  map(makeResult),
  map(addMatchingBoxIDs),
  map(groupChars),
  map(splitLines),
  readFile
)

inventoryManagementSystem('input.txt').fork(console.error, console.log)
