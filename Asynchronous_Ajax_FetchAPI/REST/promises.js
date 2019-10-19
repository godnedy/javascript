const posts = [
  {title: 'Post one', body: 'Some description 1'},
  {title: 'Post two', body: 'Some description 2'},
]

function createPost(post) {
  return new Promise(function(resolve, reject){
  setTimeout(function () {
    posts.push(post);
    const error = false;  // change to true and see in console how error is catched
    if(!error) {
      resolve();
    } else {
      reject('Error: Something went wrong');
    }
  }, 2000);
}); 
}

function getPosts() {
  setTimeout(function(){
    let output = '';
    posts.forEach(function(post){
      output += `<li>${post.title}</li>`;
    })
    document.body.innerHTML = output;
  }, 1000);
}

createPost({title: 'post three', body: 'some desc post 3'}, getPosts)
.then(getPosts)
.catch(function(error) {
  console.log(error);
});

