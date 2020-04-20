document.getElementById("button1").addEventListener("click", getText);

document.getElementById("button2").addEventListener("click", getJson);

document.getElementById("button3").addEventListener("click", getExternal);

// Get local text file data
function getText() {
  fetch("test.txt")
    .then(res => res.text())
    .catch(err => console.log(err))
    .then(data => {
      console.log(data);
      document.getElementById("output").innerHTML = data;
    });
}

// Get local json data
function getJson() {
  fetch("posts.json")
    .then(res => res.json())
    .then(handleErrors)
    .catch(err => console.log(err))
    .then(data => {
      console.log(data);
      let output = "";
      data.forEach(function(post) {
        output += `<li>${post.title}</li>`;
      });
      document.getElementById("output").innerHTML = output;
    });
}

// Get from external API
function getExternal() {
  fetch("https://api.github.com/users")
    .then(res => res.json())
    .then(handleErrors)
    .then(data => {
      console.log(data);
      let output = "";
      data.forEach(function(user) {
        output += `<li>${user.login}</li>`;
      });
      document.getElementById("output").innerHTML = output;
    })
    .catch(err => console.log(err));
}

function handleErrors(res) {
  //this is needed if we are using fetch, (unlike in jquery) http errors would not be catched automatically by catch
  if (!res.ok) throw new Error(res.error);
  return res;
}

// ARROW functions
const sayHello1 = function() {
  console.log("Hello 1 !");
};

const sayHello2 = () => {
  console.log("Hello 2 !");
};

const sayHello3 = () => console.log("Hello 3 !");

//return object
const sayHello4 = () => ({ msg: "Hello" });

const sayHello5 = name => console.log(`Hello ${name}`);
const sayHello6 = name => console.log(`Hello ${name}`);

const sayHello7 = (language, accent) => ({
  msg: `I speak ${language} with ${accent}`
});

sayHello1();
sayHello2();
sayHello3();
console.log(sayHello4());
sayHello5();
sayHello6("Edyta");
sayHello7("english", "BBC");

// MAP

const britishAccents = [
  "RP",
  "Cockney",
  "Midlands",
  "Nothern",
  "West Country",
  "Scotish"
];

const lengths = britishAccents.map(accent => {
  return accent.length;
});
const lengths2 = britishAccents.map(accent => accent.length);

console.log(lengths);
