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

function runPut() {
  http.delete('https://jsonplaceholder.typicode.com/posts/1', function(error, message) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(message);
  }
});
};


// // const posts = [
// //   {title: 'Post one', body: 'Some description 1'},
// //   {title: 'Post two', body: 'Some description 2'},
// // ]

// // function createPost(post) {
// //   setTimeout(function () {
// //     posts.push(post)
// //   }, 2000);
// // }

// // function getPosts() {
// //   setTimeout(function(){
// //     let output = '';
// //     posts.forEach(function(post){
// //       output += `<li>${post.title}</li>`;
// //     })
// //     document.body.innerHTML = output;
// //   }, 1000);
// // }
// // createPost({title: 'post three', body: 'some desc post 3'});

// // getPosts();

// const posts = [
//   {title: 'Post one', body: 'Some description 1'},
//   {title: 'Post two', body: 'Some description 2'},
// ]

// function createPost(post, callback) {
//   setTimeout(function () {
//     posts.push(post);
//     callback();
//   }, 2000);
  
// }

// function getPosts() {
//   setTimeout(function(){
//     let output = '';
//     posts.forEach(function(post){
//       output += `<li>${post.title}</li>`;
//     })
//     document.body.innerHTML = output;
//   }, 1000);
// }
// createPost({title: 'post three', body: 'some desc post 3'}, getPosts);

