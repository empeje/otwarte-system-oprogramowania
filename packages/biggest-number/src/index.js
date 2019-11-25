const sortNumber = numbers => numbers.sort((number1, number2) => {
  const number12 = Number(number1.toString() + number2.toString());
  const number21 = Number(number2.toString() + number1.toString());
  // sort in descending order based on
  // concat(number1, number2) and concat(number2, number1)
  return number21 - number12;
});

const biggestNumber = numbers => {
  const sortedNumbers = sortNumber(numbers);
  return Number(sortedNumbers.map(String).join(""));
};

module.exports = biggestNumber;