/*
    many things to ponder (aka I don't know jack shit) :
    https://www.toptal.com/javascript/es6-class-chaos-keeps-js-developer-up
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
    https://en.wikipedia.org/wiki/First-class_function
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz
    https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
    https://www.geeksforgeeks.org/difference-between-anonymous-and-named-functions-in-javascript/
    https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/

    on 'having' many contructors for a class :
    https://stackoverflow.com/questions/3220721/javascript-pattern-for-multiple-constructors
*/
console.log();





// some utils functions
const sectionHeader = (text) => { console.log(text + " :\n"); };
const sectionLine = (context, result) => { console.log(context.padStart(21, ' ') + " : " + result); }
const sectionFooter = () => { console.log(); };





// 'let' assignment : temporal dead zone (TDZ)
function letDeclare() {
    // inside fooLet' TDZ
    //console.log(fooLet); // ReferenceError
    sectionLine("before", "ReferenceError");

    let fooLet = "fooLet"; // fooVar's value is now set
    sectionLine("after", fooLet); // output : 'fooLet'

    fooLet = "fooLet new value";
    sectionLine("reassignment", fooLet); // output : 'fooLet new value'
};
sectionHeader("Assignment with keyword 'let'");
letDeclare();
// outside the function's scope, fooLet is undeclared
//console.log(fooLet); // ReferenceError
sectionLine("outside (always)", "ReferenceError");
sectionFooter();


// 'const' assignment : similar to 'let'
function constDeclare() {
    // inside fooLet' TDZ
    //console.log(fooConst); // ReferenceError
    sectionLine("before", "ReferenceError");

    const fooConst = "fooConst"; // fooVar's value is now set
    sectionLine("after", fooConst); // output : 'fooConst'

    //fooConst = "fooConst new value"; // TypeError
    sectionLine("reassignment", "TypeError");
};
sectionHeader("Assignment with keyword 'const'");
constDeclare();
// outside the function's scope, fooConst is undeclared
//console.log(fooConst); // ReferenceError
sectionLine("outside (always)", "ReferenceError");
sectionFooter();


// 'var' assignment : hoisting
function varDeclare() {
    // fooVar is hoisted so it can be accessed anytime
    sectionLine("before", fooVar); // output : 'undefined'

    var fooVar = "fooVar"; // fooVar's value is now set
    sectionLine("after", fooVar); // output : 'fooVar'

    fooVar = "fooVar new value";
    sectionLine("reassignment", fooVar); // output : 'fooVar new value'
};
sectionHeader("Assignment with keyword 'var'");
varDeclare();
// outside the function's scope, fooVar is undeclared
//console.log(fooVar); // ReferenceError
sectionLine("outside (always)", "ReferenceError");
sectionFooter();


// no keyword assignment : weird stuff! (and it can't be renamed in the code editor!!)
function varNothing() {
    // fooNothing doesn't exist yet; so it's like a TDZ
    //console.log(fooNothing); // ReferenceError
    sectionLine("before", "ReferenceError");

    fooNothing = "fooNothing"; // fooVar's value is now set
    sectionLine("after", fooNothing); // output : 'fooNothing'

    fooNothing = "fooNothing new value";
    sectionLine("reassignment", fooNothing); // output : 'fooNothing new value'
};
sectionHeader("Assignment with no keyword");
// fooNothing doesn't exist yet; so it's like a TDZ
//console.log(fooNothing); // ReferenceError
sectionLine("outside (before)", "ReferenceError");
varNothing(); // fooNothing declared in function call
// once declared, fooNothing lives long and prospers!
sectionLine("outside (after)", fooNothing); // output : 'fooNothing new value'
sectionFooter();





// and all of that applies to the functions as well with some nuances and a new keyword : function

sectionHeader("Defining functions with different keywords : 'function', no keyword, 'var', 'let' and 'const'");

// fnFunction is hoisted
sectionLine("'function' (before)", fnFunction());
function fnFunction() { return "Works!"; };
sectionLine("'function' (after)", fnFunction());

//fnNothing(); // ReferenceError
sectionLine("no keyword (before)", "ReferenceError");
fnNothing = () => "Works!";
sectionLine("no keyword (after)", fnNothing());

//fnVar(); // no hoisting here; TypeError -- nuance!
sectionLine("'var' (before)", "TypeError");
var fnVar = () => "Works!";
sectionLine("'var' (after)", fnVar());

//fnLet(); // ReferenceError
sectionLine("'let' (before)", "ReferenceError");
let fnLet = () => "Works!";
sectionLine("'let' (after)", fnLet());

//fnConst(); // ReferenceError
sectionLine("'const' (before)", "ReferenceError");
const fnConst = () => "Works!";
sectionLine("'const' (after)", fnConst());

sectionFooter();





// on named and anonymous functions

let fnAnonymous = function() {console.log("Anonymous function"); };
fnAnonymous();
console.log(fnAnonymous.name);

let fnNamed = function functionWithName() {console.log("Named function"); };
fnNamed();
console.log(fnNamed.name);
//functionWithName(); // but name can't be used directly; ReferenceError

console.log();