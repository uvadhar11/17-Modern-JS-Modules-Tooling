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
  const limit = spendingLimits?.[user] ?? 0; // ?? is the nullish coalescing operator and returns the stuff to its right if the left is null/undefined, else it returns the right side since not null/undefined.
  // This works with optional chaining (?.) since if user property doesn't exist on spending limits, (this operator is used so no errors with accessing a null property), then this will become null/undefined and the nullish coalescing operator will return the right side of the operator (0).

  if (value <= limit) {
    budget.push({ value: -value, description: description, user: user });
  }
};
addExpenses(10, 'Pizza 🍕');
addExpenses(100, 'Going to movies 🍿', 'Matilda');
addExpenses(200, 'Stuff', 'Jay');
console.log(budget);

const check = function () {
  for (const el of budget) {
    let lim;
    if (spendingLimits[el.user]) {
      lim = spendingLimits[el.user];
    } else {
      lim = 0;
    }

    if (el.value < -lim) {
      el.flag = 'limit';
    }
  }
};
check();

console.log(budget);

const bigExpenses = function (limit) {
  let output = '';
  for (const el of budget) {
    if (el.value <= -limit) {
      output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
    }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
bigExpenses(1000);
