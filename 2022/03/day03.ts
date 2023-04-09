const input = await Deno.readTextFile("./input.txt").then((input: string) =>
  input.trim()
);

function* chunk<T>(arr: T[], n: number): Generator<T[], void> {
  for (var i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

function solve(input: string, chunkBy: number) {
  const lines = input.split("\n");

  const part1 = [...chunk(lines, 1)]
    .flat()
    .flatMap(getUniqueForLine)
    .reduce((total, item) => total + item, 0);

  const part2 = [...chunk(lines, 3)]
    .map((groupedLines) =>
      getUniqueForLines(groupedLines.map((s) => new Set(s)))
    )
    .flatMap((set) => [...set].map(convertCharToNumber))
    .reduce((total, item) => total + item, 0);

  console.log({ part1, part2 });
}

function convertCharToNumber(char: string) {
  const adjustment = char.toUpperCase() === char ? 38 : 96;

  return char.charCodeAt(0) - adjustment;
}

function getIntersection(setA: Set<string>, setB: Set<string>): string[] {
  return [...setA].filter((x) => setB.has(x));
}

function getUniqueForLines(arr: Set<string>[]) {
  const [head, ...tail] = arr;

  return tail.reduce((s, i) => new Set(getIntersection(s, new Set(i))), head);
}

function getUniqueForLine(str: string) {
  const mid = Math.floor(str.length / 2);
  const bag1 = new Set(str.substring(0, mid));
  const bag2 = new Set(str.substring(mid, str.length));
  const duplicates = getIntersection(bag1, bag2);

  return duplicates.map(convertCharToNumber);
}

const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

console.log(`example: ${solve(sampleInput, 1)}`);
console.log(`part 1:  ${solve(input, 1)}`);
console.log(`part 2:  ${solve(input, 3)}`);
