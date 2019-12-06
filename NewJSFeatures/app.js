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
 