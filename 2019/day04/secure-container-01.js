const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (_err, data) => {
  const [lower, upper] = data
    .trim()
    .split("-")
    .map(Number);

  main(lower, upper);
});

const matchAdjacent = /(.)\1/;

const isIncreasing = pass =>
  pass.split("").reduce((acc, item, index, array) => {
    if (acc === false) return acc;
    const nextItem = array[index + 1];
    if (!nextItem) return acc;

    return item <= nextItem;
  }, true);

const isValidPassword = pass => {
  if (pass.length !== 6) {
    return false;
  }

  if (!matchAdjacent.test(pass)) {
    return false;
  }

  if (!isIncreasing(pass)) {
    return false;
  }

  return true;
};

const main = (lower, upper) => {
  var totallyGoodPasswords = 0;
  for (var i = lower; i < upper; ++i) {
    const isValid = isValidPassword(i.toString());

    if (isValid) {
      totallyGoodPasswords = totallyGoodPasswords + 1;
    }
  }
  console.log(totallyGoodPasswords);
};
