// ITERATOR example

function nameIterator(names) {
  let nextIndex = 0;

  return {
    customnext: function() {         
      return nextIndex < names.length ? 
      {value: names[nextIndex++], done: false} :
      {done: true}
    }
  }
}

const namesArray = ['Anna', 'Magdalena', 'Radek'];

//init iterator
const names = nameIterator(namesArray);

// return names
console.log(names.customnext().value);    // customnext because I've named my function customnext
console.log(names.customnext().value);
console.log(names.customnext().value);
console.log(names.customnext());

// GENERATOR

function* sayNames() { // * shows it is a generator
  yield 'Anna';
  yield 'Magdalena';
  yield 'Radek';
}

const name = sayNames();
console.log(name.next().value);   // here function name is next by default

function* createIds() {
  let index = 0;
  while(true) {
    yield index++; 
  }
}

const id = createIds();
console.log(id.next().value);
console.log(id.next().value); 
 
// SYMBOLS
// Create a symbol
// const sym1 = Symbol();
// const sym2 = Symbol('sym2');

// console.log(typeof sym2);

// console.log(Symbol('123') === Symbol('123'));
// console.log(`Hello ${sym1.toString()}`);

// Unique Object Keys
const KEY1 = Symbol();
const KEY2 = Symbol('sym2');

const myObj = {};

myObj[KEY1] = 'Prop1';
myObj[KEY2] = 'Prop2';
myObj.key3 = 'Prop3';
myObj.key4 = 'Prop4';

// console.log(myObj[KEY1]);
// console.log(myObj[KEY2]);

// Symbols are not enumerable in for...in
// for(let i in myObj) {
//   console.log(`${i}: ${myObj[i]}`);
// }

// Symbols are ignored by JSON.stringify
console.log(JSON.stringify({key: 'prop'}));
console.log(JSON.stringify({[Symbol('sym1')]: 'prop'}));

// DESTRUCTURING ASSIGNMENTS

let a, b;
[a, b] = [100, 200];
// Rest pattern
[a, b, c, ...rest] = [100, 200, 300, 400, 500];

({ a, b } = { a: 100, b: 200, c: 300, d: 400, e: 500 });
({ a, b, ...rest} = { a: 100, b: 200, c: 300, d: 400, e: 500 });

// Array Destructuring

// const people = ['John', 'Beth', 'Mike'];

// const [person1, person2, person3] = people;

// console.log(person1, person2, person3);

// Parse array returned from function
// function getPeople() {
//   return ['John', 'Beth', 'Mike'];
// }

// let person1, person2, person3;
// [person1, person2, person3] = getPeople();

// console.log(person1, person2, person3);

// Object Destructuring

const person = {
  name: 'John Doe',
  age: 32,
  city: 'Miami',
  gender: 'Male',
  sayHello: function(){
    console.log('Hello');
  }
}

// Old ES5
// const name = person.name,
//       age = person.age,
//       city = person.city;

// New ES6 Destructuring
const { name, age, city, sayHello } = person;

console.log(name, age, city);

sayHello();

//MAPS
// MAPS = key-value pairs - can use ANY type as a key or value

const map1 = new Map();

// Set Keys
const key1 = 'some string',
      key2 = {},
      key3 = function() {};

// Set map values by key
map1.set(key1, 'Value of key1');
map1.set(key2, 'Value of key2');
map1.set(key3, 'Value of key3');

// Get values by key
// console.log(map1.get(key1), map1.get(key2), map1.get(key3));

// Count values
// console.log(map1.size);

// ITERATING MAPS

// Loop using for...of to get keys and values
// for(let [key, value] of map1) {
//   console.log(`${key} = ${value}`);
// }

// Iterate keys only
// for(let key of map1.keys()) {
//   console.log(key);
// }

// Iterate values only
// for(let value of map1.values()) {
//   console.log(value);
// }

// Loop with forEach
// map1.forEach(function(value, key){
//   console.log(`${key} = ${value}`);
// });

// CONVERT TO ARRAYS

// Create an array of the key value pairs
const keyValArr = Array.from(map1);
console.log(keyValArr);

// Create an array of the values
const valArr = Array.from(map1.values());
console.log(valArr);

// Create an array of the keys
const keyArr = Array.from(map1.keys());
console.log(keyArr);


// SETS - Store unique values of any type

const set1 = new Set();

// Add values to set
set1.add(100);
set1.add('A string');
set1.add({name: 'John'});
set1.add(true);
set1.add(100);

// const set2 = new Set([1, true, 'string']);
// console.log(set2);

// console.log(set1);

// Get count
// console.log(set1.size);

// Check for values
// console.log(set1.has(100));
// console.log(set1.has(50 + 50));
// console.log(set1.has({name: 'John'}));

// Delete from set
// set1.delete(100);

// console.log(set1);

// ITERATING THROUGH SETS

// For..of 
// for(let item of set1) {
//   console.log(item);
// }

// ForEach Loop
// set1.forEach((value) => {
//   console.log(value);
// });

// CONVERT SET TO ARRAY
const setArr = Array.from(set1);
console.log(setArr);
