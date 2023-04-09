const text = await Deno.readTextFile("./input.txt");

console.log(`part1 ${solve(text, 1)}`);
console.log(`part2 ${solve(text, 3)}`);

function solve(input: string, numberOfElves: number) {
  const lines = input.split("\n\n").map(processLine);

  return sum(getTop(numberOfElves, lines));
}

function processLine(line: string) {
  return line.split("\n").reduce((total, number) => {
    const parsed = parseInt(number);
    const num = Number.isNaN(parsed) ? 0 : parsed;

    return total + num;
  }, 0);
}

function findLargest(acc: number, number: number) {
  return number > acc ? number : acc;
}

function getTop(numberOfElves: number, nums: number[]) {
  return nums.sort((a, b) => b - a).slice(0, numberOfElves);
}

function sum(nums: number[]) {
  return nums.reduce((total, num) => total + num);
}
