const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (_err, data) => {
  const input = data
    .trim()
    .split("\n")
    .map(x => x.split(')'))

  orbitMap(input)
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

const totalAncestors = orbits => {
  const parents = makeTree(orbits)
  const children = Object.keys(parents)
  return children.reduce((acc, item) => {
    return acc + countAncestors(item, parents)
  }, 0)
}

const orbitMap = data => {
  const orbits = data.map(createOrbit)
  console.log(totalAncestors(orbits))
}
