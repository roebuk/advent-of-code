const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (_err, data) => {
  const input = data
    .trim()
    .split("\n")
    .map(x => x.split(')'))
    .map(createOrbit)

  console.log(distance(input))
});

const createOrbit = ([parent, child]) => ({
  parent: parent.trim(),
  child: child.trim()
})


const makeTree = orbits =>
  orbits.reduce((acc, { parent, child }) => {
    acc[child] = parent
    return acc
  }, {})


const countAncestors = (child, parents, count = 0) =>
  (child !== 'COM')
    ? countAncestors(parents[child], parents, count + 1)
    : count


const pathToCOM = (child, parents) => {
  const arr = [child]

  while (child !== 'COM') {
    var child = parents[child]
    arr.push(child)
  }

  return arr
}

const distance = orbits => {
  const parents = makeTree(orbits)
  var path1 = pathToCOM('YOU', parents).reverse()
  var path2 = pathToCOM('SAN', parents).reverse()

  return path2.reduce((acc, item, index) =>
    item !== path1[index] ? [...acc, item, path1[index]] : acc
    , [])
    .filter(Boolean)
    .filter(x => x !== 'SAN' && x !== 'YOU')
    .length
}
