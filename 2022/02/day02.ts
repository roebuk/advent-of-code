const input = await Deno.readTextFile("./input.txt").then((input: string) =>
  input.trim()
);

const LOSE = 0;
const DRAW = 3;
const WIN = 6;

const ROCK = 1; // X
const PAPER = 2; // Y
const SCISSORS = 3; // Z

const playPredeterminedGame = new Map([
  ["A X", ROCK + DRAW],
  ["A Y", PAPER + WIN],
  ["A Z", SCISSORS + LOSE],
  ["B X", ROCK + LOSE],
  ["B Y", PAPER + DRAW],
  ["B Z", SCISSORS + WIN],
  ["C X", ROCK + WIN],
  ["C Y", PAPER + LOSE],
  ["C Z", SCISSORS + DRAW],
]);

const forceResultGame = new Map([
  ["A X", SCISSORS + LOSE],
  ["A Y", ROCK + DRAW],
  ["A Z", PAPER + WIN],
  ["B X", ROCK + LOSE],
  ["B Y", PAPER + DRAW],
  ["B Z", SCISSORS + WIN],
  ["C X", PAPER + LOSE],
  ["C Y", SCISSORS + DRAW],
  ["C Z", ROCK + WIN],
]);

function solve(input: string, scoreMap: Map<string, number>) {
  return input
    .split("\n")
    .reduce((total, line) => total + (scoreMap.get(line) ?? 0), 0);
}

console.log(`example : ${solve("A Y\nB X\nC Z", playPredeterminedGame)}`);
console.log(`part 1:  ${solve(input, playPredeterminedGame)}`);
console.log(`part 2:  ${solve(input, forceResultGame)}`);
