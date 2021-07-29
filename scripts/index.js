const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup");

const nameProfile = document.querySelector(".profile__name");
const descriptionProfile = document.querySelector(".profile__description");

const popupForm = document.querySelector(".popup__form");
const nameInput = popupForm.querySelector("input[name='name']");
const descriptionInput = popupForm.querySelector("input[name='description']");

const closeButton = document.querySelector(".js-close-popup");

const likeButton = document.querySelector(".card__like-button");

const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: './images/catlamp_SPetersburgh.jpg',
    alt: 'Кот в Петербурге'
  },

  {
    name: 'Москва',
    link: './images/lampcat_Moscow.jpg',
    alt: 'Кот в Москве'
  },

  {
    name: 'Тверь',
    link: './images/lampcat_tver.jpg',
    alt: 'Кот в Твери'
  },

  {
    name: 'Яндекс',
    link: './images/lampcat_Yandex.jpg',
    alt: 'Кот в Яндексе'
  },

  {
    name: 'Кудыкина гора',
    link: './images/lampcat_Kmountain.jpg',
    alt: 'Кот на Кудыкиной горе'
  },

  {
    name: 'Тула и памятник тульскому прянику',
    link: './images/catlamp_Tula.jpg',
    alt: 'Кот в Туле'
  },
];

const cardTemplate = document.getElementById("cardTemplate");
const cardsContainer = document.querySelector(".cards");

const addCardPopup = document.getElementById("popupPlace")
const placeNameInput = addCardPopup.querySelector("input[name='place']");
const placeImgInput = addCardPopup.querySelector("input[name='url']");
const addCardForm = addCardPopup.querySelector(".popup__form");

//Initial cards

for (const card of initialCards) {
  cardsContainer.appendChild(createCard(card));
}

//Open popups

document.addEventListener("click", function(evt) {
  if (evt.target.classList.contains("js-open-popup")) {
    openPopup(evt.target.dataset.popupid);
  }
});

function openPopup(id) {
  document.getElementById(id).classList.add("popup_opened");
}

//Add data to the edit form while a popup is opening

function onClickEditButton(){
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

//Close popups

document.addEventListener("click", function(evt) {
  if (evt.target.classList.contains("js-close-popup")) {
    closePopup(evt.target.dataset.popupid);
  }
});

function closePopup(id) {
  document.getElementById(id).classList.remove("popup_opened");
}

//Send data from popup to profile

function formSubmitEditProfileHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup("popupProfile");
}

//Add a new card

function formSubmitAddCardHandler (evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeImg = placeImgInput.value;
  cardsContainer.prepend(createCard ({
    name: placeName,
    link: placeImg,
    alt: placeName
  }));
  closePopup("popupPlace");
}

//create cards
function createCard (card) {
  const cardNode = cardTemplate.content.cloneNode(true);
  cardNode.querySelector(".card__img").setAttribute("src", card.link);
  cardNode.querySelector(".card__img").setAttribute("alt", card.alt);
  cardNode.querySelector(".card__capture").textContent = card.name;
  cardNode.querySelector('.card__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  cardNode.querySelector('.card__delete-button').addEventListener('click', function(evt) {
    evt.target.closest(".card").remove();
  });
  return cardNode;
}

//galary



popupForm.addEventListener('submit', formSubmitEditProfileHandler);
closeButton.addEventListener("click", closePopup);
editButton.addEventListener("click", onClickEditButton);
addCardForm.addEventListener("submit", formSubmitAddCardHandler);



