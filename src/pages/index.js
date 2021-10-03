import './index.css';

import { selectors } from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage} from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

import { editButton , nameInput, descriptionInput, addButton } from "../utils/constants.js";

import api from "../components/Api.js"


//Initial cards:

function createCard (card) {
  return (new Card(card,  onCardImgClick, '#cardTemplate', userInfo.getUserId())).generateCard();
}

//Render initial cards: 

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, user]) => {
    const cardsSection = new Section ({
      items: cards,
      renderer: createCard
    }, ".cards");
    
    userInfo.setUserInfo(user);
    userInfo.setUserId(user._id);
    cardsSection.renderAll();
  });


//Render a new card

function formSubmitAddCardHandler ({ place, url }) {
  const data = {
    name: place,
    link: url
  };
  api.addNewCard(data)
    .then((card) => {
      const cardsSection = new Section ({}, ".cards");
      cardsSection.addItem(createCard(card));
      addCardPopup.close();
    })
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
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__avatar"
})

function formSubmitEditProfileHandler ({ name, about }) {
  userInfo.setUserInfo({ 
    name, 
    about, 
    avatar: userInfo.getUserInfo().avatar
  });

  profilePopup.close();
}

profilePopup.setEventListeners();


function setPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.about;
  profileFormValidator.setInitialFormState();
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
