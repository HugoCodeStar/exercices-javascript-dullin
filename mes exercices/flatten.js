/*
    on adding multiple values in an array :
    https://bobbyhadz.com/blog/javascript-push-multiple-values-to-array
    https://stackoverflow.com/questions/14723848/push-multiple-elements-to-array
*/

let anArray = [1, 2, 3, 4, 5, 6];
console.log(anArray);

// using .push to append multiple elements to an array; it modifies the array 
anArray.push(7, 8, 9);
console.log(anArray);

// .push returns the number of elements in the new array
console.log(anArray.push(10, 11));
console.log(anArray);

// using the spread syntax
anArray = [...anArray, 12, 13, 14];
console.log(anArray);

// using .push with the spread syntax
let anotherArray = [15, 16, 17, 18];
anArray.push(...anotherArray);
console.log(anArray);

// using .concat which returns a new array
console.log(anArray.concat(19, 20, 21)); // with a sequence of elements
console.log(anArray.concat([19, 20, 21])); // with an array of elements
console.log(anArray.concat(...[19, 20, 21])); // back to the sequence with the spread syntax
console.log(anArray); // original array unmodified

// using .apply after .push
anArray.push.apply(anArray, [19, 20, 21]);
console.log(anArray);

// better syntax since .apply needs a context variable anyways so it's like a static method
Array.prototype.push.apply(anArray, [22, 23]);
console.log(anArray);

// .apply requires an array; the following two calls fail
// Array.prototype.push.apply(anArray, 24, 25);
// Array.prototype.push.apply(anArray, ...[24, 25]);

// using .splice with actually offers more options
anArray.splice(anArray.length /* where to insert */, 0 /* how many to remove before inserting */, 24, 25);
console.log(anArray);

// using .splice to insert where we want
anArray.splice(2, 0, 2.25, 2.5, 2.75);
console.log(anArray);

// using .splice to remove elements
anArray.splice(2, 3);
console.log(anArray);

// using .splice to replace elements
anArray.splice(2, 3, "III", "IV", "V");
console.log(anArray);

// using .splice to replace a range of values by another one
anArray.splice(2, anArray.length - 5, ['👹', '👺', '👻', '👽'], '💀', '🤡');
console.log(anArray);





/*
    on replacing items in an arrays by many items
    https://stackoverflow.com/questions/46986710/return-multiple-values-from-es6-map-function
*/

let values = [1, 2, 3, 4]; 
let newValues = values.map(v => [v ** 2, v ** 3, v + 1]);

console.log(newValues); // result : [ [ 1, 1, 2 ], [ 4, 8, 3 ], [ 9, 27, 4 ], [ 16, 64, 5 ] ]
                        // wanted result : [ 1, 1, 2, 4, 8, 3, 9, 27, 4, 16, 64, 5 ]

// flattening using .concat in a clever way

newValues = [].concat(...values.map(v => [v ** 2, v ** 3, v + 1]));
console.log(newValues);

// .map is not a sensible way to go since it always returns an array of same length as the original

newValues = [];
for (let element of values)
    newValues.push(element ** 2, element ** 3, element + 1);
console.log(newValues);





// implement a flatten function; full flatten by default; flatten deepness can be specified; let's make it quick!

// first, flatten by only one level

let shallowFlatten = function (array) {
    let newArray = [];
    for (let element of array) {
        if (Array.isArray(element))
            newArray.push(...element); // unwrap an array
        else
            newArray.push(element); // leave a non-array unchanged
    }
    return newArray;    
};

let someArray = [1, [2, 3], [4, [5, 6]], [7, [8, [9, 10]]],[11, [12, [13, [14, 15]]]]];
console.log(shallowFlatten(someArray)); // shallowFlatten returns a new array
console.log(someArray); // original array is intact

// next, using the previous function recursively will do a full flatten

let fullFlatten = function (array) {
    let newArray = [];
    for (let element of array) {
        if (Array.isArray(element))
            newArray.push(...fullFlatten(element)); // spread syntax necessary or newArray will be identical to array
        else
            newArray.push(element);
    }
    return newArray;    
};

console.log(fullFlatten(someArray)); // fullFlatten returns a new array
console.log(someArray); // original array is intact

// now, for the real deal where the flatten depth is given, with a default value of ∞ (full flatten)

// testing arithmetic with Infinity
console.log(
    Infinity - 1, 1 - Infinity, Infinity - Infinity,
    Infinity * 2, Infinity * -2, Infinity * 0,
    Infinity * Infinity, Infinity / Infinity,
    Infinity ** Infinity, Infinity ** 0, 0 ** Infinity, 0 ** 0, 1 ** Infinity
);

let deepFlatten = function (array, depth = Infinity) {
    // recursive function to do a deep copy of an array
    const clone = items => items.map(item => Array.isArray(item) ? clone(item) : item);

    // the flattenning ...
    if (depth >= 0) {
        if (depth > 0) {
            let newArray = [];
            for (let element of array) {
                if (Array.isArray(element))
                    newArray.push(...deepFlatten(element, depth - 1)); // recursive call to one level less deep
                else
                    newArray.push(element); // exit clause : nothing to do
            }
            return newArray;
        }
        else // exit clause : depth is 0
            return clone(array); // since deepFlatten returns a new array
    }
    else { // invalid depth
        console.log("La profondeur d'aplatissement doit être un entier positif.");
        return clone(array); // since deepFlatten returns a new array
    }
};

console.log("Applatissement de profondeur -1 :\n", deepFlatten(someArray, -1), "\n");
console.log("Applatissement de profondeur 0 :\n", deepFlatten(someArray, 0), "\n");
console.log("Applatissement de profondeur 1 :\n", deepFlatten(someArray, 1), "\n");
console.log("Applatissement de profondeur 2 :\n", deepFlatten(someArray, 2), "\n");
console.log("Applatissement de profondeur 3 :\n", deepFlatten(someArray, 3), "\n");
console.log("Applatissement de profondeur 4 :\n", deepFlatten(someArray, 4), "\n");
console.log("Applatissement de profondeur 5 :\n", deepFlatten(someArray, 5), "\n");
console.log("Applatissement de profondeur ∞ :\n", deepFlatten(someArray), "\n");





// let's now make this function available to all arrays as a 'method' (property, in fact ... which will be a function)

Object.defineProperty(Array.prototype, 'flatten', {
    value: function (depth = Infinity) {

    // recursive function to flatten the array; returns a new array
    const flattenFn = (theArray, theDepth) => {
        // recursive function to do a deep copy of an array
        const clone = items => items.map(item => Array.isArray(item) ? clone(item) : item);
            
        // the flattenning ...
        if (theDepth >= 0) {
            if (theDepth > 0) {
                let newArray = [];
                for (let element of theArray) {
                    if (Array.isArray(element))
                        newArray.push(...deepFlatten(element, theDepth - 1)); // recursive call to one level less deep
                    else
                        newArray.push(element); // exit clause : nothing to do
                }
                return newArray;
            }
            else // exit clause : depth is 0
                return clone(theArray); // since flattenFn returns a new array
        }
        else { // invalid depth
            console.log("La profondeur d'aplatissement doit être un entier positif.");
            return clone(theArray); // since flattenFn returns a new array
        }
    };

    // .flatten modifies the calling object
    this.splice(0, this.length, ...flattenFn(this, depth));

    // .flatten returns the length of the flattened array
    return this.length;

}
});

console.log(someArray); // original array
console.log(someArray.flatten(2)); // .flatten returns the flattened array's length
console.log(someArray); // original array has been modified
//console.log(someArray.flatten.toString()); // to see the code of a function
