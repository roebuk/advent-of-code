const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (_err, data) => {
  const inputData = data
    .trim()
    .split(",")
    .map(Number);

  console.log(intMachine(inputData, 0, 0).toString().length);
});

const input = 1
const POSITION_MODE = 0
const PARAMETER_MODE = 1
const RELATIVE_MODE = 2

const getValue = (data, value, mode, relativeBase) => {
  if (mode === POSITION_MODE) {
    return data[value]
  } else if (mode === PARAMETER_MODE) {
    return value
  } else if (mode === RELATIVE_MODE) {
    const position = value + relativeBase
    return data[position]
  } else {
    console.warn(`GOT A MODE I DIDN'T EXPECT ${mode}`)
  }
}

const getWriteLocation = (data, index, mode, relativeBase) => {
  if (mode === RELATIVE_MODE) {
    return data[index] + relativeBase
  } else {
    return data[index]
  }
}

const parseData = numbers => {
  console.log({ numbers })
  const [param3, param2, param1, ...op] = numbers.toString().padStart(5, '0')

  return {
    op: parseInt(op.join('')),
    param1Mode: parseInt(param1) || 0,
    param2Mode: parseInt(param2) || 0,
    param3Mode: parseInt(param3) || 0,
  }
}

const intMachine = (data, pointer, relativeBase) => {
  const { op, param1Mode, param2Mode, param3Mode } = parseData(data[pointer])
  const param1 = getValue(data, data[pointer + 1], param1Mode, relativeBase)
  const param2 = getValue(data, data[pointer + 2], param2Mode, relativeBase)
  const param3 = getValue(data, data[pointer + 3], param3Mode, relativeBase)

  // console.log({ pointer, param1Mode, param2Mode, param3Mode })
  // console.log({ param3 })

  switch (op) {
    case 1: {
      const saveLocation = data[pointer + 3 + (param3 === 2 ? relativeBase : 0)]
      data[saveLocation] = param1 + param2
      return intMachine(data, pointer + 4, relativeBase)
    }
    case 2: {
      const saveLocation = data[pointer + 3 + (param3 === 2 ? relativeBase : 0)]
      data[saveLocation] = param1 * param2
      return intMachine(data, pointer + 4, relativeBase)
    }
    case 3: {
      const saveLocation = data[pointer + 1 + (param1 === 2 ? relativeBase : 0)]
      data[saveLocation] = input
      return intMachine(data, pointer + 2, relativeBase)
    }
    case 4:
      console.log('Outputting result: ', param1)
      return intMachine(data, pointer + 2, relativeBase)

    case 5: {
      const pointerPos = param1 !== 0 ? param2 : pointer += 3
      return intMachine(data, pointerPos, relativeBase)
    }

    case 6: {
      const pointerPos = param1 === 0 ? param2 : pointer += 3
      return intMachine(data, pointerPos, relativeBase)
    }

    case 7: {
      const saveLocation = data[pointer + 3 + (param3 === 2 ? relativeBase : 0)]
      data[saveLocation] = param1 < param2 ? 1 : 0
      return intMachine(data, pointer + 4, relativeBase)
    }

    case 8: {
      const saveLocation = data[pointer + 3]
      data[saveLocation] = param1 === param2 ? 1 : 0
      return intMachine(data, pointer + 4, relativeBase)
    }

    case 9: {
      return intMachine(data, pointer + 2, relativeBase + param1)
    }

    case 99:
      return [data[pointer], data[pointer + 1]]

    default:
      throw new Error('Unsupported op code: ' + op)
  }
}