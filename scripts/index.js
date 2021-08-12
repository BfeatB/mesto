const initialCards = [
  {
    name: "Санкт-Петербург",
    link: "./images/catlamp_SPetersburgh.jpg",
    alt: "Кот в Петербурге"
  },

  {
    name: "Москва",
    link: "./images/lampcat_Moscow.jpg",
    alt: "Кот в Москве"
  },

  {
    name: "Тверь",
    link: "./images/lampcat_tver.jpg",
    alt: "Кот в Твери"
  },

  {
    name: "Яндекс",
    link: "./images/lampcat_Yandex.jpg",
    alt: "Кот в Яндексе"
  },

  {
    name: "Кудыкина гора",
    link: "./images/lampcat_Kmountain.jpg",
    alt: "Кот на Кудыкиной горе"
  },

  {
    name: "Тула и памятник тульскому прянику",
    link: "./images/catlamp_Tula.jpg",
    alt: "Кот в Туле"
  },
];

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

//Load existing cards

for (const card of initialCards) {
  cardsContainer.appendChild(createCard(card));
}

//Open popups

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", onKeydown);
}

//Close popups

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", onKeydown);

}

//Add data to the edit form and open the popup

function onClickEditButton() {
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  openPopup(editPopup);
}

//Open add card popup

function onClickAddButton() {
  openPopup(addCardPopup);
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
  const cardNode = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNodeImg = cardNode.querySelector(".card__img");
  cardNodeImg.setAttribute("src", card.link);
  cardNodeImg.setAttribute("alt", card.alt);
  cardNodeImg.addEventListener("click", onCardImgClick);
  cardNode.querySelector(".card__capture").textContent = card.name;
  cardNode.querySelector(".card__like-button").addEventListener("click", function(evt) {
    evt.target.classList.toggle("card__like-button_active");
  });
  cardNode.querySelector(".card__delete-button").addEventListener("click", function(evt) {
    evt.target.closest(".card").remove();
  });
  return cardNode;
}

//Close all popups with a close button

function onClickCloseButton(evt) {
  closePopup(evt.target.closest(".popup"));
}

//Close all popups with an esc button

function onKeydown(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

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




