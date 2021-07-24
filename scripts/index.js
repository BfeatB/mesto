let editButton = document.querySelector(".profile__edit-button");
let editPopup = document.querySelector(".popup");

let nameProfile = document.querySelector(".profile__name");
let descriptionProfile = document.querySelector(".profile__description");

let popupForm = document.querySelector(".popup__form");
let nameInput = popupForm.querySelector("input[name='name']");
let descriptionInput = popupForm.querySelector("input[name='description']");

let closeButton = document.querySelector(".js-close-popup");

//Open popups

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("js-open-popup")) {
    openPopup(e.target.dataset.popupid);
  }
});

function openPopup(id) {
  document.getElementById(id).classList.add("popup_opened");
}

//Add data to the edit form when a popup is opening

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



