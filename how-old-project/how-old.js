// Write your function here:
const howOld = (age, year) => {
  const currentYear = new Date().getFullYear();
  const yearDifference = year - currentYear;
  const newAge = age + yearDifference;
  if (newAge < 0) {
    return (
      "The year " +
      year +
      " was " +
      Math.abs(newAge) +
      " years before you were born"
    );
  } else if (year > currentYear) {
    return "You will be " + newAge + " in the year " + year;
  } else {
    return "You were " + newAge + " in the year " + year;
  }
};

console.log(howOld(10, 2015)); // You were 0 in the year 2015
console.log(howOld(20, 2015)); // You were 10 in the year 2015
console.log(howOld(14, 2035)); // You will be 24 in the year 2035

// Once your function is written, write function calls to test your code!
