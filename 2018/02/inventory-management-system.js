const { compose, equals, filter, groupWith, inc, isEmpty, length, lensIndex, map, not, over,
  reduce, sort, split } = require('ramda')
const { readFile, splitLines } = require('../helpers')

// -- hasLengthOf..  :: [Char] -> Boolean
const hasLengthOfTwo = arr => equals(2, length(arr))
const hasLengthOfThree = arr => equals(3, length(arr))

// -- sortCharsAlphabetically :: (String -> String) -> Number
const sortCharsAlphabetically = (a, b) => a.localeCompare(b)

// -- groupChars :: String -> [[Char]]
const groupChars = map(compose(
  groupWith(equals),
  sort(sortCharsAlphabetically),
  split('')
))

// -- incrementByIndex :: Number -> [Number, Number]
const incrementByIndex = (index) => over(lensIndex(index), inc)

// -- foundAtLeastOneMatchingItem = (a -> Boolean) -> Boolean
const foundAtLeastOneMatchingItem = predicate => compose(
  not,
  isEmpty,
  filter(predicate)
)

// -- findMatchingBoxIDs :: [] -> [Number, Number]
const findMatchingBoxIDs = reduce((acc, id) => {
  // Too tired to clean up this function.
  const updatedWidthTwos = foundAtLeastOneMatchingItem(hasLengthOfTwo)(id)
    ? incrementByIndex(0)(acc)
    : acc;
  return updatedWidthThrees = foundAtLeastOneMatchingItem(hasLengthOfThree)(id)
    ? incrementByIndex(1)(updatedWidthTwos)
    : updatedWidthTwos;
}, [0, 0])

// -- makeResult :: [Number, Number] -> IO String
const makeResult = ([twos, threes]) => console.log(`The checksum is: ${twos * threes}`)

const inventoryManagementSystem = compose(
  map(findMatchingBoxIDs),
  map(groupChars),
  map(splitLines),
  readFile
)

inventoryManagementSystem('input.txt').fork(console.error, makeResult)
