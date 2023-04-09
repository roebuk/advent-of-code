/** The input is sensitive to whitespace, don't save input.txt with trim whitespace on save enabled
 * or trim the start of the input */
const input = await Deno.readTextFile("./input.txt").then((input: string) =>
  input.trimEnd()
);

type Stacks = string[][];

/**
 * input - move 1 from 2 to 1.
 * returns { ammount: 1, from: 1, to: 0 } (zero indexed)
 */
function parseCommand(command: string) {
  const [, ammount, , from, , to] = command.split(" ");

  return {
    ammount: Number(ammount),
    from: Number(from) - 1,
    to: Number(to) - 1,
  };
}

function parseCommands(commands: string) {
  return commands.split("\n").map(parseCommand);
}

/**
 * @param stackRow given `[N] [C]    `
 * @returns ['N', 'C', undefined]
 */
function parseStack(stackRow: string) {
  const singleColumn = stackRow.match(/\s{3,4}|\[([A-Z])\]/gm)!;

  return singleColumn.map((item) => /[A-Z]/.exec(item)?.[0]);
}

/**
 * Given this input
 *     [D]
 * [N] [C]
 * [Z] [M] [P]
 *  1   2   3
 * @returns [[ 'Z', 'N' ], [ 'M', 'C', 'D'], ['P']]
 */
function parseStacks(input: string) {
  const [_, ...values] = input.split("\n").reverse();
  const parsedStacks = values.map(parseStack);
  const numberOfStacks = parsedStacks[0].length;
  const x = Array.from<{ length: number }, []>(
    { length: numberOfStacks },
    () => []
  );

  return parsedStacks.reduce<Stacks>((stacks, item) => {
    item.forEach((char, index) => {
      if (char) {
        stacks.at(index).push(char);
      }
    });

    return stacks;
  }, x);
}

function solve(input: string, retainOrder: boolean) {
  const [stacks, commands] = input.split("\n\n");
  const parsedCommands = parseCommands(commands);
  const parsedStacks = parseStacks(stacks);

  const finalStack = parsedCommands.reduce<Stacks>(
    (stacks, { ammount, from, to }) => {
      const pickup = stacks[from].splice(stacks[from].length - ammount);
      const pickInCorrectOrder = retainOrder ? pickup : pickup.reverse();
      stacks[to].push(...pickInCorrectOrder);

      return stacks;
    },
    parsedStacks
  );

  return finalStack.map((stack) => stack.at(-1)).join("");
}

console.log(`part 1:  ${solve(input, false)}`);
console.log(`part 2:  ${solve(input, true)}`);
