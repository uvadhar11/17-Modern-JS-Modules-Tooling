import 'core-js';
// import 'regenerator-runtime/runtime';

// AN OVERVIEW OF MODERN JAVASCRIPT DEVELOPMENT
// open source/3rd part modules (packages) are available through npm (node packet manager)
// in our code we have things like modules and then 3rd party packages that we use.
// npm: program we use to install the packets
// development => build process (PART 1: bundling modules into one big file-compresses the code there so older browsers are good and reduces unsused files. PART 2: transpiling/polyfilling - converting JS features to older versions so older browsers can understand our code and this uses BABEL) -> javascript bundle (after these 2 steps, we are ready to deploy this bundle for production).
// we don't do this automatically, we use tools like webpack (popular, hard to set up since lots manual config stuff) and parcel (0 config needed, Jonas uses this one all the time) -> take raw code and transform it into js bundle.
// these dev tools are available on npm - download and manage tools with npm as well. Some are things like babel, parcel, live server, etc.
/*
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
*/
// modules are a live connection.
import add, { cart } from './shoppingCart.js'; // example of mixing default and named exports. DONT do this.
add('pizza', 2);
add('bread', 5);
add('apples', 4);
// we are adding values to the empty cart variable (empty when we exported it) and after we added stuff to it, it isn't empty anymore (LIVE CONNECTION)
console.log(cart); // same object behind the scenes but a live connection since point to the same place in memory.
// this is the foundation of how we make a modern js codebase.
/*
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
// functions give us private data by default and allow us to return values that become part of the public api.
// we use an iffe - immediately invoked function expression - to create a new scope that is hidden from the outside scope. This is called the module pattern.
// storing the return value of the ifi into a shopping cart variable
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push(product, quantity);
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push(product, quantity);
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  // we can return some of this stuff in order to use it (this will be part of the public api) - we could have defined some of the things like the vars directly in the object but its cleaner and better this way.
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})(); // goal is to create a new scope not reuse code

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.cart); // public api so its now in the global scope after we returned it.
console.log(ShoppingCart2.shippingCost); // the var we wanted to be private is private and not accessible in the global scope (like from the console)
// closures allow a funtion to have access to all the variables that were present at its birthplace which allows all of this stuff to work like this. This function never loses connection to addToCart function since that is its BIRTHPLACE which is why the add to cart function can STILL access the the cart variable (the array and it can push stuff into that array) even though that is not defined in the add to cart function itself!
// we can also use the shipping cost variable in the function
// the mdoule pattern works well but has limitations which is why native modules were added to the language. Limitations include things like not being able to bundle code together and having to be careful about linking the files together in the right order.


// COMMONJS MODULES
// there are lots of other JS module types like AMD modules and CommonJS modules before the JS added their native implementation. 
// CommonJS has always been used in node.js and now they are moving to ES6 modules sometimes now. 
// all the modules from node.js lots of times use common js system. npm was used for node which used common js modules. so we have this around a lot. 
// one file is one module with common js like with es6 modules
export.addToCart = function (product, quantity) {
  cart.push({product, quantity})
  console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
} // this won't work here in the browser but it will work with node js because export is a global object in node js so it works in node js. NOT HERE SINCE export is NOT DEFINED.

// Importing with commonJS
const {addToCart} = require("./shoppingCart.js") // require is a function defined in node.js (not defined here)
// ES6 modules will replace these module systems but it will take a long time to get there.
*/

// A BRIEF INTRODUCTION TO THE COMMAND LINE
// always in a project folder when we open the vs code thing
// ls/dir (dir on windows and mac is ls) - list all the files in the current folder
// cd - change directory (up and down the file tree). To go up use .. with cd so like cd.. and to go to a specific folder use cd foldername (you can start writing it then click tab which will autofill it so we don't have to type the entire name out)
// cd ../.. will move up 2 levels
// clear will clear the console
// to go into files/folders with names seperated by spaces, then you should use quotes around the name like cd "my folder"
// use mkdir then the name of the folder to create a new folder in the current folder you are in
// New-Item -name index.html -> this creates a new file called index.html in the current folder you are in so the format for this is: New-Item -name filename.extension
// to install live-server to open these files, first you need to install it with this: npm install -g live-server (the -g means global so it will be installed globally on your computer and not just in the current folder you are in)
// del filename.extension will delete the file
// mv filename.extension [new location like ../ moves to the parent directory] will move the file to the new location specified.
// rmdir foldername will remove the folder/directory.

