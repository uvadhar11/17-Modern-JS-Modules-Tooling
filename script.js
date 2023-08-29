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
