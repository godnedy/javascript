// init github
const github = new GitHub();

// init UI
const ui = new UI();

// search input

const searchUser = document.getElementById('searchUser');

// search input event listener

searchUser.addEventListener('keyup', (e) => {
  const userText = e.target.value;

  if(userText != '') {
    
    // make http call
      github.getUser(userText)
      .then(data => {
        if(data.profile.message === 'Not Found') {
          ui.showAlert('There is no such user', 'alert alert-danger');
        } else {
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        }
      })
    } else {
      // clear profile
      ui.clearProfile();
    }
  }
);