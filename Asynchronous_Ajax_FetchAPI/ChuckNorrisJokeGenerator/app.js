XMLHttpRequest.prototype.logChuck = function() {
console.log('Chuck');

}
const chuckNorrisApi = 'http://api.icndb.com/jokes/random/';

// document.querySelector('.get-jokes').addEventListener('click', getJokes); //this is worse
document.getElementById('get-jokes')  //this is better
  .addEventListener('click', getJokes);

function getJokes(e) {

  const numOfJokes = document.querySelector('input[type="number"]').value;  // better to get this element by id
  const xhr = new XMLHttpRequest();

  xhr.open('GET', chuckNorrisApi + `${numOfJokes}`, true); // true for asynchronous call

  xhr.send();
  
  xhr.onload = function() {
    if(this.status === 200) {

      const response = JSON.parse(xhr.responseText);
      
      let output = '';

      if (response.type === 'success') {
        response.value.forEach(function(joke) {
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output = `<li>Sth went wrong</li>`;
      }
      document.querySelector('.jokes').innerHTML = output;
    }

  }

  xhr.logChuck();
  e.preventDefault();  
}




























// document.querySelector('.get-jokes').addEventListener('click', getJokes);

// function getJokes(e) {
//   const number = document.querySelector('input[type="number"]').value;

//   const xhr = new XMLHttpRequest();

//   xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

//   xhr.onload = function() {
//     if(this.status === 200) {
//       const response = JSON.parse(this.responseText);
      
//       let output = '';

//       if(response.type === 'success') {
//         response.value.forEach(function(joke){
//           output += `<li>${joke.joke}</li>`;
//         });
//       } else {
//         output += '<li>Something went wrong</li>';
//       }

//       document.querySelector('.jokes').innerHTML = output;
//     }
//   }

//   xhr.send();

//   e.preventDefault();
// }