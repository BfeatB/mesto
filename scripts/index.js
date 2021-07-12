//Open popup
let editButton = document.querySelector(".profile__edit-button");
let editPopup = document.querySelector(".popup");
editButton.addEventListener("click", function(){
  editPopup.classList.add("popup_opened")
})

//Close popup
let closeButton = document.querySelector(".popup__close");
closeButton.addEventListener("click", function(){
  editPopup.classList.remove("popup_opened");
})

//Send datas from popup to profile.
let popupForm = document.querySelector(".popup__form");

function formSubmitHandler (evt) {
	evt.preventDefault();

  let nameInput = popupForm.querySelector("input[name='name']");
  let descriptionInput = popupForm.querySelector("input[name='description']");

  let nameProfile = document.querySelector(".profile__name");
  let descriptionProfile = document.querySelector(".profile__description");

  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  editPopup.classList.remove("popup_opened");
}

popupForm.addEventListener('submit', formSubmitHandler);

//Activate like-button
let likeButtons = document.querySelectorAll(".card__like-button");

for (let likeButton of likeButtons) {
  likeButton.addEventListener("click", function(){
    likeButton.classList.toggle("card__like-button_active");
  })
}


