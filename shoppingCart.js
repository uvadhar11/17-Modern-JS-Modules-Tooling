// exporting module
console.log('Exporting module');

// these are scoped to the module (the module is the top level code) - these variables are private to the module.
const shippingCost = 10;
export const cart = [];

// 2 ways to import: named exports,

// named export example - exports need to be at top level (Cant be inside something like an if statement)
export const addToCart = function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

// named exports with exporting multiple things
export { totalPrice, totalQuantity as tq }; // can use the as keyword here as well.

// export defaults - use this when we only want to export one thing per module
export default addToCart; // we basically return the value and can name the value in the other function. We don't need to import a name, we can import the value like just the function expression
// we CAN use named and default exports at the same time BUT its a practice to not do that.
// DO NOT mix default and named exports

// blocking code example
// const res = await fetch('https://jsonplaceholder.typicode.com/users'); // api request
// await res.json(); // converting to json
// console.log('finish fetching'); // only after this top level await is ciompleted, this console prints, and then the importing module will run.
