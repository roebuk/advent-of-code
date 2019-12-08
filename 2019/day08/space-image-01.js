const { readFile } = require("fs")
const R = require('ramda')

const getNumberOfZeros = R.pipe(
  R.match(/[0]/ug),
  R.length
)

readFile("./input.txt", "utf-8", (_err, data) => {
  R.pipe(
    R.trim,
    R.splitEvery(6 * 25),
    R.reduce(((acc, item) => {
      if (acc === null) {
        return item
      }
      const itemsLength = getNumberOfZeros(item)
      const prevLength = getNumberOfZeros(acc)

      return itemsLength < prevLength ? item : acc
    }), null),
    item => {
      const ones = R.match(/[1]/ug, item).length
      const twos = R.match(/[2]/ug, item).length

      return ones * twos
    },
    R.tap(console.log)
  )(data)
});