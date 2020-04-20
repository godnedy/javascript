import { http } from "./http";
import { ui } from "./ui";

//get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
// listen for add posts
document.querySelector(".post-submit").addEventListener("click", submitPost);
//listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);
//listen for edit state
document.querySelector("#posts").addEventListener("click", enableEdit);

//listen for cancel
document.querySelector(".card-form").addEventListener("click", cancelEdit);

function getPosts() {
  http
    .get("http://localhost:3000/posts") //it returns a promise, since it is an async call
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}
// submit post
function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body
  };

  if (title === "" || body === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    //validate input
    if (id === "") {
      //create post
      http
        .post("http://localhost:3000/posts", data)
        .then(data => {
          ui.showAlert("Post added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      http.put(`http://localhost:3000/posts/${id}`, data).then(data => {
        ui.showAlert("Post updated", "alert alert-success");
        ui.changeFormState("add");
        getPosts();
      });
    }
  }
}

function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          ui.showAlert("Post removed", "alert alert-success");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

function enableEdit(e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const body =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const title = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    };

    //fill form with data
    ui.fillForm(data);
  }
}

function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
  e.preventDefault();
}
