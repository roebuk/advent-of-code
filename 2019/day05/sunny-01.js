const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (_err, data) => {
  const input = data
    .trim()
    .split(",")
    .map(Number);

  console.log(intMachine(input, 0));
});

const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;
const input = 1;

const parseCode = numbers => {
  const opCode = parseInt(numbers % 100)
  const thousands = parseInt(numbers / 1000)
  const hundreds = parseInt(numbers / 100 % 10)

  return [opCode, hundreds, thousands, 0]
}

const getValue = (data, value, mode) => {
  return (mode === POSITION_MODE) ? data[value] : value;
}

const intMachine = (data, offset) => {
  const [op, first, second] = parseCode(data[offset])
  const para1 = getValue(data, data[offset + 1], first);
  const para2 = getValue(data, data[offset + 2], second);

  if (op === 1) {
    const saveLocation = data[offset + 3]
    data[saveLocation] = para1 + para2
    return intMachine(data, offset + 4);
  }

  if (op === 2) {
    const saveLocation = data[offset + 3]
    data[saveLocation] = para1 * para2;
    return intMachine(data, offset + 4);
  }

  if (op === 3) {
    const saveLocation = data[offset + 1]
    data[saveLocation] = input;

    return intMachine(data, offset + 2);
  }

  if (op === 4) {
    // console.log(`output : ${data[offset + 1]}`);

    return intMachine(data, offset + 2);
  }

  if (op === 99) {
    return data[offset + 1];
  }


  throw new Error("Unsupported Op Code: " + op);
};
