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
// After parsing: we async download the modules. then there is a live connection made (the import is REFERENCE to the value so the values will update automatically).
