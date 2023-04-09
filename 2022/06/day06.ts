const input = await Deno.readTextFile("./input.txt").then((input: string) =>
  input.trim()
);

function solve(str: string, index: number, comparisionSize: number) {
  const s = str.substr(index, comparisionSize);
  const isUnique = isStringUnique(s);

  if (isUnique) {
    return index + comparisionSize;
  }

  return solve(str, index + 1, comparisionSize);
}

function isStringUnique(str: string) {
  const set = new Set(str);

  return set.size === str.length;
}

const sample = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

console.log(`sample:  ${solve(sample, 0, 4)}`);
console.log(`part 1:  ${solve(input, 0, 4)}`);
console.log(`part 2:  ${solve(input, 0, 14)}`);
