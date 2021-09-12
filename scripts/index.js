import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initial-cards.js";

const popups = document.querySelectorAll(".popup");
const popupContainers = document.querySelectorAll(".popup__container");
const popupGalleryContainer = document.querySelector(".popup__gallery");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.getElementById("popup-profile");

const nameProfile = document.querySelector(".profile__name");
const descriptionProfile = document.querySelector(".profile__description");

const popupEditForm = document.querySelector(".popup__form");
const nameInput = popupEditForm.querySelector("input[name='name']");
const descriptionInput = popupEditForm.querySelector("input[name='description']");

const cardTemplate = document.getElementById("cardTemplate");
const cardsContainer = document.querySelector(".cards");

const addCardPopup = document.getElementById("popup-place");
const addButton = document.querySelector(".profile__add-button");
const placeNameInput = addCardPopup.querySelector("input[name='place']");
const placeImgInput = addCardPopup.querySelector("input[name='url']");
const addCardForm = addCardPopup.querySelector(".popup__form");

const card = cardsContainer.querySelector(".card");
const galleryPopup = document.getElementById("popup-gallery");
const galleryImg = document.querySelector(".popup__img-gallery");
const galleryCapture = document.querySelector(".popup__figcaption");
const cardCapture = document.querySelector(".card__capture");

const closeButtons = document.querySelectorAll(".popup__close");
const submitButton = addCardPopup.querySelector(".popup__button");
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_type_active'
};

//Upload values into inputs before enabling validation

function setPopupProfile() {
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;

  const event = new Event('input');
  descriptionInput.dispatchEvent(event);
  nameInput.dispatchEvent(event);
}

//Load existing cards

for (const card of initialCards) {
  cardsContainer.appendChild(createCard(card));
}

//Add data to the edit form and open the popup

function onClickEditButton() {
  openPopup(editPopup);
  setPopupProfile();
}

//Open add card popup

function onClickAddButton() {
  openPopup(addCardPopup);
  addCardForm.reset();
  formValidator.setInitialFormState(addCardPopup);
}

//Open the gallery

function onCardImgClick (evt) {
  const newSrc = evt.target.getAttribute("src");
  const newAlt = evt.target.getAttribute("alt");
  galleryImg.setAttribute("src", newSrc);
  galleryImg.setAttribute("alt", newAlt);
  galleryCapture.textContent = newAlt;
  openPopup(galleryPopup);
}

//Update user profile

function formSubmitEditProfileHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(editPopup);
}

//Add a new card

function formSubmitAddCardHandler (evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeImg = placeImgInput.value;
  const data = {
    name: placeName,
    link: placeImg,
    alt: placeName
  };
  cardsContainer.prepend(createCard(data));
  closePopup(addCardPopup);
  addCardForm.reset();
}

//Create cards

function createCard (card) {
return (new Card(card,  onCardImgClick, '#cardTemplate')).generateCard();
}

//Close all popups with a close button

function onClickCloseButton(evt) {
  close(evt.target.closest(".popup"));
}

// Stop Propagation function

function onClickPopupContainer(evt) {
  evt.stopPropagation();
}

//Close all popups with an click out of container.

popups.forEach((popup) => {
  popup.addEventListener("click", onClickCloseButton)
});

popupContainers.forEach((popupContainer) => {
  popupContainer.addEventListener("click", onClickPopupContainer);
});

popupGalleryContainer.addEventListener("click", onClickPopupContainer);

popupEditForm.addEventListener("submit", formSubmitEditProfileHandler);
editButton.addEventListener("click", onClickEditButton);
addCardForm.addEventListener("submit", formSubmitAddCardHandler);
addButton.addEventListener("click", onClickAddButton);
closeButtons.forEach((button) => {
  button.addEventListener("click", onClickCloseButton);
});
setPopupProfile();

const formValidator = new FormValidator(selectors);
formValidator.enableValidation();