// INTRODUCTION TO NPM
// used to put libraries directly into html like with the script tag which would make a global variable (included the script.js) but this isn't good because its not manageable for big teams, messy, and have to manually update the script tag whenever the library is updated. No single repo
// need a more modern way to manage the dependencies so npm.
// npm -v => to check if npm if npm installed and version exists
// npm init => made a package.json for our project and this helps install dependencies.
// npm install (or npm i) PACKAGE_NAME to install a package - this will create a node_modules folder with the package in it and the package.json file will be updated with the package and its version.
// node modules can have the source files of the library and other stuff needed.
// leaflet uses common js module system so cant directly import it into our code - can only do it if we use a module bundler (need module bundlers for common js modules).
// lodash is a library that has lots of useful functions that we can use in our code. If we want to make the lodash library imported in our code and installed, then we need to install a specific type which is npm install lodash-es (the es means es6 modules) and this will install the es6 version of lodash. This will also update the package.json file with the lodash-es package and its version.
// a function called clone deep uses export default so we can give it any name we want and it basically is used to clone objects.
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js'; // this is how we import the lodash-es library into our code. We can use the cloneDeep function from lodash-es in our code now.

// with parcel, there is no need to include the whole url like above, so we can just type the name of the module like this:
import cloneDeep from 'lodash-es'; // this will work with any type of file like scripts, images, even commonJS modules, etc. Parcel will automatically install the package for us and then import it into our code. This is called the npm package auto install feature.

// clone deep makes it easier to clone a nested object
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state); // this is how we clone an object in js. We can also use the spread operator to do this as well. Put in an empty object and then the object we want to clone/copy.
const stateDeepClone = cloneDeep(state); // lodash makes it easier to clone an object without needing the memory references being the same
state.user.loggedIn = false;
console.log(stateClone); // for here, since the memory references are the same for state and stateClone, if you change one property on one, it will change it for the other one as well.
console.log(stateDeepClone); // this will change only the property of the object you want it to and not the other one.

// NEVER INCLUDE NODE MODULES FOLDER IN THE PROJECT REPO ON GITHUB - ALL THAT STUFF IS IN THE PACKAGE.JSON FILE SO YOU CAN JUST INSTALL IT WITH THAT FILE SINCE ALL THESE FILES ARE IN NPM. SO to install the dependencies, you just need to run npm install and it will install all the dependencies in the package.json file (if there are any missing)
// importing the packages like we did with import and then the big file is not practical, so we are going to fix that with a module bundler like parcel.

// BUNDLING WITH PARCEL AND NPM SCRIPTS
// webpack is the most popular bundler, especially in the react world but its pretty complex.
// parcel is a zero config bundler - no config needed and it just works. It also has a dev server built in so we can use that to run our code.
// npm i parcel --save-dev => install parcel as a dev dependency (not needed for production, parcel is only a tool needed for development) so it doesn't go under dependencies in the package.json file but under devDependencies.
// parcel was installed locally so can't do parcel index.html -> need global installation
// can use npx or npm scripts to run parcel
// npx is a tool that allows us to run packages that are installed locally in the project (like parcel) without installing them globally. So we can use npx parcel index.html to run the parcel bundler.
// COMMAND: npx parcel index.html ^^^
// we pass the entry point into parcel (index.html) here because thats where we include the script.js which is the file we want to bundle up. The modules we have are clone deep, shopping cart, and script.js. Parcel will bundle all of these modules into one big file and then we can use that file in the index.html file.
// this is like live server put on port 1234 and it will open the index.html file in the browser and it will also watch for changes in the code and then update the browser automatically. (it rebuilds the bundle and reshreses the browser automatically everytime you make a change)
// to fix can do sudo npm i parcel -g (sudo is for mac and linux) and then parcel index.html will work. IF the other stuff doesn't work
// could uninstall parcel first with npm uninstall parcel and then install again.
// parcel creates a script so we are no longer using a module but we are now using a script here. That is important because older browsers don't support modules but they do support scripts.
// as you can see we have a new folder created called dist that has all the modules and dependencies and everything inside of it and a new index.html is created and without type module in the script tag. This is the file we should use in production.
// IMPORTANT: in the index.html file we use it is fine if we keep the script js file as type module since the new index.html file thgat parcel will make will be weithout the type module in the script tag so leave it since using parcel v2 since otherwise it will error (the production build will be fine since the new index.html in dist folder will be without the type module in the script tag)
// TROUBLESHOOTING IMPORTANT: you get an error like build failed. expected content key ___ to exist then go into file explorer and delete parcel-cache and the dist folder and then run parcel command again and it should work. I got an error previously because I deleted the type="module" in the script tag in index.html

