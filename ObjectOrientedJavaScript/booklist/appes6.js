class Book {
  constructor(author, title, isbn) {
    this.author = author;
    this.title = title; 
    this.isbn = isbn;
  }
}

class UI {

  addBookToList(book) {
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

  showAlert (message, className) {
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

  deleteBook (target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  deleteAllBooks () {
    const bookList = document.getElementById('book-list');
    while (bookList.firstChild){
      bookList.removeChild(bookList.firstChild);
    }
  }
 
  clearFields () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  
  }
}

class Storage {
   
  static getAllBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return Array.from(books);
  }
  
  static displayBooks() {
    const books = Storage.getAllBooks();

    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Storage.getAllBooks();
    books.push(book);
    console.log(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteBook(isbn) {
    let books = Storage.getAllBooks();

    books.forEach(function(book, index){  //
      if(book.isbn === isbn) {
       books.splice(index, 1);
      }
     });
  }

  static deleteAllBooks() {
    localStorage.removeItem('books');
  }

}

// Event Listeners

// DOM Load Event
document.addEventListener('DOMContentLoaded', Storage.displayBooks);
// adding a book
document.getElementById('submitButton').addEventListener('click', function(e){
  console.log('dupa');
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Instantiate book
  const book = new Book(title, author, isbn);
  console.log(book);
  // Instantiate UI
  const ui = new UI();
 
  // Validate if it is not adding empty values

  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Some fields are empty. Fill in all fields', 'error');
  } else {
  // Add book to list
  ui.addBookToList(book);
  // Add to local storage
  Storage.addBook(book);
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
  Storage.deleteBook(e.target.parentElement.previousElementSibling.textContent);
  
  ui.showAlert("Book deleted", 'success');
  e.preventDefault();

})

// deleting all books at once

document.getElementById('clearButton').addEventListener('click', function(){
  
  const ui = new UI();

  if(Storage.getAllBooks().length > 0) {

    ui.deleteAllBooks();
    Storage.deleteAllBooks();
    ui.showAlert("All books deleted", 'info');
  }
})
