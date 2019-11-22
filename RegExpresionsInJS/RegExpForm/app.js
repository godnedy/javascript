document.getElementById("name").addEventListener('blur', validateName);
document.getElementById("zip").addEventListener('blur', validateZip);
document.getElementById("email").addEventListener('blur', validateEmail);
document.getElementById("phone").addEventListener('blur', validatePhone);


function validateName() {
  const name = document.getElementById('name');
  const re = /^[a-zA-Z]{2,10}$/;
  console.log(re.test(name.value));
  if (name.value.match(re)) {
    name.classList.remove('is-invalid');
  } else {
    name.classList.add('is-invalid');
  }

}

function validateZip() {
  const zip = document.getElementById('zip');
  const re = /^[0-9]{2}-?[0-9]{3}$/;
  console.log(re.test(zip.value));
  if (zip.value.match(re)) {
    zip.classList.remove('is-invalid');
  } else {
    zip.classList.add('is-invalid');
  }

}
function validatePhone() {

}
function validateEmail() {
  const email = document.getElementById('email');
  const re = /^[0-9]{2}@[0-9]\.$/;
  console.log(re.test(email.value));
  if (email.value.match(re)) {
    email.classList.remove('is-invalid');
  } else {
    email.classList.add('is-invalid');
  }

}
