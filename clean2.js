'strict mode'; // enable strict mode, obj.freeze works better with this and its better to have this overall.
// Code from fixing bad code part 2 about functional and declarative programming

// immutability of array here. Object.freeze only works on the first level of the array/object, so we can still change the properties of the objects in the array/in the object, but we can't add or remove objects from the array.
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
// budget[0].value = 10000; // this will work because the object is frozen but the properties of objects in the array/object aren't frozen so we can still change these properties (since are nested, aren't first level)
// budget[9] = 'Jonas'; // doesn't work because this is adding stuff to the 1st level. This will actually give an error in strict mode.

// can make a data structure, like object or array (arrays are basically objects at the end of the day so it works on arrays as well), immutable by using Object.freeze() method. Frozen so we can't add, remove, or change properties.
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200; // this won't work because the object is frozen. This will actually give an error in strict mode.

// function uses spendingLimits from the outside scope and that is something we don't want if we want a pure function. So we can pass in the spendingLimits as a parameter.
// const getLimit = user => spendingLimits?.[user] ?? 0;
const getLimit = (limits, user) => limits?.[user] ?? 0;

// pure function since no side effects and stuff now, not mutating data
const addExpenses = function (
  state, // the state passed in is the budget array
  limits,
  value,
  description,
  user = 'jonas'
) {
  // if (!user) user = 'jonas'; // this is similar to setting a default value to the parameter so we can just use a default parameter for if a user isn't inputted.
  // user = user.toLowerCase(); // here we are actually mutating the user parameter. And this is breaking the rule of manipulating the data. So we are making making this in a new variable.
  const cleanUser = user.toLowerCase();

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

  // if (value <= getLimit(cleanUser)) {
  // budget.push({ value: -value, description: description, user: user });
  // budget.push({ value: -value, description, user: cleanUser }); // if the property and variable name are the same, we don't have to write it twice.
  // this code is breaking the rule of manipulating the data. So we are going to return values.
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state; // adds one new object to the array by copying the current object (state) and then adding the new object. So now, the object isn't mutated.
  // }
  // if the if statement isn't true, then we return the state as it is since otherwise it will be undefined. SO we are using a ternary operator since more declarative than an if statement.
};
const newBudget1 = addExpenses(budget, spendingLimits, 10, 'Pizza 🍕');
console.log(newBudget1);
// need to pass in newBudget1 and not budget since budget is immutable and we can't change it so we will be using the old value of budget and not the new value if we used budget.
// IN A REAL WORLD application we would make a function to do these things by itself and we could chain. Using composing to make a function to perform all these operations at once. Also would use currying.
const newBudget2 = addExpenses(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpenses(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(budget);

// this is now a pure function because it doesn't mutate the original array/data that we put in using the map method. It returns a new array with the new objects. IMPORTANT: We are also passing the state object we are using as a parameter so we don't rely on any outside variables or anything.
const checkExpenses = function (state, limits) {
  // need to replace this for of loop since to be declarative, we use functions to loop through.
  // for (const entry of budget) {
  //   // let lim;
  //   // if (spendingLimits[entry.user]) {
  //   //   lim = spendingLimits[entry.user];
  //   // } else {
  //   //   lim = 0;
  //   // }
  //   // this is very similar to the above code so we can just use this
  //   // const limit = spendingLimits?.[entry.user] ?? 0; // the same line exists in another place so putting this in its own function for the DRY priniple.
  //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit'; // calling the getLimit function in here and remember its entry.user not user.
  // }

  // function looping instead of the for of loop. Using map since it will make a brand new array and we can return the new array, and since we only want to loop through the array and do something to it, not filter things out.
  return state.map(entry => {
    // putting the return statement here since this is a function block so we need the return statement for these. What we return here will be placed in the new array at the position of the current element.
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry; // if the value is less than the limit, then we add the flag property to the object and return the new object, else we just return the object.
  });
};

// converting the checkExpenses function into an arrow function
// const checkExpenses = (state, limits) =>
//   state.map(entry =>
//     entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry
//   );
const finalBudget = checkExpenses(newBudget3, spendingLimits);

console.log(budget);

// prints all expenses bigger than the bigLimit param
// const logBigExpenses = function (bigLimit) {
//   let output = '';
//   for (const entry of budget) {
//     // conditionally adding by setting the increment of output to the result of the ternary
//     output +=
//       entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : 0;
//     // if (entry.value <= -bigLimit) {
//     //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
//     // }
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// }; // immutability is ALSO for regular variables and stuff, in functional code, you probably won't see a let variable since that will go against immutability.

// new solution with the logBigExpenses function. This is impure because it has console.log printing to the screen (EVERY PROGRAM NEEDS TO HAVE SOME SORT OF SIDE EFFECT SINCE OTHERWISE THE PROGAM ISN'T USEFUL - in functional programming, we try to push these side effects to the edges of the program so we can have pure functions in the middle of the program). Otherwise, we are being immutable and not mutating the data.
// very hard to make large applications 100% functional because we need to have side effects and stuff. The goal is to use these principles as much as possible and if we break this, then its fine.
const logBigExpenses = function (state, bigLimit) {
  // we are basically filtering the array for big values and then making a string out of it.
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / '); // bigLimit is negative since expenses are negative. Then we are using map to slice the emoji out from the entry descriptions and then joining all the array elements together with strings.
  // WITH REDUCE: we could have also used reduce. Reduce is to reduce an array to a single value, like a string which is what we want. We would use .filter first to filter the values than use reduce chained on that.
  // params for reduce: accumulator, current value, index, array -> I added a ternary to make sure a slash isn't added at the start of the string since we don't want that at the very start, only to seperate entries so I am using index. So no slash for all others but the first one.
  // .reduce(
  //   (str, cur, index) =>
  //     `${str}${index === 0 ? '' : '/'} ${cur.description.slice(-2)}`,
  //   ''
  // );
  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 1000);