// we can do hot pocket replacement in parcel - only parcel understands this so it won't work in the production build. This is a dev tool. This means that whenever we change something here, the page won't be reloaded but the changes will be applied automatically. This is called hot module replacement.
if (module.hot) {
  module.hot.accept();
}
// for exmaple this is shown with the cart variable being printed to the console. The object's value still persists even after we change the code and it can be updated (everytime we rebuild, the object is saved and added to). This is because of hot module replacement.

// npm scripts
// there is another way to run locally installed packages in the command line and help us automate repetitive tasks like running parcel. This is called npm scripts. SEE package.json to add a word corresponding with a command/script. Like we had start correspond with running npx parcel index.html so we do this command: npm run [NAME OF THE SCRIPT, in our case its start] to run the npx parcel index.html command.
// NOTE: deleted the main field in the package.json file since we don't need it since we aren't making this a library. Deleted that field and replaced it with this: "targets": { "main": false},
// after building the code, parcel compresses it
// we can also install packages globally: npm install parcel -g (-g means globally) and this means you can use this in any directory on your computer. The problem with this is you can't have multiple versions on your computer and you can't have different versions for different projects. So its better to install locally.
// GIT NOTE: see the git ignore file added. When you do git add * it will add all the modified/new files and ignore all the git ignore files.

// CONFIGURING BABEL AND POLYFILLING
// this is for transpiling code back to older versions like ES5 to take into account the people on older browsers. Parcel USED to do this automatically for us but we can configure it if we want to with babel.
// babel is a transpiler that converts modern js code to older js code so older browsers can understand it. Parcel USED TO USE babel under the hood to do this.
// now, in parcel version 2, the transpiler they use is faster than babel. SO we have to manually enable this.
// a plugin is what we want to transpile back
// a preset is a set of plugins
// OLD: use babel/present-env
// STEPS:
// npm install core-js to allow us to use polyfills
// import core from 'core-js';
// add "browserslist": "last 2 versions, > 0.5% and ie >= 11", to the package.json file -> you can change this based on what you need
class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');

console.log('Jonas' ?? null); // this is a new operator that is used to check if the value is null or undefined and if it is, then it will return the value after the ?? operator. If the value is not null or undefined, then it will return the value before the ?? operator. this is called the nullish coalescing operator.

console.log(cart.find(el => el.quantity >= 2)); // this is a new method that is used to find the first element in an array that satisfies the condition in the callback function. If it doesn't find anything, then it will return undefined. This is called the find method.
Promise.resolve('Test').then(x => console.log(x)); // this is a new method that is used to create a promise that is resolved with the value that is passed in. This is called the promise.resolve method.
// Babel can only transpile ES6 syntax (transpiling is like writing things in a different way like classes to functions, const to var) BUT the same isn't true to REAL new features like find and promises. So, these can't be transpiled (they are not syntax and we can only transpile syntax) SO we need to polyfill them.
// polyfilling: adding a piece of code to add a feature that the new browser doesn't support (like adding new functionality with prototype so the name is the same like with the YT video with the at method -> https://www.youtube.com/watch?v=YH6ui_dG7Ow&embeds_referring_euri=https%3A%2F%2Fwww.bing.com%2F&embeds_referring_origin=https%3A%2F%2Fwww.bing.com&source_ve_path=Mjg2NjY&feature=emb_logo). So we can use core-js to polyfill the new features.
// import 'core-js/stable'; -> only need this package for the polyfilling, commented out because I imported the entire module at the top of the file.
// Polyfilling will polyfill everything even if we are not using it in our code. So, we can pick only the features we need to polyfill which will help reduce the bunlde size. Like import "core-js/stable/array/find" -> this will only polyfill the find method and not everything else. (but yeah we should be fine importing all of it)
// polyfilling async functions
import 'regenerator-runtime/runtime.js';
// see the dist files under c17421f9.js for the transpiling/polyfilling stuff
