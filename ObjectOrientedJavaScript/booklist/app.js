// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}


// Add Book To List
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(row);
}

UI.prototype.deleteBook = function(target){

  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }

};

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message, className){
  const div = document.createElement('div');
  //add class to div
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');

  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  // remove all with class alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Event Listeners
// adding a book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();
 
  // Validate if it is not adding empty values

  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Some fields are empty. Fill in all fields', 'error');
  } else {
  // Add book to list
  ui.addBookToList(book);

  //show alert 
  ui.showAlert('Book added!', 'success');
  // Clear fields
  ui.clearFields();
  }
  e.preventDefault();
});

//deleting a book
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);

  ui.showAlert("Book deleted", 'success');

  e.preventDefault();

})