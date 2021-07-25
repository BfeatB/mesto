let editButton = document.querySelector(".profile__edit-button");
let editPopup = document.querySelector(".popup");

let nameProfile = document.querySelector(".profile__name");
let descriptionProfile = document.querySelector(".profile__description");

let popupForm = document.querySelector(".popup__form");
let nameInput = popupForm.querySelector("input[name='name']");
let descriptionInput = popupForm.querySelector("input[name='description']");

let closeButton = document.querySelector(".js-close-popup");

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

//Initial cards

for (const card of initialCards) {
  const cardNode = cardTemplate.content.cloneNode(true);
  cardNode.querySelector(".card__img").setAttribute("src", card.link);
  cardNode.querySelector(".card__img").setAttribute("alt", card.alt);
  cardNode.querySelector(".card__capture").textContent = card.name;
  cardsContainer.appendChild(cardNode);
}

//Open popups

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("js-open-popup")) {
    openPopup(e.target.dataset.popupid);
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

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("js-close-popup")) {
    closePopup(e.target.dataset.popupid);
  }
});

function closePopup(id) {
  document.getElementById(id).classList.remove("popup_opened");
}

//Send data from popup to profile.
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(id);
}

//Add a new card.
function formAddCard (evt) {
  evt.preventDefault();
  closePopup(id);
}

popupForm.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener("click", closePopup);
editButton.addEventListener("click", onClickEditButton);



