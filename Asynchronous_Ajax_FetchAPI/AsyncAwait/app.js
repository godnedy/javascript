async function getUsers() {  // now getUsers will return a promise, we don't need to create new Promise (...)

  // await response of the fetch call - instead of doing .then
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  // await when response is resolved - instead of doing second .then
  const data = await response.json();
  // only proceed once second promise is resolved
  return data;
}


getUsers()
.then(data => console.log(data));