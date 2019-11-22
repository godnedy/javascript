let re;
re = /hi/;  // normal regular expression
re = /hi/i; // case insensitive regular expression 

console.log(re.test("ahaha")); // false
console.log(re.test("ahi")); // true

console.log(re.exec("ahaha")) //null
console.log(re.exec("ahi")) // array with info about found re

re = /hi/g; // search for all occurences, not only first

console.log(re.exec("ahi  hi"))

let someString = "Ha Ha ha";

// match returns result array or null
console.log(someString.match(/ha/));  //display first found ha
console.log(someString.match(/ha/i)); //display first found ha or Ha
console.log(someString.match(/ha/ig)); //display all found ha or Ha
//search returns index of found or -1
console.log(someString.search(/ha/));
console.log(someString.search(/ha/i));
console.log(someString.search(/ha/ig)); 

//replaces found re with sth

let origin = "Aaa Bbb Bbb";
console.log(origin.replace(/bbb/, "ccc")); //replace case sensitive
console.log(origin.replace(/bbb/i, "ccc")); // case insensitive
console.log(origin.replace(/bbb/ig, "ccc")); // case insensitive all occurences


// Metacharacter Symbols
re = /^h/i;           // Must start with
re = / world$/i;     // Must ends with
re = /^hello$/i;     // Must begin and end with
re = /h.llo/i;      // Matches any ONE character
re = /h*llo/i;      // Matches any character 0 or more times
re = /gre?a?y/i;    // Optional character
re = /gre?a?y\?/i;    // Escape character 


// Brackets [] - Character Sets
re = /gr[ae]y/i;      // Must be an a or e
re = /[GF]ray/i;      // Must be a G or F
re = /[^GF]ray/i;      // Match anything except a G or F
re = /[A-Z]ray/;      // Match any uppercase letter
re = /[a-z]ray/;      // Match any lowercase letter
re = /[A-Za-z]ray/;   // Match any  letter
re = /[0-9][0-9]ray/;      // Match any digit

// Braces {} - Quantifiers
re = /Hel{2}o/i;      // Must occur exactly {m} amount of times
re = /Hel{2,4}o/i;      // Must occur exactly {m} amount of times
re = /Hel{2,}o/i;      // Must occur at least {m} times

// Paretheses () - Grouping
re = /^([0-9]x){3}$/

// Shorthand Character Classes
re = /\w/;    // Word character - alphanumeric or _
re = /\w+/;    // + = one or more
re = /\W/;    // Non-Word character
re = /\d/;    // Match any digit
re = /\d+/;    // Match any digit 0 or more times
re = /\D/;      // Match any Non-digit
re = /\s/;      // Match whitespace char
re = /\S/;      // Match non-whitespace char
re = /Hell\b/i; // Word boundary

// Assertions
re = /x(?=y)/;  // Match x only if followed by y
re = /x(?!y)/;  // Match x only if NOT followed by y

// String to match
const str = 'dkjekdxydjekdj';

// Log Results
const result = re.exec(str);
console.log(result);

function reTest(re, str) {
  if(re.test(str)) {
    console.log(`${str} matches ${re.source}`);
  } else {
    console.log(`${str} does NOT match ${re.source}`);
  }
}

reTest(re, str);

