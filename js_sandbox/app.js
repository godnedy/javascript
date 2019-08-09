// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();


// Load all event listeners
function loadEventListeners() {

  // Lad DOM content
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // remove task
  taskList.addEventListener('click', deleteItem);

  filter.addEventListener('keyup', filterTasks);

  // clearBtn.addEventListener('click', clearTasks)
}

function getTasks(){

  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  } else {

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = '';
  }
  e.preventDefault();
}


function deleteItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){  // and filtering (parent of 'x' has 'delete-item' on classList)
    if(confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();  // we remove parent of parent of 'x'

      // Remove from Local storage
      deleteTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}


function deleteTaskFromLocalStorage(taskItem, index) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

   tasks.forEach(function(task){
     if(taskItem.textContent === task) {
        tasks.splice(index, 1);
     }
   });
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
//  taskList.innerHTML ="";

//faster

  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTask(e){
  const pattern = e.target.value.toLowerCase;
  
  document.querySelectorAll('.collection-item').forEach 
  (function(task){
    const item = task.firstChild.textContent;
    if(!item.toLowerCase().indexOf(pattern) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  }
)


}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
