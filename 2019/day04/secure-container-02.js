const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (_err, data) => {
  const [lower, upper] = data
    .trim()
    .split("-")
    .map(Number);

  main(lower, upper);
});

const reg = /(\d)\1/;

const containsDouble = number => {
  return reg.test(number);
};

const isIncreasing = pass =>
  pass.split("").reduce((acc, item, index, array) => {
    if (acc === false) return acc;
    const nextItem = array[index + 1];
    if (!nextItem) return acc;

    return item <= nextItem;
  }, true);

const isValidPassword = pass => {
  if (isIncreasing(pass) && containsDouble(pass)) {
    return true;
  }

  return false;
};

const main = (lower, upper) => {
  var totallyGoodPasswords = [];
  for (var i = lower; i < upper; ++i) {
    const pass = i.toString();
    const isValid = isValidPassword(pass);

    if (isValid) {
      totallyGoodPasswords.push(pass);
    }
  }
  console.log(
    totallyGoodPasswords.filter(s =>
      s.match(/(\d)\1+/g).some(m => m.length === 2)
    ).length
  );
};
