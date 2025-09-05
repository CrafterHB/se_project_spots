//Edit Profile Modal
const editButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-profile-modal");
const editCloseButton = editModal.querySelector(".modal__close-btn");

editButton.addEventListener("click", function () {
  editModal.classList.add("modal_is-opened");
});

editCloseButton.addEventListener("click", function () {
  editModal.classList.remove("modal_is-opened");
});

//New Post Modal
const addButton = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const postCloseButton = newPostModal.querySelector(".modal__close-btn");

addButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

postCloseButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
