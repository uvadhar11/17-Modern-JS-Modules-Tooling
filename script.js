// AN OVERVIEW OF MODERN JAVASCRIPT DEVELOPMENT
// open source/3rd part modules (packages) are available through npm (node packet manager)
// in our code we have things like modules and then 3rd party packages that we use.
// npm: program we use to install the packets
// development => build process (PART 1: bundling modules into one big file-compresses the code there so older browsers are good and reduces unsused files. PART 2: transpiling/polyfilling - converting JS features to older versions so older browsers can understand our code and this uses BABEL) -> javascript bundle (after these 2 steps, we are ready to deploy this bundle for production).
// we don't do this automatically, we use tools like webpack (popular, hard to set up since lots manual config stuff) and parcel (0 config needed, Jonas uses this one all the time) -> take raw code and transform it into js bundle.
// these dev tools are available on npm - download and manage tools with npm as well. Some are things like babel, parcel, live server, etc.

// AN OVERVIEW OF MODULES IN JAVASCRIPT
// module: reusable piece of code with implementation details - its a seperate file (similar to function) - has import and exports (exporting stuff out of a module is called a PUBLIC API like with classes. Public API consumed by importing values from other modules and stuff)
// dependencies: the code we import/packages and stuff (since we need that code for our code in the module to work)
// modules are used everywhere in different languages.
// modules are used when codebases are much bigger. Benefits: easy to compose software (modules are small building blocks we put together for a complex application - similar to a camera where each part is like a module and can be developed without needing the other parts and engineers can work on their part with abstraction to the other modules).
// isolate components means modules can be developed in isolation without thinking about the entire codebase
// much organized code
// reuse the same code in the project and also in other projects
// ES6 modules: modules stored in files (one module per file). ES6 module vs. script. (even though they are one file)
// module: all top level variables are scoped to the module (private and only in the module). We can export the variable to access it from other modules. BUT in a script (even multiple scripts) all the top level variables are global which can lead to collisions.
// es6 modules are strict mode by default and scripts have sloppy mode.
// es6 modules have an undefined top level this keyword and in scripts the top level this points to the window object
// es6 modules: import and export modules between each other. In regular scripts - you can't import/export. Importing/exporting can ONLY happen at the top level and imports/exports are hoisted meaning they will always be moved to the top of the file even if imported somewhere else.
// html linking: <script type="module"> vs <script>
// file downloading (module loading) is always async. Regular scripts are downloaded in a blocking sync way by default unless we use async keyword on the script tag when linked with html.
// How es6 module are imported:
// step 1: parse the code (parsing = reading the code without executing it) - here imports are hoisted. When you import modules before execution (the whole importing model process happens before the code runs), they are imported synchronously. Only after all imported modules are downloaded and executed, the main module file will run.
// this is only possible thanks to top level static imports (so we know imports before execution). If we allowed imports in functions, then modules can't be imported sync.
// we want modules to be imported in a sync way because it makes bundling possible and dead code can be eliminated. By knowing all the dependencies between modules, bundlers can join multiple modules together and eliminate the dependencies and stuff and dead code we aren't using.
// After parsing: we async download the modules. then there is a live connection made (the import is REFERENCE to the value so the values will update automatically). => this is unique to es6 modules (JS modules only work like this)
// next the code from the imported modules are executed and the importing modules process is finally finished.

// EXPORTING AND IMPORTING MODULES IN JS
// importing module
import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // ./ means the current location -> ES modules can work without the extension since the prettier might delete it. You have to set the type="module" in the html for the js file in order for this to work
// the log for executing module is printed first BECAUSE the code is parsed and the code in the modules that are being imported are executed first.
// the import statements are also hoisted (moved to top of file) as well. All modules are executed in stric mode by default so we don't need to use strict.
// can import specific variables or functions but names need to match and put it in curly braces
// using the as keyword allows us to name things something different in the file that is not the name we exported from the module. Like variable called totalPrice but we import it into this function as price. This as keyword can work with export statements as well.
console.log('Importing module');

addToCart('bread', 5);
console.log(price, tq);

import * as ShoppingCart from './shoppingCart.js'; // we can import everything from shopping cart and creates the namespace for the stuff in shopping cart as in the ShoppingCart. * means import everything.
ShoppingCart.addToCart('bread', 5); // example of this - the shopping cart module is basically like a class with a public api. Some things are quite similar and a module does export a public api.
console.log(ShoppingCart.totalPrice);

// import add from './shoppingCart.js'; // don't need curly braces for default exports.
console.log(add);
add('price', 2);
// DO NOT mix default and named exports

// modules are a live connection.
import add, { cart } from './shoppingCart.js'; // example of mixing default and named exports. DONT do this.
add('pizza', 2);
add('bread', 5);
add('apples', 4);
// we are adding values to the empty cart variable (empty when we exported it) and after we added stuff to it, it isn't empty anymore (LIVE CONNECTION)
console.log(cart); // same object behind the scenes but a live connection since point to the same place in memory.
// this is the foundation of how we make a modern js codebase.

// Top-level await (ES2022)
// we can use the await keyword outside of an async function (we call this top-level await since its at the top level - not inside something like a function) - we can ONLY use this in a module NOT a normal script (need the type="module" in the html)
console.log('Start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/users'); // api request
const data = await res.json(); // converting to json
console.log(data);
//  IMPORTANT: this actually BLOCKS the execution of the entire module now.
console.log('Something else'); // this will print only after we get the data

// more real world example
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/users'); // api request
  const data = await res.json(); // converting to json
  console.log(data);
  return { name: data.at(-1).name, email: data.at(-1).email }; // getting the very last element of the array nad getting some of its data
};
const lastPost = getLastPost();
console.log(lastPost); // prints promise pending since the async function is still running and hasn't finished yet.

// workaround but not clean
// lastPost.then(last => console.log(last));

// so we can use top level await for a cleaner version
const lastPost2 = await getLastPost(); // awaiting the value of the last post and then printing it.
console.log(lastPost2);
// the importing module will wait for all top level awaits in the imported module (like the shopping cart module) to finish before the importing module will run. (importing module in this case is script.js)
// so top level await will block the module as well.

// THE MODULE PATTERN
