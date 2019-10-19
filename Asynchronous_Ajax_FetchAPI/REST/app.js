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
