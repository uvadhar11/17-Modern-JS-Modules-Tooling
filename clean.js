// Code from fixing bad code part 1, for the functional programming stuff from part 2, see clean2.js
const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = user => spendingLimits?.[user] ?? 0;

const addExpenses = function (value, description, user = 'jonas') {
  // if (!user) user = 'jonas'; // this is similar to setting a default value to the parameter so we can just use a default parameter for if a user isn't inputted.
  user = user.toLowerCase();

  // we can use a ternary operator instead of this because this is adding unnecessary nesting and ternary is more readable.
  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // above code rewritten with ternary operator
  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  // another clever way of doing the above code (using commonly used operators):
  // const limit = spendingLimits?.[user] ?? 0; // ?? is the nullish coalescing operator and returns the stuff to its right if the left is null/undefined, else it returns the right side since not null/undefined.
  // This works with optional chaining (?.) since if user property doesn't exist on spending limits, (this operator is used so no errors with accessing a null property), then this will become null/undefined and the nullish coalescing operator will return the right side of the operator (0).

  if (value <= getLimit(user)) {
    // budget.push({ value: -value, description: description, user: user });
    budget.push({ value: -value, description, user }); // if the property and variable name are the same, we don't have to write it twice.
  }
};
addExpenses(10, 'Pizza 🍕');
addExpenses(100, 'Going to movies 🍿', 'Matilda');
addExpenses(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpenses = function () {
  for (const entry of budget) {
    // let lim;
    // if (spendingLimits[entry.user]) {
    //   lim = spendingLimits[entry.user];
    // } else {
    //   lim = 0;
    // }
    // this is very similar to the above code so we can just use this
    // const limit = spendingLimits?.[entry.user] ?? 0; // the same line exists in another place so putting this in its own function for the DRY priniple.

    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit'; // calling the getLimit function in here and remember its entry.user not user.
  }
};
checkExpenses();

console.log(budget);

// prints all expenses bigger than the bigLimit param
const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget) {
    // conditionally adding by setting the increment of output to the result of the ternary
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : 0;
    // if (entry.value <= -bigLimit) {
    //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    // }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
console.log(budget);
logBigExpenses(1000);
