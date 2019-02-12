const Sum = require('crocks/Sum')
const mconcat = require('crocks/helpers/mconcat')
const compose = require('ramda/src/compose')
const map = require('ramda/src/map')
const reduce = require('ramda/src/reduce')
const split = require('ramda/src/split')
const splitAt = require('ramda/src/splitAt')
const trim = require('ramda/src/trim')
const { readFile } = require('../helpers')

// -- convertToNumbers :: [String] -> [Numbers]
const convertToNumbers = map(parseInt)

// -- splitOnSpaces :: String -> [String]
const splitOnSpaces = split(' ')

// -- sumMetaData :: [Node] -> Number
const sumMetaData = reduce((total, { metadata }) =>
  total.concat(mconcat(Sum, metadata)), Sum(0))

// c m c m [      ] c m c m [] [] [   ]
// 2 3 0 3 10 11 12 1 1 0 1 99 2  1 1 2

const children = (numberOfChildren, rest, acc) => {
  if (numberOfChildren === 0) {
    return [acc, rest]
  } else {
    const [{ acc, metadata }, remaining] = build_node(rest)
    return children(numberOfChildren - 1, remaining, [...acc])
  }
}

const build_node = ([numberOfChildren, numberOfMetaData, ...rest]) => {
  const [acc, updatedRest] = children(numberOfChildren, rest, []);
  const [[...metadata], [...remaining]] = splitAt(numberOfMetaData, updatedRest)
  return [{ acc, metadata }, remaining]
}


const solution = compose(
  // map(sumMetaData),
  map(build_node),
  map(convertToNumbers),
  map(splitOnSpaces),
  map(trim),
  readFile
)

solution('input.txt').fork(console.log, console.log)
