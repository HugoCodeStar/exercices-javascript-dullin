// 3 functions doing the same thing

function staircaseIterativeConstructive(stepsCount) {
    for (i = 1; i <= stepsCount; i++) {
        let currentStep = stepStart;
        for (j = 2; j <= i; j++)
            currentStep += stepAddOn;
        console.log(currentStep);
    }    
};

function staircaseIterativeIncremental(stepsCount) {
    if (stepsCount > 0) {
        let currentStep = stepStart;
        console.log(currentStep);

        for (i = 2; i <= stepsCount; i++) {
            currentStep += stepAddOn;
            console.log(currentStep);
        }
    }
};

function staircaseRecursive(stepsCount) {
    if (stepsCount > 0) {
        let theStep;

        if (stepsCount === 1) theStep = stepStart;
        else theStep = staircaseRecursive(stepsCount - 1) + stepAddOn;
    
        console.log(theStep);
        return theStep;
    }
};

/*
    on defining multiple variables at once :
    https://www.delftstack.com/howto/javascript/multiple-variable-assignment-in-javascript/
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/

let [stepStart, stepAddOn] = ["@", " -#"];

// calling the 3 functions sequentially with the same argument

staircaseIterativeConstructive(5);
staircaseIterativeIncremental(5);
staircaseRecursive(5);

/*
    but there's gotta be a better way to do this, no?
    https://stackoverflow.com/questions/57963070/is-it-possible-to-call-two-functions-at-the-same-time-with-one-set-of-arguments
*/

// let's use a helper function to call them

function callAllWith(functionList, ...args) {
    functionList.forEach(fn => fn(...args));
};

[stepStart, stepAddOn] = ["!", " -\\"];
callAllWith([staircaseIterativeConstructive, staircaseIterativeIncremental, staircaseRecursive], 5);

// same as above but on the fly

[stepStart, stepAddOn] = ["()", " __|"];
[staircaseIterativeConstructive, staircaseIterativeIncremental, staircaseRecursive].forEach(fn => fn(5));

// similar as above but with 'map' instead of 'forEach'; works due to the functions' side effects

[stepStart, stepAddOn] = ["+", " -"];
[staircaseIterativeConstructive, staircaseIterativeIncremental, staircaseRecursive].map(fn => fn(5));

// beware of the difference between 'forEach' and 'map'

console.log( ["dog", "cat", "hen"].map(name => `baby ${name}`) ); // transforms the items
console.log( ["dog", "cat", "hen"].forEach(name => `baby ${name}`) ); // does something with the items

// let's use a higher order function to call them

function atOnce(...fns) {
    return function(...args) {
         for (const fn of fns)
             fn.apply(this, args);
    };
};

[stepStart, stepAddOn] = ["?", " ! !!"];
atOnce(staircaseIterativeConstructive, staircaseIterativeIncremental, staircaseRecursive)(5);