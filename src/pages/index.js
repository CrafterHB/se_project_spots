import "./index.css";
import Api from "../utils/Api.js";

import {
  enableValidation,
  resetValidation,
  settings,
  disableButton,
} from "../scripts/validation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "35eba8cb-4003-4213-9b5c-eeabead47c27", // Replace with your actual token
    "Content-Type": "application/json",
  },
});

//Edit Profile Modal
const editButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-profile-modal");
const editCloseButton = editModal.querySelector(".modal__close-btn");
const editNameInput = editModal.querySelector("#profile-name-input");
const editDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const editForm = editModal.querySelector(".modal__form");

const avatarPicture = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function loadHeader() {
  api.userInfo(avatarPicture, profileName, profileDescription);
}
loadHeader();

editButton.addEventListener("click", function () {
  openModal(editModal);
  resetValidation(editForm, [editNameInput, editDescriptionInput]);
  editNameInput.value = profileName.textContent;
  editDescriptionInput.value = profileDescription.textContent;
});

editCloseButton.addEventListener("click", function () {
  closeModal(editModal);
});

editForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;
  const profileSaveButton = editModal.querySelector(".modal__submit-btn");

  profileSaveButton.textContent = "Saving...";
  api.editUserInfo(editNameInput.value, editDescriptionInput.value).then(() => {
    profileSaveButton.textContent = "Save";
    closeModal(editModal);
  });
});

//Avatar Modal
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarImageLink = avatarModal.querySelector("#avatar-image-input");
const avatarCloseButton = avatarModal.querySelector(".modal__close-btn");

const avatarImage = document.querySelector(".profile__avatar");
const avatarText = document.querySelector(".profile__avatar_edit-container");

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  avatarImage.src = avatarImageLink.value;
  const avatarSubmitButton = avatarModal.querySelector(".modal__submit-btn");

  avatarSubmitButton.textContent = "Saving...";
  disableButton(avatarSubmitButton);
  api.editUserAvatar(avatarImageLink.value).then(() => {
    avatarSubmitButton.textContent = "Save";
    avatarForm.reset();
    closeModal(avatarModal);
  });
});

avatarImage.addEventListener("click", function () {
  openModal(avatarModal);
});

avatarImage.addEventListener("mouseover", function () {
  avatarText.style.visibility = `visible`;
});

avatarImage.addEventListener("mouseout", function () {
  if (window.innerWidth > 627) {
    avatarText.style.visibility = `hidden`;
  }
});

avatarCloseButton.addEventListener("click", function () {
  closeModal(avatarModal);
});

//New Post Modal
const addButton = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const postCloseButton = newPostModal.querySelector(".modal__close-btn");
const postForm = newPostModal.querySelector(".modal__form");
const postSubmitButton = newPostModal.querySelector(".modal__submit-btn");

const postImageLink = newPostModal.querySelector("#profile-image-input");
const postCaption = newPostModal.querySelector("#profile-caption-input");

addButton.addEventListener("click", function () {
  openModal(newPostModal);
});

postCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

postForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  //console.log(postImageLink.value, postCaption.value);
  disableButton(postSubmitButton);

  const newPost = {
    link: postImageLink.value,
    name: postCaption.value,
    _id: "temp",
  };

  postSubmitButton.textContent = "Saving...";
  api
    .addNewCard(postCaption.value, postImageLink.value)
    .then(() => {
      api.loadLatestCard().then((card) => {
        newPost._id = card[0]._id;
      });
    })
    .then(() => {
      getCardElement(newPost);

      postForm.reset();

      closeModal(newPostModal);
      postSubmitButton.textContent = "Save";
    });
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", escapeKeyPressed);
  document.addEventListener("click", outsideModalClicked);
}

function outsideModalClicked(evt) {
  if (evt.target.classList.contains("modal")) {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

function escapeKeyPressed(evt) {
  if (evt.key === "Escape") {
    console.log("escape pressed");
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escapeKeyPressed);
  document.removeEventListener("click", outsideModalClicked);
}

//Preview Modal
const previewModal = document.querySelector(".modal_type_preview");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

function openPreview(link, caption) {
  previewModalImage.src = link;
  previewModalImage.alt = caption;
  previewModalCaption.textContent = caption;

  //previewModal.classList.add("modal_is-opened");
  openModal(previewModal);
}

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
  //previewModal.classList.remove("modal_is-opened");
});

//Card Generation

const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

//Card Deletion Modal
const deleteModal = document.querySelector("#delete-modal");
const cardRemoveConfirmButton = deleteModal.querySelector(
  "#modal__delete-confirm"
);
const cardRemoveCancelButton = deleteModal.querySelector(
  "#modal__delete-btn_cancel"
);
const cardRemoveExitButton = deleteModal.querySelector(".modal__close-btn");

let selectedCard;
let selectedCardData;

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  //Like Button
  const cardLikeButton = cardElement.querySelector(".card__like-btn");

  api.loadLikes(data._id, cardLikeButton);

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-btn-liked");
    if (cardLikeButton.classList.contains("card__like-btn-liked")) {
      api.likeCard(data._id);
    } else {
      api.unlikeCard(data._id);
    }
  });
  //Delete Button
  const cardRemoveButton = cardElement.querySelector(".card__remove-btn");
  cardRemoveButton.addEventListener("click", function () {
    selectedCard = cardElement;
    selectedCardData = data;
    openModal(deleteModal);
  });

  //Preview Button
  cardImage.addEventListener("click", function () {
    openPreview(data.link, data.name);
  });

  cardsList.prepend(cardElement);
  return cardElement;
}

//CONFIRM DELETE
cardRemoveConfirmButton.addEventListener("click", function () {
  const id = selectedCardData._id;
  selectedCard.remove();
  cardRemoveConfirmButton.textContent = "Deleting...";
  api.deleteCard(id).then(() => {
    cardRemoveConfirmButton.textContent = "Delete";
    closeModal(deleteModal);
  });
});
cardRemoveCancelButton.addEventListener("click", function () {
  closeModal(deleteModal);
});
cardRemoveExitButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

/*initialCards.forEach(function (element) {
  console.log(element["name"]);

  getCardElement(element);
}); */

function loadCards() {
  api.loadCards(getCardElement);
}

loadCards();

enableValidation(settings);

//TO DO:  Add delete warning, use image preview as reference.
