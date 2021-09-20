import './index.css';

import { initialCards } from "../utils/constants.js";
import { selectors } from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage} from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

const editButton = document.querySelector(".profile__edit-button");

const nameProfile = document.querySelector(".profile__name");
const descriptionProfile = document.querySelector(".profile__description");

const popupEditForm = document.querySelector(".popup__form");
const nameInput = popupEditForm.querySelector("input[name='name']");
const descriptionInput = popupEditForm.querySelector("input[name='description']");

const addButton = document.querySelector(".profile__add-button");


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
const profileFormValidator = new FormValidator(selectors, "form[name = 'profile']");
profileFormValidator.enableValidation();


const addCardFormValidator = new FormValidator(selectors, "form[name = 'addCard']");
addCardFormValidator.enableValidation();

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
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description"
})

function formSubmitEditProfileHandler ({ name, description }) {
  userInfo.setUserInfo({ name, description });
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
  addCardFormValidator.setInitialFormState();
}

addCardPopup.setEventListeners();

editButton.addEventListener("click", onClickEditButton);
addButton.addEventListener("click", onClickAddButton);
