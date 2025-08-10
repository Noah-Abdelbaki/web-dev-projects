const testScores = () => [80, 40, 85, 40, 69, 75, 50];

const calculateAvg = () => {
  const scores = testScores(); //get the array
  const sum = scores.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const average = sum / scores.length;
  return average; // return a number, not a string
};

const Score = calculateAvg();

if (Score >= 90) {
  console.log(`Average: ${Score} - Grade: A`);
} else if (Score >= 80) {
  console.log(`Average: ${Score} - Grade: B`);
} else if (Score >= 70) {
  console.log(`Average: ${Score} - Grade: C`);
} else if (Score >= 60) {
  console.log(`Average: ${Score} - Grade: D`);
} else if (Score >= 50) {
  console.log(`Average: ${Score} - Grade: E`);
} else {
  console.log(`Average: ${Score} - Grade: F`);
}
