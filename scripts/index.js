const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//Edit Profile Modal
const editButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-profile-modal");
const editCloseButton = editModal.querySelector(".modal__close-btn");
const editNameInput = editModal.querySelector("#profile-name-input");
const editDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const editForm = editModal.querySelector(".modal__form");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

editButton.addEventListener("click", function () {
  editModal.classList.add("modal_is-opened");
  editNameInput.value = profileName.textContent;
  editDescriptionInput.value = profileDescription.textContent;
});

editCloseButton.addEventListener("click", function () {
  editModal.classList.remove("modal_is-opened");
});

editForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;

  editModal.classList.remove("modal_is-opened");
});

//New Post Modal
const addButton = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const postCloseButton = newPostModal.querySelector(".modal__close-btn");
const postForm = newPostModal.querySelector(".modal__form");

const postImageLink = newPostModal.querySelector("#profile-image-input");
const postCaption = newPostModal.querySelector("#profile-caption-input");

addButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

postCloseButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

initialCards.forEach(function (element) {
  console.log(element["name"]);
});

postForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(postImageLink.value, postCaption.value);

  newPostModal.classList.remove("modal_is-opened");
});
