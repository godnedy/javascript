// CommonJD Module Syntax
// const person = require('./mymodule');  // import different module (only what is exported there)
// console.log(person.name);

//ES2015 module syntax
// import {person, sayHello} from './mymodule2';
// console.log(person.name);
// console.log(sayHello());
import * as mod from './mymodule2'; // import all
console.log(mod.person.age);

import sth from './mymodule2';  //here we are importing one default value which is exported by default in mymodule2, here 'Hello World'
console.log(sth);
