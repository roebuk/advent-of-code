const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (_err, data) => {
  const [lower, upper] = data
    .trim()
    .split("-")
    .map(Number);

  var validPasswords = [];

  for (var pass = lower; pass < upper; ++pass) {
    var password = pass.toString();
    isValidPassword(password) && validPasswords.push(pass)
  }

  console.log('Valid passwords:', validPasswords.length)
});



const hasAdjacentDigits = pass => Boolean(pass.match(/(.)\1/ugi))

const hasIncrementingDigits = (pass, index) => {
  const [fst, snd] = pass.substring(index, index + 2)

  if (!snd) return true;

  if (fst <= snd) {
    return hasIncrementingDigits(pass, index + 1)
  } else {
    return false
  }
}

const isValidPassword = (pass) =>
  hasAdjacentDigits(pass) && hasIncrementingDigits(pass, 0)
