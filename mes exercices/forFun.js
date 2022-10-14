
// https://stackoverflow.com/questions/13926213/checking-the-types-of-function-arguments-in-javascript
// https://stackoverflow.com/questions/1919295/can-i-set-the-type-of-a-javascript-object
// https://stackoverflow.com/questions/899574/what-is-the-difference-between-typeof-and-instanceof-and-when-should-one-be-used
// https://stackoverflow.com/questions/19620667/javascript-operator-overloading

// https://stackoverflow.com/questions/7223359/are-0-and-0-the-same

// https://stackoverflow.com/questions/55611/javascript-private-methods





function Rational(num, denom) {
    if (Number.isInteger(num) || Math.abs(num) == Infinity)
        this.num = num;
    else if (num != undefined)
        this.num = NaN;
    // else : default value from prototype

    if (Number.isInteger(denom) || Math.abs(denom) == Infinity)
        this.denom = denom;
    else if (denom != undefined)
        this.denom = NaN;
    // else : default value from prototype
    
    this.simplify();
}

// default values
Rational.prototype = { num : 0, denom : 1 };

// valueOf override
Rational.prototype.valueOf = function() { return this.num / this.denom };

// toString() override
Rational.prototype.toString = function() { return `(${this.num} / ${this.denom})`; };   // output : (num / denom)

// simplification
Rational.prototype.simplify = function() {
    if (isNaN(this.valueOf())) {
        // (0 / 0) is default representation for NaN
        this.num = 0;
        this.denom = 0;
    }
    else if (Math.abs(this.valueOf()) == Infinity) {
        // (±1 / 0) is default representation for ±∞, respectively
        this.num = this.valueOf() > 0 ? 1 : -1;
        this.denom = 0;
    }
    else if (this.valueOf() == 0) {
        // (0 / 1) is default representation for 0
        this.num = 0;
        this.denom = 1;
    }
    else {
        // gcd function
        const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
        // simplify numerator and denominator by the gcd
        [this.num, this.denom] = [this.num, this.denom].map(number => number / gcd(this.num, this.denom));
        // flip signs of numerator and denominator if denominator is negative
        if (this.denom < 0)
            [this.num, this.denom] = [this.num, this.denom].map(number => -number);
    }
    return this;
};

// addition
Rational.prototype.add = function(number) {
    if (number instanceof Rational) {
        // standard addition in the rationals
        this.num = this.num * number.denom + number.num * this.denom;
        this.denom = this.denom * number.denom;
    }
    else if (Number.isInteger(number) || Math.abs(number) == Infinity)
        // addition of a rational and an integer or ±∞
        this.num = this.num + number * this.denom;
    else if (number != undefined)
        // invalid argument produces NaN
        this.num = NaN;
    // else : addition of 0 (nothing changes) if no argument is provided
    return this.simplify();
};

// opposite
Rational.prototype.opposite = function() {
    // numerator sign flip for the opposite
    this.num = -this.num;
    return this; // no simplification required here
};

// subtraction
Rational.prototype.subtract = function(number) {
    if (number instanceof Rational)
        // subtraction is addition of the opposite
        return this.add(number.opposite());
    else if (Number.isInteger(number) || Math.abs(number) == Infinity)
        // opposite is obtained differently if argument is an integer or ±∞
        return this.add(-number);
    else // same behavior as .add for invalid or missing argument
        return this.add(number);
};

// multiplication
Rational.prototype.multiply = function(number) {
    if (number instanceof Rational) {
        // standard multiplication in the rationals
        this.num = this.num * number.num;
        this.denom = this.denom * number.denom;
    }
    else if (Number.isInteger(number) || Math.abs(number) == Infinity)
        // multiplication of a rational by an integer or ±∞
        this.num = this.num * number;
    else if (number != undefined)
        // invalid argument produces NaN
        this.num = NaN;
    // else : multiplication by 1 (nothing changes) if no argument is provided
    return this.simplify();
};

// inverse
Rational.prototype.inverse = function() {
    if (this.valueOf() == 0)
        [this.num, this.denom] = [0, 0];
    else
        // numerator and denominator swap for the inverse
        [this.num, this.denom] = [this.denom, this.num];
    return this.simplify(); // just in case the denominator is now negative
};

// division
Rational.prototype.divide = function(number) {
    if (number instanceof Rational)
        // division is multiplication by the inverse
        return this.multiply(number.inverse());
    else if (Number.isInteger(number) || Math.abs(number) == Infinity)
        // inverse is obtained differently if argument is an integer or ±∞
        return this.multiply(new Rational(1, number));
    else // same behavior as .multiply for invalid or missing argument
        return this.multiply(number);
};

