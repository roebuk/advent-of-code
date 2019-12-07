const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (_err, data) => {
  const input = data
    .trim()
    .split(",")
    .map(Number);

  console.log(intMachine(input, 0));
});


const input = 5
const POSITION_MODE = 0

const getValue = (data, value, mode) => {
  return (mode === POSITION_MODE) ? data[value] : value;
}

const parseData = numbers => {
  const [param3, param2, param1, ...op] = numbers.toString().padStart(5, '0')

  return {
    op: parseInt(op.join('')),
    param1Mode: parseInt(param1) || 0,
    param2Mode: parseInt(param2) || 0,
    param3Mode: parseInt(param3) || 0,
  }
}

const intMachine = (data, pointer) => {
  const { op, param1Mode, param2Mode } = parseData(data[pointer])
  const param1 = getValue(data, data[pointer + 1], param1Mode)
  const param2 = getValue(data, data[pointer + 2], param2Mode)

  switch (op) {
    case 1: {
      const saveLocation = data[pointer + 3]
      data[saveLocation] = param1 + param2
      return intMachine(data, pointer + 4)
    }
    case 2: {
      const saveLocation = data[pointer + 3]
      data[saveLocation] = param1 * param2
      return intMachine(data, pointer + 4)
    }
    case 3: {
      const saveLocation = data[pointer + 1]
      data[saveLocation] = input
      return intMachine(data, pointer + 2)
    }
    case 4:
      console.log('Outputting result: ', param1)
      return intMachine(data, pointer + 2)

    case 5: {
      const pointerPos = param1 !== 0 ? param2 : pointer += 3
      return intMachine(data, pointerPos)
    }

    case 6: {
      const pointerPos = param1 === 0 ? param2 : pointer += 3
      return intMachine(data, pointerPos)
    }

    case 7: {
      const saveLocation = data[pointer + 3]
      data[saveLocation] = param1 < param2 ? 1 : 0
      return intMachine(data, pointer + 4)
    }

    case 8: {
      const saveLocation = data[pointer + 3]
      data[saveLocation] = param1 === param2 ? 1 : 0
      return intMachine(data, pointer + 4)
    }

    case 99:
      return data[pointer]

    default:
      throw new Error('Unsupported op code: ' + op)
  }
}