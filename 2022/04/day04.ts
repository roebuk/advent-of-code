const input = await Deno.readTextFile("./input.txt").then((input: string) =>
  input.trim()
);

type HighLow = ReturnType<typeof getBounds>;
type Matcher = "noOverlaps" | "contains";

function solve(input: string, matcher: Matcher) {
  return input.split("\n").filter((line) => parseLine(line, matcher)).length;
}

function parseLine(line: string, matcher: Matcher) {
  const [first, second] = line.split(",");

  const f = getBounds(first);
  const s = getBounds(second);

  if (matcher === "contains") {
    return contains(f, s) || contains(s, f);
  }

  return overlaps(f, s) || overlaps(s, f);
}

function getBounds(s: string) {
  const [low, high] = s.split("-");

  return { low: parseInt(low), high: parseInt(high) };
}

function overlaps(a: HighLow, b: HighLow) {
  return !(a.high < b.low || a.low > b.high);
}

function contains(a: HighLow, b: HighLow) {
  return a.low <= b.low && a.high >= b.high;
}

const sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

console.log(`example: ${solve(sampleInput, "contains")}`);
console.log(`part 1:  ${solve(input, "contains")}`);
console.log(`part 2:  ${solve(input, "noOverlaps")}`);