// integer power
Rational.prototype.power = function(number) {
    const setToNan = () => { [this.num, this.denom] = [0, 0]; };
    const setToInf = () => { [this.num, this.denom] = [1, 0]; };
    const setToZero = () => { [this.num, this.denom] = [0, 1]; };

    if (Number.isInteger(number)) {
        if (number >= 0)
            // exponentiation of a rational by an positive integer
            [this.num, this.denom] = [this.num, this.denom].map(elem => elem ** number);
        else
            // exponentiation of a rational by a strictly negative integer
            [this.num, this.denom] = [this.denom, this.num].map(elem => elem ** -number);
    }
    else if (number == Infinity) {
        // exponentiation of a rational by ∞
        if (this <= -1)                     // (-∞, -1]
            setToNan();
        else if (this > 1)                  // (1, ∞)
            setToInf();
        else if (this < 1)                  // (-1, 1)
            setToZero();
        else                                // {1}
            setToNan();
    }
    else if (number == -Infinity) {
        // exponentiation of a rational by -∞
        if (this < -1 || this > 1)          // (-∞, -1) union (1, ∞)
            setToZero();
        else if (this >= -1 && this <= 0)   // [-1, 0]
            setToNan();
        else if (this < 1)                  // (0, 1)
            setToInf();
        else                                // {1}
            setToNan();
    }
    else if (number != undefined)
        // invalid argument produces NaN
        setToNan();
    // else : exponentiation by 1 (nothing changes) if no argument is provided
    return this.simplify() // in case denominator is now negative
};





console.log();
[
    new Rational(15.0000, -10), // implicit simplification,
    new Rational(-5, 0), // zero denominator allowed
    new Rational(-8, Infinity), // infinities allowed
    new Rational(Infinity, -Infinity), // really allowed!!
    new Rational(-4), // missing denominator allowed --> set to 1
    new Rational(), // default Rational is the fraction 0 / 1
    new Rational(3, 5.6), // invalid stuff allowed --> result is NaN
    new Rational("2", 7)
].forEach(
    rat => console.log(
        rat,
        rat.toString(), // returns [object Object] if toString() isn't overridden
        `${rat}`, // coerces toString() call
        rat + "", // coerces valueOf() call with further conversion to string
        " - ",
        typeof rat,
        Object.prototype.toString.call(rat),
        " - ",
        rat.valueOf(), // returns the object if valueOf() isn't overridden
        // the following coerce valueOf() call
        1 + rat, // if valueOf() doesn't return a number, + will also coerce toString() call
        1 - rat, // if valueOf() doesn't return a number, NaN will be returned with the other mathematical operators
        -rat,
        3 * rat,
        1 / rat,
        2 ** rat,
        11 % rat,
        Math.abs(rat),
        -2 > rat, // always returns false with NaN
        -2 <= rat // always returns false with NaN
    )
);
console.log();





[
    new Rational(2, 3).multiply(new Rational(7, 5)),
    new Rational(2).multiply(0),                                // works with integers too
    new Rational(2).multiply(-Infinity),                        // and also with ±Infinity
    new Rational(2).multiply("allo"),                           // invalid argument will set to NaN
    new Rational(2).multiply(),                                 // no argument multiplies by 1
    "",
    new Rational(1).divide(3).subtract(new Rational(-1, 4)),    // kinda testing all the rest at once coz I'm lazy!
    new Rational(7).subtract(Infinity),
    new Rational(7).divide(Infinity).inverse().add(new Rational(5, 13)),
    new Rational(Infinity).divide(Infinity),
    new Rational().inverse(),
    new Rational(Infinity).inverse(),
    new Rational(-Infinity).inverse(),
    "",
    new Rational(-Infinity).power(Infinity),
    new Rational(-3, 2).power(Infinity),
    new Rational(-1).power(Infinity),
    new Rational(-2, 3).power(Infinity),
    new Rational(0).power(Infinity),
    new Rational(2, 3).power(Infinity),
    new Rational(1).power(Infinity),
    new Rational(3, 2).power(Infinity),
    new Rational(Infinity).power(Infinity),
    "",
    new Rational(-Infinity).power(-Infinity),
    new Rational(-3, 2).power(-Infinity),
    new Rational(-1).power(-Infinity),
    new Rational(-2, 3).power(-Infinity),
    new Rational(0).power(-Infinity),
    new Rational(2, 3).power(-Infinity),
    new Rational(1).power(-Infinity),
    new Rational(3, 2).power(-Infinity),
    new Rational(Infinity).power(-Infinity),
    "",
    new Rational(-3, 2).power(-3),
    new Rational(-3, 2).power(-2),
    new Rational(-3, 2).power(-1),
    new Rational(-3, 2).power(0),
    new Rational(-3, 2).power(),
    new Rational(-3, 2).power(2),
    new Rational(-3, 2).power(3)
].forEach(
    rat => console.log(
        `${rat}`,
        rat.valueOf()
    )
);
console.log();





let phiApprox = depth => depth == 0 ? new Rational(1) /* almost any seed will do here */ : phiApprox(depth - 1).inverse().add(1);
for (depth = 0; depth <= 20; depth++)
    console.log(depth.toString().padStart(2, ' '), " - ", phiApprox(depth).valueOf());
console.log();

[38, 39].forEach(depth => (phi => console.log(depth, `${phi}`, phi + 0, phi**2 - phi - 1))(phiApprox(depth)));
console.log();










function LinearFactory(coeff0, coeff1) {
    return x => coeff0 + coeff1 * x 
};

console.log(LinearFactory(2, 3)(5));