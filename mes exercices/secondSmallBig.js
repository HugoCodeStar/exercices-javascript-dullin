// find second smallest and biggest numbers in an array of numbers

function secondSmallestAndBiggest_1(numbersArray) {
    numbersArray.sort((a, b) => a - b);
    console.log(`2e plus petit nombre : ${numbersArray[1]}; 2e plus grand nombre : ${numbersArray[numbersArray.length - 2]}`);
};

let numbers = [65, -6, 0, 55, 11, 1, -4, 7, 88, 2, 63, 101, -7, 9];
secondSmallestAndBiggest_1(numbers);
// the sorting in the function actually modifies the array given ... not wanted!
console.log(numbers);



/*
    let's try that again
    https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
*/

function secondSmallestAndBiggest_2(numbersArray) {
    newArray = numbersArray; // doing a fake copy; this copies the pointer only
    newArray.sort((a, b) => a - b);
    console.log(`2e plus petit nombre : ${newArray[1]}; 2e plus grand nombre : ${newArray[newArray.length - 2]}`);
};

numbers = [65, -6, 0, 55, 11, 1, -4, 7, 88, 2, 63, 101, -7, 9];
secondSmallestAndBiggest_2(numbers);
// same thing since arrays are a reference type and only the pointer was copied (and not the values)
console.log(numbers);



// again ...

function secondSmallestAndBiggest_3(numbersArray) {
    newArray = [...numbersArray]; // doing a shallow copy; this copies the values on the first level only
    newArray.sort((a, b) => a - b);
    console.log(`2e plus petit nombre : ${newArray[1]}; 2e plus grand nombre : ${newArray[newArray.length - 2]}`);
};

numbers = [65, -6, 0, 55, 11, 1, -4, 7, 88, 2, 63, 101, -7, 9];
secondSmallestAndBiggest_3(numbers);
// this works ... but only because the array isn't nested or multi-dimensional
console.log(numbers);



// again ...

function secondSmallestAndBiggest_4(numbersArray) {
    newArray = JSON.parse(JSON.stringify(numbersArray)); // doing a deep copy; this copies the values on all levels
    newArray.sort((a, b) => a - b);
    console.log(`2e plus petit nombre : ${newArray[1]}; 2e plus grand nombre : ${newArray[newArray.length - 2]}`);
};

numbers = [65, -6, 0, 55, 11, 1, -4, 7, 88, 2, 63, 101, -7, 9];
secondSmallestAndBiggest_4(numbers);
// we can't verify it here but it works even with nested arrays!
console.log(numbers);



// again ... since the JSON functions (stringify, parse) are good for all things compatible with JSON; this may not always be the case

function secondSmallestAndBiggest_5(numbersArray) {
    // let's use recursion for a deep copy
    const clone = items => items.map(item => Array.isArray(item) ? clone(item) : item); // very fucking nice!!!

    newArray = clone(numbersArray); // doing a deep copy with the recursive function defined above
    newArray.sort((a, b) => a - b);
    console.log(`2e plus petit nombre : ${newArray[1]}; 2e plus grand nombre : ${newArray[newArray.length - 2]}`);
};

numbers = [65, -6, 0, 55, 11, 1, -4, 7, 88, 2, 63, 101, -7, 9];
secondSmallestAndBiggest_5(numbers);
// we can't verify it here but it works even with nested arrays too!
console.log(numbers);



// again ... slightly better with exception handling

function secondSmallestAndBiggest(numbersArray) {
    if (numbersArray.length > 1) {
        const clone = items => items.map(item => Array.isArray(item) ? clone(item) : item);
        newArray = clone(numbersArray);
        newArray.sort((a, b) => a - b);
        console.log(`2e plus petit nombre : ${newArray[1]}; 2e plus grand nombre : ${newArray[newArray.length - 2]}`);
    }
    else
        console.log("Le tableau doit contenir au moins 2 nombres.");
};

numbers = [65];
secondSmallestAndBiggest(numbers);

numbers = [65, -6, 0, 55, 11, 1, -4, 7, 88, 2, 63, 101, -7, 9];
secondSmallestAndBiggest(numbers);
console.log(numbers);
