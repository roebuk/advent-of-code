const { readFile } = require("fs")
const R = require('ramda')

const SHAPES = {
  black: ' ',
  white: '▮',
}

const convertToNumbers = R.pipe(
  R.split(''),
  R.map(Number)
)

const draw = R.pipe(
  R.splitEvery(25),
  R.map(R.join(''))
)

readFile("./input.txt", "utf-8", (_err, data) => {
  console.log(R.pipe(
    R.trim,
    R.splitEvery(6 * 25),
    R.map(convertToNumbers),
    layers => layers.reduceRight((image, layer, layerIndex) => {
      layer.forEach((pixel, idx) => {
        if (pixel === 2) return;
        image[idx] = pixel === 0 ? SHAPES.black : SHAPES.white
      });

      return image

    }, [...new Array(100).fill(' ')]),
    draw
  )(data)
  )
});