const data = [
  {
    name: 'John Doe',
    age: 32,
    gender: 'male',
    lookingfor: 'female',
    location: 'Skierniewice',
    image: 'https://randomuser.me/api/portraits/men/82.jpg'
  },
  {
    name: 'Jen Smith',
    age: 26,
    gender: 'female',
    lookingfor: 'female',
    location: 'Gdańsk',
    image: 'https://randomuser.me/api/portraits/women/82.jpg'
  },
  {
    name: 'William Johnson',
    age: 38,
    gender: 'male',
    lookingfor: 'female',
    location: 'Jasło',
    image: 'https://randomuser.me/api/portraits/men/83.jpg'
  }
];

// Profile iterator
const profiles = profileIterator(data);

function profileIterator(profiles) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < profiles.length ? { value: profiles[nextIndex++],
         done: false} : {done: true}
    }
  }
}

// NextEvent listener

document.getElementById('next').addEventListener('click', displayProfile);

// Load first person
displayProfile();

function displayProfile(){
  let currProfile = profiles.next();
  if(currProfile.done) {
    // no more profiles
    window.location.reload();
  } else {
  document.getElementById('profileDisplay').innerHTML= `
  <ul class="list-group">
    <li class="list-group-item">Name: ${currProfile.value.name}</li>
    <li class="list-group-item">Age: ${currProfile.value.age}</li>
    <li class="list-group-item">Gender: ${currProfile.value.gender}</li>
    <li class="list-group-item">Looking for: ${currProfile.value.lookingfor}</li>
    <li class="list-group-item">Location: ${currProfile.value.location}</li>
  </ul>
  `;
  document.getElementById('imageDisplay').innerHTML = `
    <img src="${currProfile.value.image}">
  `;
  }
}