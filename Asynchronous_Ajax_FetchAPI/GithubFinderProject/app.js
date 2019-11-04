// // init github
const github = new GitHub();

// //init UI
const ui = new UI();

// // search input

const searchUser = document.getElementById('searchUser');

// // search input event listener

searchUser.addEventListener('keyup', (e) => {
  ui.clearAlert();
  const userText = e.target.value;

  if(userText != '') {
    
    // make http call
      github.getUser(userText)
      .then(data => {
        
        if(data.profile.message === 'Not Found') {
          // show allert
          // ui.clearAlert();
          ui.showAlert('There is no such user', 'alert alert-danger');

        } else {
          ui.showProfile(data.profile);
        }
      })
    } else {
      // clear profile
      ui.clearProfile();
    }
  }
);