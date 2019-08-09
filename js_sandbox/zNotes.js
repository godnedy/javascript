// Logging to console
console.log("Hi");
console.log(3);
console.warn("warning", 1);
console.time("cos");


// var and let - more or less the same
// const - cannot be reassigned, but if we have const object, table it inside values can be change, we cannot reassign object (reference to object)
 //Scope: var x --> taka zmienna zdefiniowana globalnie jest zmieniana tez lokalnie, jezeli w petli zdefiniujemy zmienna o tej samej nazwie to nadpiszemy zmienna globalna
// let i const sa bezpieczne (nadpisanie lokalne nie zmienia globalnych wartosci)


 const square = function(x){
   return x*x;
 };
//  console.log(square(3));
 
 //Immidiately invokable function expression
//  (function(name){
//    console.log('Hello' + name);
//  })('Edyta');

 //Window - globalny obiekt dla JS, czyli strona w przegladarce
//  window.close() - zamyka
//  window.alert('hi') to to samo co alert('hi')

//console.log(window.outerHeiht)  - zwraca wysokosc okna (zmienia sie jak zmienimy wielkosc przekladarki)

//Window location
// winodow.location.href='http://google.com'   redirects
// val = window.location.href //zwraca aktualny link do danej strony
// console.log(val) 

//Window history 
// window.history.go(-2) // otwiera strone przed poprzednia na ktorej bylismy w oknie 

//Window navigator
// window.navigator // wyswietla informacje o przegladarce, systemie operacyjnym, na ktorym dziala strona itp 


//QUERY SELECTORS

document.getElementById('animal'); //zwraca element pierwszy z brzegu
document.querySelector('.animal'); //zwraca element pierwszy z brzegu z klasa 'animal'
document.querySelector('ul').getElementByClassName('animal'); //zwraca element pierwszy z brzegu z klasa 'animal' sposrod obiektow wewnatrz znacznika 'ul'

document.getElementsById('id');  // zwraca liste elementow


// childNodes and children

document.querySelector('ul').childNodes // zwraca rozne node'y, tez komentarze i line break
document.querySelector('ul').children // zwraca tylko kolekcję elementow html, ktore sa bezposrednio dziecmi
document.querySelector('ul').firstChild // zwraca pierwszy child node
document.querySelector('ul').firstElementChild // zwraca pierwszy child

const clearBtn = document.querySelector('.clear-tasks');
const card = document.querySelector('.card');
const heading = document.querySelector('h5');


//Przypisywanie eventów do ruchow myszy
// Click
clearBtn.addEventListener('click', runEvent);
// Doubleclick
clearBtn.addEventListener('dblclick', runEvent);
// Mousedown
clearBtn.addEventListener('mousedown', runEvent);
// Mouseup
clearBtn.addEventListener('mouseup', runEvent);
// Mouseenter
card.addEventListener('mouseenter', runEvent);
// Mouseleave
card.addEventListener('mouseleave', runEvent);
// Mouseover
card.addEventListener('mouseover', runEvent);
// Mouseout
card.addEventListener('mouseout', runEvent);
// Mousemove
card.addEventListener('mousemove', runEvent);

// Event Handler
function runEvent(e) {
  console.log(`EVENT TYPE: ${e.type}`);

  heading.textContent= `MouseX: ${e.offsetX} MouseY: ${e.offsetY}`;

  document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`;
}

// Event handling cd

const form = document.querySelector('form'); // get element by the tag (e.g <form>  --here the tag is 'form')
const taskInput = document.getElementById('task');  // get by id
const heading = document.querySelector('h5');
// const select1 = document.querySelector('dupa')
const select2 = document.getElementById('kotek')  // the same as document.querySelector('select') //dziala przy wylaczonym materialize u mnie


taskInput.value = '';
taskInput.addEventListener('keyup', runEvent);
taskInput.addEventListener('input', runEvent); // jakikolwiek event, np 'paste', 'cut', 'keydown' it
taskInput.addEventListener('mouseover', runEvent);
// select1.addEventListener('change', runEvent);
select2.addEventListener('change', runEvent);  //dziala przy wylaczonym materialize

form.addEventListener('submit', runEvent);
// Event Handler
function runEvent(e) {
  console.log(`EVENT TYPE: ${e.type}`); // wyswietla typ eventu
  console.log(`${e.target.value}`); // wyswietla to co zostalo podane w miejscu na ktorym zostal wywolany event, czyli u nas w <input typu submit

  heading.innerText = e.target.value; // w locie przypisuje do <h5 to co jest wpisywanie w <input typu submit
}


// EVENT BUBBLING
//events bubble up through DOM by default, so if i click on card title also col event is fired (it is somewhere above in DOM structure)

document.querySelector('.card-title').addEventListener('click',
function(){
  console.log('card title');
}); // get element by class

document.querySelector('.col').addEventListener('click',
function(){
  console.log('col');
}); // get element by class




//EVENT DELEGATION

// const delItem = document.querySelector('.delete-item'); //this works only for first element
// delItem.addEventListener('click', deleteItem); 

document.body.addEventListener('click', deleteItem); //we are adding event to some parent of '.delete-item'

function deleteItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){  // and filtering (parent of 'x' has 'delete-item' on classList)
    console.log('delete-item');
    e.target.parentElement.parentElement.remove();  // we remove parent of parent of 'x'
  }
}

//LOCAL STORAGE //to persist data from window in a simple way on local after closing session
// in a dev tools in Application tab there is a Local Storage  and Session Storage gui
//set local storage item  Window.localStorage in console

// localStorage.setItem('name', 'John');
// localStorage.removeItem('name');

localStorage.setItem('name', 'John');
// localStorage.clear();

const name = localStorage.getItem('name');
console.log(name);

// document.querySelector('form').addEventListener('submit',   //this saves only single value, and overwrites it each time 'submit' is clicked
// function(e){
//   const task = document.getElementById('task').value;
//   localStorage.setItem('task', task);
//   alert('Task saved')

//   e.preventDefault(); //preventing the default behaviour of event and setting just whats above
// })

document.querySelector('form').addEventListener('submit',   //this saves only single value, and overwrites it each time 'submit' is clicked
function(e){
  const task = document.getElementById('task').value;

  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  alert('Tasks saved');
  e.preventDefault();
})

const tasks = JSON.parse(localStorage.getItem('tasks'));

tasks.forEach(task => {
  console.log(task);
});