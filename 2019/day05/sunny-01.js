const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (_err, data) => {
  const input = data
    .trim()
    .split(",")
    .map(Number);

  input[1] = 12;
  input[2] = 2;

  console.log(parse(input, 0));
});

const parse = (data, offset) => {
  const input = 1;
  const opCode = data[offset];
  const operation = opCode % 100;

  console.log(operation);

  if (operation === 1) {
    const dataLocator1 = data[offset + 1];
    const dataLocator2 = data[offset + 2];
    const resultLocation = data[offset + 3];

    data[resultLocation] = data[dataLocator1] + data[dataLocator2];
    return parse(data, offset + 4);
  }

  if (operation === 2) {
    const dataLocator1 = data[offset + 1];
    const dataLocator2 = data[offset + 2];
    const resultLocation = data[offset + 3];

    data[resultLocation] = data[dataLocator1] * data[dataLocator2];
    return parse(data, offset + 4);
  }

  if (operation === 3) {
    debugger;
    const resultLocation = data[offset + 1];
    data[resultLocation] = input;

    return parse(data, offset + 2);
  }

  if (operation === 4) {
    const resultLocation = data[offset + 1];
    console.log(`output : ${data[resultLocation]}`);

    return parse(data, offset + 2);
  }

  if (operation === 99) {
    return data[0];
  }

  throw new Error("Unsupported Op Code: " + operation);
};
