const http = new easyHTTP;
http.get('https://jsonplaceholder.typicode.com/posts/1', function(error, posts) {
  if (error) {
    console.log(error);
  } else {
    console.log(posts);
  }
});

const data = 
{
  title: "some title",
  body: 'some post text'
};

setTimeout(runPost, 2000);  // so that both response texts are displayed

function runPost() {
  http.post('https://jsonplaceholder.typicode.com/posts', data, function(error, posts) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(posts);
  }
});
};

setTimeout(runPut, 4000);  // so that all response texts are displayed

const dataForUpdate = 
{
  title: "some title",
  body: 'some updated text'
};

function runPut() {
  http.put('https://jsonplaceholder.typicode.com/posts/1', dataForUpdate, function(error, posts) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(posts);
  }
});
};

setTimeout(runDelete, 6000);  // so that all response texts are displayed

function runDelete() {
  http.delete('https://jsonplaceholder.typicode.com/posts/1', function(error, message) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(message);
  }
});
};

// EasyHTTPFetch

const httpFetch = new EasyHttpFetch();


httpFetch.get('https://jsonplaceholder.typicode.com/users')
    .then(data => console.log(data))
    .catch(error => console.log(error));

// Create user data    
const dataForFetchPost = {
  name: 'John',
  username: 'johnny',
  email: 'johnny@jcs.com'
};

httpFetch.post('https://jsonplaceholder.typicode.com/users', dataForFetchPost)
  .then(response => console.log(response))
  .catch(error => console.log(error));

// Update Post
httpFetch.put('https://jsonplaceholder.typicode.com/users/2', dataForFetchPost)
  .then(data => console.log(data))
  .catch(err => console.log(err));

// Delete User
httpFetch.delete('https://jsonplaceholder.typicode.com/users/2')
.then(data => console.log(data))
.catch(err => console.log(err));


// EasyHttpAsyncAwait

const httpAsyncAwait = new EasyHttpAsyncAwait();

httpAsyncAwait.get('https://jsonplaceholder.typicode.com/users')
    .then(data => console.log(data))
    .catch(error => console.log(error));

// Create user data    
const dataForAsyncAwaitPost = {
  name: 'JohnAsync',
  username: 'johnnyasync',
  email: 'johnnyasync@jcs.com'
};

httpAsyncAwait.post('https://jsonplaceholder.typicode.com/users', dataForAsyncAwaitPost)
  .then(response => console.log(response))
  .catch(error => console.log(error));

// Update Post
httpAsyncAwait.put('https://jsonplaceholder.typicode.com/users/3', dataForAsyncAwaitPost)
  .then(data => console.log(data))
  .catch(err => console.log(err));

// Delete User
httpAsyncAwait.delete('https://jsonplaceholder.typicode.com/users/3')
.then(data => console.log(data))
.catch(err => console.log(err));