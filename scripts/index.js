import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { initialCards } from "./initial-cards.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage} from "./PopupWithImage.js";

const popupContainers = document.querySelectorAll(".popup__container");
const popupGalleryContainer = document.querySelector(".popup__gallery");

const editButton = document.querySelector(".profile__edit-button");

const nameProfile = document.querySelector(".profile__name");
const descriptionProfile = document.querySelector(".profile__description");

const popupEditForm = document.querySelector(".popup__form");
const nameInput = popupEditForm.querySelector("input[name='name']");
const descriptionInput = popupEditForm.querySelector("input[name='description']");

const addButton = document.querySelector(".profile__add-button");

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_type_active'
};

//Initial cards:

function createCard (card) {
  return (new Card(card,  onCardImgClick, '#cardTemplate')).generateCard();
  }

//Render initial cards: 

const cardsSection = new Section ({
  items: initialCards,
  renderer: createCard
}, ".cards");

cardsSection.renderAll();

//Render a new card

function formSubmitAddCardHandler ({ place, url }) {
  const data = {
    name: place,
    link: url,
    alt: place
  };
  cardsSection.addItem(createCard(data));
  addCardPopup.close();
}

//Validation 
const formValidator = new FormValidator(selectors);
formValidator.enableValidation();

//Open the gallery
const popupGallery = new PopupWithImage("#popup-gallery");

function onCardImgClick (evt) {
  const newSrc = evt.target.getAttribute("src");
  const newAlt = evt.target.getAttribute("alt");
  popupGallery.open({src: newSrc, alt: newAlt});
}

popupGallery.setEventListeners();

//Profile popup

const profilePopup = new PopupWithForm ("#popup-profile", formSubmitEditProfileHandler);


function formSubmitEditProfileHandler ({ name, description }) {
  nameProfile.textContent = name;
  descriptionProfile.textContent = description;
  profilePopup.close();
}

profilePopup.setEventListeners();


function setPopupProfile() {
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;

  const event = new Event('input');
  descriptionInput.dispatchEvent(event);
  nameInput.dispatchEvent(event);
}

//Add data to the edit form and open the popup

function onClickEditButton() {
  profilePopup.open();
  setPopupProfile();
}

//Add cards popup

const addCardPopup = new PopupWithForm ("#popup-place", formSubmitAddCardHandler);


//Open add card popup

function onClickAddButton() {
  addCardPopup.open();
  formValidator.setInitialFormState(addCardPopup.popupEl);
}

addCardPopup.setEventListeners();


// Stop Propagation function

function onClickPopupContainer(evt) {
  evt.stopPropagation();
}

popupContainers.forEach((popupContainer) => {
  popupContainer.addEventListener("click", onClickPopupContainer);
});

popupGalleryContainer.addEventListener("click", onClickPopupContainer);
editButton.addEventListener("click", onClickEditButton);
addButton.addEventListener("click", onClickAddButton);
