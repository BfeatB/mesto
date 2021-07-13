let editButton = document.querySelector(".profile__edit-button");
let editPopup = document.querySelector(".popup");

let nameProfile = document.querySelector(".profile__name");
let descriptionProfile = document.querySelector(".profile__description");

let popupForm = document.querySelector(".popup__form");
let nameInput = popupForm.querySelector("input[name='name']");
let descriptionInput = popupForm.querySelector("input[name='description']");

let closeButton = document.querySelector(".popup__close");

//Open popup
function onClickEditButton(){
  editPopup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

editButton.addEventListener("click", onClickEditButton)

//Close popup
function onClickCloseButton(){
  editPopup.classList.remove("popup_opened");
}

closeButton.addEventListener("click", onClickCloseButton)

//Send datas from popup to profile.
function formSubmitHandler (evt) {
	evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  onClickCloseButton();
}

popupForm.addEventListener('submit', formSubmitHandler);



